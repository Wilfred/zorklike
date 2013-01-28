import Prelude
import FFI

data Place = Place { description :: String, directions :: [String]} 
           deriving (Show)

start :: Place
start = Place {description="You find yourself on a curiously designed website with what looks like\nan interface influenced by text adventure games.",
               directions=["up", "down", "forward"]}
        
describePlace :: Place -> String
describePlace place = description place ++ "\n\nDirections here: " ++ placeDirections
  where
    join sep list = concat $ intersperse sep list
    placeDirections = join ", " $ directions place

clearScrollback :: Fay ()
clearScrollback = ffi "jQuery('.scrollback').text('')"

writeScrollbackRaw :: String -> Fay ()
writeScrollbackRaw = ffi "jQuery('.scrollback').append(%1)"

writeScrollback :: String -> Fay()
writeScrollback = writeScrollbackRaw . (++ "\n\n")

console_log :: String -> Fay ()
console_log = ffi "console.log(%1)"

runOnEnter :: Fay () -> Fay ()
runOnEnter = ffi "jQuery('#prompt').keypress(function(e) { if (e.which == 13) %1() } )"

clearInput :: Fay ()
clearInput = ffi "jQuery('#prompt').val('')"

getInput :: Fay String
getInput = ffi "jQuery('#prompt').val()"

data Command = Go

parseInput :: String -> Maybe Command
parseInput ('g':'o':xs) = Just Go
parseInput _ = Nothing

respondToCommand = do
  input <- getInput
  let command = parseInput input
  case command of
    Just Go -> writeScrollback "Go!"
    _ -> writeScrollback "I don't know how to do that."

main = do
  clearScrollback
  writeScrollback $ describePlace start
  runOnEnter respondToCommand
  