import Advent.Utils (properFactors, splitAll, wordsWhen)
import Data.List.Extra (allSame)
import System.Environment (getArgs)

type Range = (Int, Int)

type Input = [Range]

type Solution = Int

parser :: String -> Input
parser = map ((\(start, end) -> (read start, read $ tail end)) . break (== '-')) . wordsWhen (== ',')

solve1 :: Input -> Solution
solve1 = foldr sumRange 0
  where
    sumRange (start, end) total = total + (sum . filter isInvalid) [start .. end]
    isInvalid = pairEqual . splitStringHalf . show
    splitStringHalf s = splitAt (length s `div` 2) s
    pairEqual (first, second) = first == second

solve2 :: Input -> Solution
solve2 = foldr sumRange 0
  where
    sumRange (start, end) total = total + (sum . filter isInvalid) [start .. end]
    isInvalid = any allSame . splitStringAny . show
    splitStringAny s = map (`splitAll` s) . properFactors $ length s

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