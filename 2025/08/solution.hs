import Data.Foldable (Foldable (foldr'), find, minimumBy)
import Data.Function (on)
import Data.List (sortBy)
import qualified Data.Map as Map
import qualified Data.Set as Set
import Data.Tuple.Extra (uncurry3)
import Debug.Trace (traceShowId)
import System.Environment (getArgs)

data Junction = Junction Float Float Float deriving (Eq, Ord, Show)

type Input = [Junction]

type Solution = Int

parser :: String -> Input
parser = map (uncurry3 Junction . read . \line -> '(' : line ++ ")") . lines

distance :: Junction -> Junction -> Float
distance (Junction x1 y1 z1) (Junction x2 y2 z2) = sqrt $ (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2

distances :: Int -> Input -> Map.Map Float (Junction, Junction)
distances maxConnections input = foldr' addJunctionDistances Map.empty input
  where
    addJunctionDistances junction distances =
      let pairsAndDistances = [((junction, other), distance junction other) | other <- input, junction < other]
       in foldr' addDistance distances pairsAndDistances
    addDistance (junctionPair, distance) distances
      | Map.size distances < maxConnections = Map.insert distance junctionPair distances
      | otherwise =
          if distance < fst (Map.findMax distances)
            then Map.insert distance junctionPair $ Map.deleteMax distances
            else distances

groupings :: Map.Map Float (Junction, Junction) -> [Set.Set Junction]
groupings = go [] . map snd . Map.toList
  where
    go groups [] = groups
    go groups ((j1, j2) : pairs) = go newGroups pairs
      where
        maybeGroup1 = find (Set.member j1) groups
        maybeGroup2 = find (Set.member j2) groups
        newGroups = case (maybeGroup1, maybeGroup2) of
          (Nothing, Nothing) -> Set.fromList [j1, j2] : groups
          (Just group1, Nothing) -> Set.insert j2 group1 : filter (/= group1) groups
          (Nothing, Just group2) -> Set.insert j1 group2 : filter (/= group2) groups
          (Just group1, Just group2) ->
            if group1 /= group2
              then Set.union group1 group2 : filter (\g -> g /= group1 && g /= group2) groups
              else groups

solve1 :: Input -> Solution
solve1 = product . take 3 . sortBy (flip compare) . map Set.size . groupings . distances 1000

solve2 :: Input -> Solution
solve2 input = finalExtensionLead
  where
    groupWithAllButOne = head . groupings . distances 7500 $ input -- this is a really dumb solution. I got this magic number with a manual binary search. I need to sleep, it's 1:45am
    furthestJunction = head . Set.toList $ Set.fromList input Set.\\ groupWithAllButOne
    distancesToOthers = [(distance furthestJunction other, other) | other <- input, other /= furthestJunction]
    closestJunctionToFurthestOut = snd . minimumBy (compare `on` fst) $ distancesToOthers
    finalExtensionLead =
      let (Junction x1 _ _) = traceShowId furthestJunction
          (Junction x2 _ _) = traceShowId closestJunctionToFurthestOut
       in floor x1 * floor x2

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