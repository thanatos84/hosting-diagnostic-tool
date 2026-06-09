#!/usr/bin/env clojure
;; test.clj — Server-side Clojure test
;; If the hosting server supports Clojure, it will run this

(println "Content-Type: application/json")
(println)

(println "{")
(println "  \"status\": \"CLOJURE_EXECUTED\",")
(println "  \"platform\": \"JVM\",")
(println "  \"timestamp\": \"" (.toString (java.time.Instant/now)) "\",")
(println "  \"cgi\": true")
(println "}")
