import Data.Map (Map)
import Data.MemoTrie
import GHC.Generics (Generic)
import System.Environment (getArgs)

newtype Node = Node String deriving (Generic, Eq, Ord, Show)

type Graph = [(Node, [Node])] -- assoc list / adjacency list

type Solution = Int

instance HasTrie Node where
  newtype Node :->: b = NodeTrie {unNodeTrie :: Reg Node :->: b}
  trie = trieGeneric NodeTrie
  untrie = untrieGeneric unNodeTrie
  enumerate = enumerateGeneric unNodeTrie

parser :: String -> Graph
parser = map getAdjacency . lines
  where
    getAdjacency line =
      let (label, others) = break (== ':') line
       in (Node label, map Node . words . tail $ others)

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
solve1 = countWays (Node "you") (Node "out")

solve2 :: Graph -> Solution
solve2 graph = svrToFft * fftToDac * dacToOut + svrToDac * dacToFft * fftToOut
  where
    svrToFft = countWays (Node "svr") (Node "fft") graph
    fftToDac = countWays (Node "fft") (Node "dac") graph
    dacToOut = countWays (Node "dac") (Node "out") graph
    -- or:
    svrToDac = countWays (Node "svr") (Node "dac") graph
    dacToFft = countWays (Node "dac") (Node "fft") graph
    fftToOut = countWays (Node "fft") (Node "out") graph

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