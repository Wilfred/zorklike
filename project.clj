(defproject zorklike "0.1"
  :plugins [[lein-cljsbuild "0.2.10"]]
    :cljsbuild {
    :builds [{:source-path "src"
              :compiler {;;:output-to "resources/public/js/main.js"
                         :optimizations :advanced
                         :pretty-print true}}]})
