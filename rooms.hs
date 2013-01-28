import Prelude
import FFI

isPrefixOf              :: (Eq a) => [a] -> [a] -> Bool
isPrefixOf [] _         =  True
isPrefixOf _  []        =  False
isPrefixOf (x:xs) (y:ys)=  x == y && isPrefixOf xs ys

data Place = Place { description :: String,
                     arrivalMessage :: String,
                     directions :: [String]} 
           deriving (Show)

start :: Place
start = Place {arrivalMessage="You find yourself on a curiously designed website. It's definitely HTML, but something is... different. You hear movement in the distance, and there's a smell of burning Haskell in the air.\n\nAvailable commands: go, look",
               description="The DOM nodes are spaced widely here, but it's thicker ahead. You feel nervous, but decide to learn more of this strange land and press onwards. Am I right?",
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

data Command = Go | Look

parseInput :: String -> Maybe Command
parseInput input
  | "go" `isPrefixOf` input = Just Go
  | "look" `isPrefixOf` input = Just Look
  | otherwise = Nothing

respondToCommand = do
  input <- getInput
  let command = parseInput input
  case command of
    Just Go -> writeScrollback "Go!"
    -- todo: store the current location
    Just Look -> writeScrollback $ description start
    _ -> writeScrollback "I don't know how to do that."
  clearInput

main = do
  clearScrollback
  writeScrollback $ arrivalMessage start
  runOnEnter respondToCommand
  