import Data.List.Extra (splitOn)
import System.Environment (getArgs)

data Toggle = On | Off deriving (Eq, Show)

data Machine = Machine [Toggle] [[Int]] [Int] deriving (Eq, Show)

type Input = [Machine]

type Solution = Int

parser :: String -> Input
parser = map (parseMachineParts . splitOn " ") . lines
  where
    parseMachineParts parts = Machine (parseLights $ head parts) (parseButtons $ trimEnds parts) (parseJolts $ tail parts)
    parseLights lights = map (\c -> if c == '.' then Off else On) $ trimEnds lights
    parseButtons = map (read . \button -> '[' : trimEnds button ++ "]")
    parseJolts = const [] -- TODO in part 2 probably
    trimEnds = init . tail

applyButton :: [Int] -> [Toggle] -> [Toggle]
applyButton = flip $ foldr (\index current -> take index current ++ (if current !! index == On then Off else On) : drop (index + 1) current)

solve1 :: Input -> Solution
solve1 = sum . map solveMachine
  where
    solveMachine (Machine toggles buttons _) = go toggles buttons 0 [replicate (length toggles) Off]
    go target buttons depth currents
      | target `elem` currents = depth
      | otherwise = go target buttons (depth + 1) $ concatMap (\current -> map (`applyButton` current) buttons) currents

solve2 :: Input -> Solution
solve2 = error "Part 2 Not implemented" -- could not solve this part. Attempted a gaussian reduction, but it was too slow.

main :: IO ()
main = do
  [part, filepath] <- getArgs
  input <- parser <$> readFile filepath
  if read @Int part == 1
    then do
      putStrLn "solution to problem 1 is:"
      print $ solve1 input
    else do
      putStrLn "solution to problem 2 is:"
      print $ solve2 input