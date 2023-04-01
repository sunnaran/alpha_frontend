import axios from "axios";
import * as minio from "minio";
import { Buffer } from "buffer";
import React, { Component } from "react";
var Fs = require("fs");

const fileToArrayBuffer = require("file-to-array-buffer");
class NewsUpload extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    console.log("DATAAAAAAAAAAAAAAAAA");
    console.log(event.target.files[0].data);
    console.log(event.target.files[0].stream);
    console.log(event.target.files[0].Buffer);
    console.log(event.target.files[0]);
  };

  // On file upload (click the upload button)
  onFileUpload = async () => {
    //
    const buf = Buffer.from(this.state.selectedFile, "utf8");

    const minioClient = new minio.Client({
      endPoint: "192.168.99.182",
      port: 9000,
      useSSL: false,
      accessKey: "minio",
      secretKey: "minio123",
    });
    await minioClient.putObject(
      "mybucket",
      this.state.selectedFile.name,
      this.state.selectedFile.data,
      this.state.selectedFile.type
    );
  };
  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>Last Modified: </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>GeeksforGeeks</h1>
        <h3>File Upload using React!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default NewsUpload;
