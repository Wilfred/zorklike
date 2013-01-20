import Language.Fay.Prelude
import Language.Fay.FFI

data Place = Place { description :: String } deriving (Show)

start :: Place
start = Place {description="You find yourself on a curiously designed website with what looks like\nan interface influenced by text adventure games."}

console_log :: String -> Fay ()
console_log = ffi "console.log(%1)"

main = console_log $ description start