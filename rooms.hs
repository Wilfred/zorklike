import Language.Fay.Prelude
import Language.Fay.FFI

data Place = Place { description :: String } deriving (Show)

start :: Place
start = Place {description="You find yourself on a curiously designed website with what looks like\nan interface influenced by text adventure games."}

clearScrollback :: Fay ()
clearScrollback = ffi "jQuery('.scrollback').text('')"

writeScrollback :: String -> Fay ()
writeScrollback = ffi "jQuery('.scrollback').append(%1)"

console_log :: String -> Fay ()
console_log = ffi "console.log(%1)"

main = do
  clearScrollback
  writeScrollback $ description start