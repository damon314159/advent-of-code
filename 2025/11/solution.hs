import Data.MemoTrie (memo2)
import System.Environment (getArgs)

type Node = String

type Graph = [(Node, [Node])] -- assoc list / adjacency list

type Solution = Int

parser :: String -> Graph
parser = map getAdjacency . lines
  where
    getAdjacency line =
      let (label, others) = break (== ':') line
       in (label, words . tail $ others)

countWays :: Node -> Node -> Graph -> Int
countWays start target graph = goMemo start target
  where
    goMemo = memo2 go
    go start target
      | start == target = 1
      | otherwise = case lookup start graph of
          Just nextNodes -> sum . map (`goMemo` target) $ nextNodes
          Nothing -> 0 -- handle dead end

solve1 :: Graph -> Solution
solve1 = countWays "you" "out"

solve2 :: Graph -> Solution
solve2 graph = svrToFft * fftToDac * dacToOut + svrToDac * dacToFft * fftToOut
  where
    svrToFft = countWays "svr" "fft" graph
    fftToDac = countWays "fft" "dac" graph
    dacToOut = countWays "dac" "out" graph
    -- or:
    svrToDac = countWays "svr" "dac" graph
    dacToFft = countWays "dac" "fft" graph
    fftToOut = countWays "fft" "out" graph

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