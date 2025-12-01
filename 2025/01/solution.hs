import System.Environment (getArgs)

data Direction = L | R deriving (Eq, Show)

type Line = (Direction, Int)

type Input = [Line]

type Solution = Int

parser :: String -> Input
parser = map parseLine . lines
  where
    parseLine ('L' : num) = (L, read num)
    parseLine ('R' : num) = (R, read num)

dialSize = 100

dialStart = 50

getPositions :: Input -> [Int]
getPositions =
  scanl
    ( \position (direction, move) ->
        let op = (if direction == L then (-) else (+))
         in (position `op` move) `mod` dialSize
    )
    dialStart

countZeroes :: Input -> Int
countZeroes =
  snd
    . foldl
      ( \(position, count) (direction, move) ->
          let (rotations, change) = move `divMod` dialSize
              op = (if direction == L then (-) else (+))
              movedTo = position `op` change
              crossedZero = position /= 0 && (movedTo <= 0 || movedTo >= 100)
              newPosition = movedTo `mod` dialSize
           in (newPosition, count + rotations + (if crossedZero then 1 else 0))
      )
      (dialStart, 0)

solve1 :: Input -> Solution
solve1 = length . filter (== 0) . getPositions

solve2 :: Input -> Solution
solve2 = countZeroes

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