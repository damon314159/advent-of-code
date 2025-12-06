import Data.List (transpose)
import Data.List.Extra (split)
import System.Environment (getArgs)

data Op = Add | Multiply

data Problem = Problem [Int] Op

type Input = [Problem]

type Solution = Int

readOp :: String -> Op
readOp "+" = Add
readOp "*" = Multiply

parser1 :: String -> Input
parser1 = map parseProblem . transpose . map words . lines
  where
    parseProblem list =
      Problem (map read $ init list) (readOp $ last list)

parser2 :: String -> Input
parser2 = map parseProblem . split (null . words) . transpose . lines
  where
    parseProblem (numThenOp : rest) =
      Problem (map read $ init numThenOp : rest) (readOp [last numThenOp])

solve :: Input -> Solution
solve = sum . map solveProblem
  where
    solveProblem (Problem xs Add) = sum xs
    solveProblem (Problem xs Multiply) = product xs

main :: IO ()
main = do
  [part, filepath] <- getArgs
  inputRaw <- readFile filepath
  if read @Int part == 1
    then do
      putStrLn "solution to problem 1 is:"
      print . solve . parser1 $ inputRaw
    else do
      putStrLn "solution to problem 2 is:"
      print . solve . parser2 $ inputRaw