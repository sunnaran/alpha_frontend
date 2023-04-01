import React, { useEffect, useState } from "react";
import * as minio from "minio";
export default function NewsDown() {
  useEffect(() => {}, []);
  const download = () => {
    const minioClient = new minio.Client({
      endPoint: "192.168.99.182",
      port: 9000,
      useSSL: false,
      accessKey: "minio",
      secretKey: "minio123",
    });

    var size = 0;
    minioClient.getObject(
      "europetrip",
      "lalar.txt",
      function (err, dataStream) {
        if (err) {
          return console.log(err);
        }
        dataStream.on("data", function (chunk) {
          size += chunk.length;
        });
        dataStream.on("end", function () {
          console.log("End. Total size = " + size);
        });
        dataStream.on("error", function (err) {
          console.log(err);
        });
      }
    );
  };
  return (
    <div>
      <div onClick={() => download()}>Tatah link</div>
    </div>
  );
}
