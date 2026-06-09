-- Test.hs — Server-side Haskell test
-- If the hosting server supports Haskell CGI, it will compile and run this

module Main where

import System.IO
import Data.Time.Clock (getCurrentTime)
import Data.Time.Format (formatTime, defaultTimeLocale)

main :: IO ()
main = do
  hSetBuffering stdout LineBuffering
  putStrLn "Content-Type: application/json"
  putStrLn ""
  currentTime <- getCurrentTime
  let timeStr = formatTime defaultTimeLocale "%Y-%m-%dT%H:%M:%SZ" currentTime
  putStrLn $ unlines
    [ "{"
    , "  \"status\": \"HASKELL_EXECUTED\","
    , "  \"compiler\": \"GHC\","
    , "  \"timestamp\": \"" ++ timeStr ++ "\","
    , "  \"cgi\": true"
    , "}"
    ]
