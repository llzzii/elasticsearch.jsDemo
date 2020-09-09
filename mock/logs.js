(function () {
  "use strict";

  const fs = require("fs");
  const moment = require("moment");
  const elasticsearch = require("elasticsearch");
  const esClient = new elasticsearch.Client({
    host: "http://117.73.2.85:9200/",
    log: "trace",
  });

  const bulkIndex = function bulkIndex() {
    let bulkBody = [];

    for (let i = 0; i < 1000; i++) {
      bulkBody.push(
        {
          index: {
            _index: "logs1599637568686",
            _type: "win",
            _id: i,
          },
        },
        {
          name: "logs" + i,
          logtype: Math.ceil(Math.random() * 10) > 7 ? "win" : "linux",
          content:
            Math.ceil(Math.random() * 10) > 4
              ? "error" + Math.ceil(Math.random() * 10)
              : "warning" + Math.ceil(Math.random() * 10),
          createdTime: new Date(
            new Date().getTime() -
              Math.ceil(Math.random() * 10) * (60 * 1000 * 60 * 6)
          ),
        }
      );
    }

    esClient
      .bulk({
        body: bulkBody,
        requestTimeout: 9000000,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        let errorCount = 0;
        response.items.forEach((item) => {
          if (item.index && item.index.error) {
            console.log(++errorCount, item.index.error);
          }
        });
        console.log(
          `Successfully indexed ${bulkBody.length - errorCount} out of ${
            bulkBody.length
          } items`
        );
      })
      .catch(console.err);
  };

  bulkIndex();

  module.exports = {
    bulkIndex,
  };
})();
