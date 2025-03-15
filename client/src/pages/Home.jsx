import React, { useState } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");

  const translateText = () => {
    if (!text.trim()) {
      alert("Please enter text to translate!");
      return;
    }
    setTranslatedText(`Translated (${targetLang}): ${text}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    alert("Copied to clipboard!");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#FFFDD0",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <h1 style={{ color: "#B7410E" }}>Text Translator</h1>
        <textarea
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            style={{
              width: "48%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            style={{
              width: "48%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="es">Spanish</option>
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
        </div>

        <button
          onClick={translateText}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#B7410E",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Translate
        </button>

        <p style={{ fontSize: "16px", fontWeight: "bold" }}>{translatedText}</p>

        {translatedText && (
          <button
            onClick={copyToClipboard}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#FFA07A",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
