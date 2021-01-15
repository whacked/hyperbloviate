with import <nixpkgs> {};

stdenv.mkDerivation rec {
    name = "hyperbloviate";
    env = buildEnv {
        name = name;
        paths = buildInputs;
    };

    buildInputs = [
        nodejs-10_x
        electron_8
    ];

    shellHook = ''
      export PATH=$PATH:$(npm bin)
      cat default.nix | grep '^ \+\(function\|alias\) .\+'
    '';
}
