import System.Environment (getArgs)

-- this example solution I made to test my tooling was working as expected. It is 2024 day 2's problem

type Line = [Int]

type Input = [Line]

type Solution = Int

parser :: String -> Input
parser = map parseLine . lines
  where
    parseLine = map read . words

safeLine :: Line -> Bool
safeLine line = increasing line || decreasing line
  where
    safeRange x y = let diff = abs (x - y) in diff <= 3 && diff >= 1
    increasing [_] = True
    increasing (x : y : xs) = x <= y && safeRange x y && increasing (y : xs)
    decreasing [_] = True
    decreasing (x : y : xs) = x >= y && safeRange x y && decreasing (y : xs)

safeLineDampened :: Line -> Bool
safeLineDampened line = any safeLine $ allDropOnes line
  where
    allDropOnes line = [take i line ++ drop (i + 1) line | i <- [0 .. length line - 1]]

solve1 :: Input -> Solution
solve1 = sum . map (\line -> if safeLine line then 1 else 0)

solve2 :: Input -> Solution
solve2 = sum . map (\line -> if safeLineDampened line then 1 else 0)

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