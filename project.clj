(defproject zorklike "0.1"
  :plugins [[lein-cljsbuild "0.2.10"]]
    :cljsbuild {
    :builds [{:source-path "src"
              :compiler {:output-to "target/main.js"
                         :optimizations :advanced
                         :pretty-print false}}]})
