module Advent.Utils
  ( properFactors,
    splitAll,
    Grid,
    parseGrid,
    lookupGrid,
    lookupGridAxiswise,
  )
where

import qualified Data.Map as Map

-- | Returns a list of all proper factors of n
properFactors :: Int -> [Int]
properFactors num = go num [1 .. num `div` 2]
  where
    go _ [] = []
    go n (divisor : divisors) =
      if n `mod` divisor == 0
        then divisor : go n divisors
        else go n divisors

-- | Generalises Prelude.splitAt to split a string into many sections of length n
splitAll :: Int -> String -> [String]
splitAll _ "" = []
splitAll n s = let (w, s') = splitAt n s in w : splitAll n s'

-- | Grid parsing
type Grid a = Map.Map (Int, Int) a

parseGrid :: (Char -> a) -> String -> Grid a
parseGrid parseChar = Map.fromList . concatMap parseLine . zip [0 ..] . lines
  where
    parseLine (row, line) = zipWith zipper [0 ..] (map (row,) line)
    zipper col (row, char) = ((row, col), parseChar char)

lookupGrid :: (Int, Int) -> Grid a -> Maybe a
lookupGrid = Map.lookup

lookupGridAxiswise :: Int -> Int -> Grid a -> Maybe a
lookupGridAxiswise row col = Map.lookup (row, col)