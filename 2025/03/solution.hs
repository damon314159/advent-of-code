import Data.Char (digitToInt)
import Data.List (elemIndex)
import System.Environment (getArgs)

type Line = [Int]

type Input = [Line]

type Solution = Int

parser :: String -> Input
parser = map (map digitToInt) . lines

maxLineN :: Int -> Line -> Int
maxLineN n line = read . concatMap show . reverse $ go n [] line
  where
    go 0 digits _ = digits
    go n digits line = go (n - 1) digits' restLine
      where
        maxDigit = maximum $ take (length line - (n - 1)) line
        digits' = maxDigit : digits
        index = let (Just i) = maxDigit `elemIndex` line in i
        restLine = drop (index + 1) line

solve1 :: Input -> Solution
solve1 = sum . map (maxLineN 2)

solve2 :: Input -> Solution
solve2 = sum . map (maxLineN 12)

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