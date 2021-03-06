(require 'json-rpc)

(setq drivable/jrpc-port 8002)
(setf drivable/jrpc-handle (json-rpc-connect "localhost" drivable/jrpc-port))
(setq drivable/jrpc-endpoint "/rpc")

(setq drivable/sibilant-preamble-file "macro.sibilant")
(setq drivable/sibilant-postamble-file nil)

(defun drivable/json-rpc-request (connection method &rest mixed-params)
  "Send request of METHOD to CONNECTION, returning result or signalling error."
  (let* ((id (cl-incf (json-rpc-id-counter connection)))
         (params (if (and (= 1 (length mixed-params))
                          (eq 'cons (type-of (first mixed-params))))
                     (first mixed-params)
                   (vconcat mixed-params)))
         (request `(:jsonrpc "2.0" :method ,method :params ,params :id ,id))
         (process (json-rpc-process (json-rpc-ensure connection)))
         (encoded (json-encode request)))
    (with-current-buffer (process-buffer (json-rpc-process connection))
      (erase-buffer))
    (with-temp-buffer
      (insert (concat "POST " drivable/jrpc-endpoint " HTTP/1.1\r\n"))
      (insert (format (concat "Content-Length: %d\r\n"
                              "Content-Type: application/json\r\n"
                              "\r\n")
                      (string-bytes encoded))
              encoded)
      (process-send-region process (point-min) (point-max)))
    (message "%s" (json-rpc-wait connection))))

(defun drivable/eval-javascript (js)
  (drivable/json-rpc-request drivable/jrpc-handle "javascript" (list js)))

(defun drivable/eval-sibilant (sib)
  (drivable/json-rpc-request drivable/jrpc-handle "sibilant" (list sib)))

(defun drivable/maybe-read-file (filepath)
  (if (and filepath
           (file-exists-p filepath))
      (with-temp-buffer
        (insert-file-contents filepath)
        (buffer-string))
    ""))

;; include sibilant-skewer-mode first
(defun sibilant-jsonrpc-send-region (beg end)
  (let ((selected (buffer-substring beg end)))
    (drivable/eval-sibilant
     (concat
      (drivable/maybe-read-file drivable/sibilant-preamble-file)
      selected
      (drivable/maybe-read-file drivable/sibilant-postamble-file)))))

(defun sibilant-jsonrpc-eval-preceding-sexp (&optional prefix)
  (interactive "P")
  (save-excursion
    (let ((beg (progn (beginning-of-sexp)
                      (point)))
          (end (progn (end-of-sexp)
                      (point))))
      (sibilant-jsonrpc-send-region beg end))))

(defun sibilant-jsonrpc-eval-defun ()
  (interactive)
  (save-excursion
    (let ((beg (progn (beginning-of-defun)
                      (point)))
          (end (progn (end-of-defun)
                      (point))))
      (sibilant-jsonrpc-send-region beg end))))

(define-key sibilant-mode-map (kbd "C-x C-e") 'sibilant-jsonrpc-eval-preceding-sexp)
(define-key sibilant-mode-map (kbd "C-M-x") 'sibilant-jsonrpc-eval-defun)
