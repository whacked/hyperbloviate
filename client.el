(require 'json-rpc)

(setf drivable/jrpc-handle (json-rpc-connect "localhost" 8002))
(setq drivable/jrpc-endpoint "/rpc")
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
      (insert (concat "POST " drivable-jrpc-endpoint " HTTP/1.1\r\n"))
      (insert (format (concat "Content-Length: %d\r\n"
                              "Content-Type: application/json\r\n"
                              "\r\n")
                      (string-bytes encoded))
              encoded)
      (process-send-region process (point-min) (point-max)))
    (json-rpc-wait connection)))

(defun drivable/eval-javascript (js)
  (drivable/json-rpc-request drivable/jrpc-handle "javascript" (list js)))

(defun drivable/eval-sibilant (sib)
  (drivable/json-rpc-request drivable/jrpc-handle "sibilant" (list sib)))
