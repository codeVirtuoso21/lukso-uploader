import "./styles.css";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { PinataUploader } from "@lukso/data-provider-pinata";
import { config } from "dotenv";
config({ path: "./.env" });

export default function App() {
  console.log("process.env.TEST_PINATAAPIKEY");
  const fileInput = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [hash, setHash] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const provider = new PinataUploader({
    pinataApiKey: process.env.TEST_PINATAAPIKEY,
    pinataSecretApiKey: process.env.TEST_PINATASECRETAPIKEY,
    pinataJWTKey: process.env.TEST_PINATAJWTKEY,
  });

  const uploadAssets = useCallback(async () => {
    console.log("upload function");
    const file = fileInput?.current?.files?.item(0) as File;
    const formData = new FormData();
    formData.append("file", file); // FormData keys are called fields
    const urlinfo = await provider.upload(file);
    console.log(urlinfo);
  }, []);

  return (
    <div className="App">
      <h1>Pinata IPFS upload test interface</h1>
      <div>
        <input ref={fileInput} type="file" accept="image/*" />
        <button
          className="m-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded"
          onClick={uploadAssets}
        >
          Upload
        </button>
        <div className="url">{url}</div>
        {/* <div>
          <img className="image" src={imageUrl} alt="uploaded image" />
        </div> */}
      </div>
    </div>
  );
}
