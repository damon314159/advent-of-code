import Advent.Utils (Grid, lookupGrid, parseGrid)
import qualified Data.Map as Map
import System.Environment (getArgs)

data Cell = Paper | Air deriving (Eq, Show)

type Input = Grid Cell

type Solution = Int

cellFromChar :: Char -> Cell
cellFromChar '@' = Paper
cellFromChar '.' = Air

parser :: String -> Input
parser = parseGrid cellFromChar

isForkliftSpace :: (Int, Int) -> Grid Cell -> Bool
isForkliftSpace coords grid = (< 4) . length . filter (== Just Paper) $ neighbourContents coords grid
  where
    neighbourContents coords grid = map (`lookupGrid` grid) $ neighbours coords
    neighbours (row, col) = [(r, c) | r <- [row - 1 .. row + 1], c <- [col - 1 .. col + 1], r /= row || c /= col]

checkCell :: Grid Cell -> (Int, Int) -> Cell -> Bool
checkCell grid coords cell = cell == Paper && isForkliftSpace coords grid

solve1 :: Input -> Solution
solve1 grid = Map.size $ Map.filterWithKey (checkCell grid) grid

clearCells :: [(Int, Int)] -> Grid Cell -> Grid Cell
clearCells removals grid = foldr setToAir grid removals
  where
    setToAir = Map.adjust (const Air)

solve2 :: Input -> Solution
solve2 grid = go grid True
  where
    go grid anyRemoved = if anyRemoved then numRemoved + go grid' (numRemoved > 0) else 0
      where
        grid' = clearCells removed grid
        numRemoved = length removed
        removed = Map.keys $ Map.filterWithKey (checkCell grid) grid

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
