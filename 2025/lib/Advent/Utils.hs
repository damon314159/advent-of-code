module Advent.Utils
  ( properFactors,
    wordsWhen,
    splitAll,
  )
where

-- | Returns a list of all proper factors of n
properFactors :: Int -> [Int]
properFactors num = go num [1 .. num `div` 2]
  where
    go _ [] = []
    go n (divisor : divisors) =
      if n `mod` divisor == 0
        then divisor : go n divisors
        else go n divisors

-- | Same as Prelude.words but accepts a predicate instead of only matching ' '
wordsWhen :: (Char -> Bool) -> String -> [String]
wordsWhen p s = case dropWhile p s of
  "" -> []
  s' -> w : wordsWhen p s''
    where
      (w, s'') = break p s'

-- | Generalises Prelude.splitAt to split a string into many sections of length n
splitAll :: Int -> String -> [String]
splitAll _ "" = []
splitAll n s = let (w, s') = splitAt n s in w : splitAll n s'
