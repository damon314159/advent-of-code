import System.Environment (getArgs)

data Cell = Beam | Air | Splitter deriving (Eq, Show)

type Line = [Cell]

type Input = [Line]

type Solution = Int

readCell :: Char -> Cell
readCell 'S' = Beam
readCell '.' = Air
readCell '^' = Splitter

parser :: String -> Input
parser = map (map readCell) . lines

-- returns the next line, and the updated total number of splits
stepWithSplits :: (Line, Int) -> Line -> (Line, Int)
stepWithSplits (line1, count) line2 = (map fst stepOutcome, count + (length . filter id . map snd) stepOutcome)
  where
    stepOutcome = go ((Air, Air) : zip line1 line2 ++ [(Air, Air)])
    go [_, _] = []
    go (x@(top1, bottom1) : y@(top2, bottom2) : z@(top3, bottom3) : xs)
      | top2 == Beam && bottom2 == Splitter = (Splitter, True) : go (y : z : xs)
      | bottom2 == Splitter = (Splitter, False) : go (y : z : xs)
      | top2 == Beam = (Beam, False) : go (y : z : xs)
      | top1 == Beam && bottom1 == Splitter = (Beam, False) : go (y : z : xs)
      | top3 == Beam && bottom3 == Splitter = (Beam, False) : go (y : z : xs)
      | otherwise = (Air, False) : go (y : z : xs)

-- returns the counts of paths to each position in a line
stepWithPaths :: [Int] -> Line -> [Int]
stepWithPaths paths line = go ((0, Air) : zip paths line ++ [(0, Air)])
  where
    go [_, _] = []
    go (x@(count1, cell1) : y@(count2, cell2) : z@(count3, cell3) : xs)
      | cell2 == Splitter = 0 : go (y : z : xs)
      | otherwise =
          count2
            + (if cell1 == Splitter then count1 else 0)
            + (if cell3 == Splitter then count3 else 0)
            : go (y : z : xs)

solve1 :: Input -> Solution
solve1 lines = snd $ foldl stepWithSplits (head lines, 0) $ tail lines

solve2 :: Input -> Solution
solve2 lines = sum $ foldl stepWithPaths startPaths $ tail lines
  where
    startPaths = map (\cell -> if cell == Beam then 1 else 0) $ head lines

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