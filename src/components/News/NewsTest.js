import React, { useEffect, useState } from "react";
import * as minio from "minio";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FileSaver from "file-saver";
const props = {
  onChange(info) {
    console.log("YU ORJ IRJ BAINA");
    console.log(info);
    const minioClient = new minio.Client({
      endPoint: "192.168.99.182",
      port: 9000,
      useSSL: false,
      accessKey: "minio",
      secretKey: "minio123",
    });
    // Make a bucket called europetrip.

    var metaData = {
      "Content-Type": info.file.type,
    };
    // Using fPutObject API upload your file to the bucket europetrip.
    minioClient.fPutObject(
      "europetrip",
      info.file.name,
      info.file,
      metaData,
      function (err, etag) {
        if (err) return console.log(err);
        console.log("File uploaded successfully.");
      }
    );

    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function NewsTest() {
  const [buckets, setBuckets] = useState([]);
  useEffect(() => {
    const getBuckets = async () => {
      // create the client
      const mc = new minio.Client({
        endPoint: "192.168.99.182",
        port: 9000,
        useSSL: false,
        accessKey: "myaccesskey",
        secretKey: "mysecretkey",
      });
      // list buckets
      const res = await mc.listBuckets();
      setBuckets(res);
    };
    getBuckets();
  }, []);

  const makebucket1 = async () => {
    const mc = new minio.Client({
      endPoint: "192.168.99.182",
      port: 9000,
      useSSL: false,
      accessKey: "minio",
      secretKey: "minio123",
    });
    // list buckets

    const res = await mc.makeBucket("europetrip", "us-east-1", function (err) {
      if (err) return console.log("Error creating bucket.", err);
      console.log('Bucket created successfully in "us-east-1".');
    });
  };

  const download = async () => {
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
      "vegas.zip",
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

  const downloadurl = async () => {
    const minioClient = new minio.Client({
      endPoint: "192.168.99.182",
      port: 9000,
      useSSL: false,
      accessKey: "minio",
      secretKey: "minio123",
    });
    minioClient.presignedUrl(
      "GET",
      "europetrip",
      "apex_21.2.zip",
      5,
      function (err, presignedUrl) {
        if (err) return console.log(err);
        console.log(presignedUrl);
        FileSaver.saveAs(presignedUrl);
      }
    );
  };

  return (
    <div>
      Test News{" "}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      ,<h1>Minio example</h1>
      <Button onClick={() => makebucket1()}>make bucket</Button>
      <Button onClick={() => download()}>get size object</Button>
      <Button onClick={() => downloadurl()}>download object</Button>
      <ul>
        {buckets.slice(0, 5)?.map((bucket, index) => (
          <li key={index}>{bucket.name}</li>
        ))}
      </ul>
    </div>
  );
}
