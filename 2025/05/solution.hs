import Data.List (find)
import Data.List.Extra (splitOn)
import System.Environment (getArgs)

data Range = Range Int Int deriving (Eq, Show)

type ID = Int

data Input = Input [Range] [ID]

type Solution = Int

parser :: String -> Input
parser = (\[ranges, ids] -> Input (parseRanges ranges) (parseIds ids)) . splitOn "\n\n"
  where
    parseRanges = map ((\[start, end] -> Range (read start) (read end)) . splitOn "-") . lines
    parseIds = map read . lines

solve1 :: Input -> Solution
solve1 (Input ranges ids) = length . filter (\id -> any (`inRange` id) ranges) $ ids
  where
    inRange (Range start end) id = id >= start && id <= end

overlap :: Range -> Range -> Bool
overlap (Range start1 end1) (Range start2 end2) = not (start2 > end1 || start1 > end2)

widestRange :: Range -> Range -> Range
widestRange (Range start1 end1) (Range start2 end2) = Range (min start1 start2) (max end1 end2)

solve2 :: Input -> Solution
solve2 (Input ranges _) = sum . map (\(Range start end) -> end - start + 1) . foldr insert [] $ ranges
  where
    insert range ranges = case find (overlap range) ranges of
      Nothing -> range : ranges
      Just existingRange ->
        let otherRanges = filter (/= existingRange) ranges
         in insert (widestRange range existingRange) otherRanges

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