const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/translationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const translationSchema = new mongoose.Schema({
    originalText: String,
    translatedText: String,
    sourceLang: String,
    targetLang: String,
    pronunciation: String,
    timestamp: { type: Date, default: Date.now }
});

const Translation = mongoose.model("Translation", translationSchema);

app.post("/translate", async (req, res) => {
    console.log("Received request:", req.body);

    const { text, sourceLang, targetLang } = req.body;
    if (!text || !sourceLang || !targetLang) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const response = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
        console.log("API Response:", response.data);

        const translatedText = response.data.responseData.translatedText;
        let pronunciation = "N/A"; 
        if (targetLang === "en") { 
            pronunciation = text; 
        }

        if (!translatedText) {
            return res.status(500).json({ error: "Translation API failed" });
        }

        const newTranslation = new Translation({
            originalText: text,
            translatedText,
            sourceLang,
            targetLang,
            pronunciation
        });

        await newTranslation.save();
        console.log("Saved to DB:", newTranslation);

        res.json({ translatedText, pronunciation });
    } catch (error) {
        console.error("Translation API Error:", error);
        res.status(500).json({ error: "Translation failed" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
