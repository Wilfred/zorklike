Zorklike is a static home page with a fun integrated text game.

AGPLv3 license.

Building
--------

You will need GHC and happy installed on your system.

1: Install cabal-dev from git (cabal-dev from hackage doesn't support
GHC 7.6.1 yet)

    $ git clone git://github.com/creswick/cabal-dev.git 
    $ cd cabal-dev
    $ cabal install
    
2: Ensure `~/.cabal/bin` is on your $PATH.

3: Install Fay.

    $ git clone git://github.com/faylang/fay.git
    $ cd fay
    $ git checkout 0.11.0.0 # latest release
    $ cabal-dev install
    
FIXME: can we install fay from hackage?

4: Compile the code. You need to be in the fay directory.

    $ cabal-dev/bin/fay --no-ghc /path/to/zorklike/hello.hs
    
This will write hello.js to the zorklike directory.

Third party content
-------------------

* [jQuery terminal](https://github.com/jcubic/jquery.terminal) (GPLv2)
 * jQuery timers
 * jQuery mousewheel
 * jQuery cookie

* [Glowing Social Network Icons](http://www.softicons.com/free-icons/social-media-icons/glowing-social-network-icons-by-aaron-nichols) (CC-BY)
