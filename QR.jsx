import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";
import "./QR.css";

function QR() {
  const [url, setUrl] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [size, setSize] = useState("200");
  const [color, setColor] = useState("#000000");
  const qrRef = useRef(null);

  function GetQR(event) {
    event.preventDefault();
    if (url === "") return;

    const api = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      url
    )}&color=${color.substring(1)}`; 

    setQrcode(api);
  }

  function download() {
    saveAs(qrcode, "qr.png");
  }

  return (
    <div className="qr-container glass">
      <h2>QRGen</h2>
      <form onSubmit={GetQR} className="qr-form">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="qr-input"
        />

        <select value={size} onChange={(e) => setSize(e.target.value)} className="qr-select">
          {[100, 200, 300, 400, 500].map((s) => (
            <option key={s} value={s}>{s}x{s}</option>
          ))}
        </select>

        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="qr-color" />

        <button type="submit" className="qr-button">Generate</button>
      </form>

      {qrcode && (
        <div className="qr-image" ref={qrRef}>
          <img src={qrcode} alt="Generated QR Code" className="fade-in" />
          <br />
          <button className="download-button" onClick={download}>Download QR</button>
        </div>
      )}
    </div>
  );
}

export default QR;
