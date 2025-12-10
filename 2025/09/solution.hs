import Data.Function (on)
import Data.List (sortBy)
import System.Environment (getArgs)

data Point = Point Int Int deriving (Eq, Ord, Show)

type Input = [Point]

type Solution = Int

parser :: String -> Input
parser = map (\s -> Point (read $ takeWhile (/= ',') s) (read . tail $ dropWhile (/= ',') s)) . lines

area :: Point -> Point -> Int
area (Point x1 y1) (Point x2 y2) = (abs (x1 - x2) + 1) * (abs (y1 - y2) + 1)

solve1 :: Input -> Solution
solve1 points = maximum $ [area p1 p2 | p1 <- points, p2 <- points, p1 < p2]

data Edge = Vertical Int (Int, Int) | Horizontal Int (Int, Int) deriving (Eq, Ord, Show)

edges :: Input -> [Edge]
edges points = zipWith makeEdge points (tail points ++ [head points])
  where
    makeEdge (Point x1 y1) (Point x2 y2) = if x1 == x2 then Vertical x1 (y1, y2) else Horizontal y1 (x1, x2)

intersects :: Edge -> (Point, Point) -> Bool
intersects (Horizontal ye (xe1, xe2)) (Point xp1 yp1, Point xp2 yp2) =
  min yp1 yp2 < ye && max yp1 yp2 > ye && min xp1 xp2 < max xe1 xe2 && max xp1 xp2 > min xe1 xe2
intersects (Vertical xe (ye1, ye2)) (Point xp1 yp1, Point xp2 yp2) =
  min xp1 xp2 < xe && max xp1 xp2 > xe && min yp1 yp2 < max ye1 ye2 && max yp1 yp2 > min ye1 ye2

solve2 :: Input -> Solution
solve2 points = fst . head . filter (isValid . snd) $ rectanglesAndAreas
  where
    rectangles = [(p1, p2) | p1 <- points, p2 <- points, p1 < p2]
    rectanglesAndAreas = sortBy (compare `on` (negate . fst)) $ zip (map (uncurry area) rectangles) rectangles
    isValid rectangle = all (\edge -> not $ edge `intersects` rectangle) $ edges points

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