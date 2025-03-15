const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/translationDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model("User", userSchema);

const translationSchema = new mongoose.Schema({
    originalText: String,
    translatedText: String,
    sourceLang: String,
    targetLang: String,
    pronunciation: String,
    timestamp: { type: Date, default: Date.now }
});
const Translation = mongoose.model("Translation", translationSchema);

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.json({ msg: "Signup successful" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


app.post("/login", async (req, res) => {
    console.log("Received Form Data:", req.body); 
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

app.post("/translate", async (req, res) => {
    const text = req.body.text;
    const sourceLang = req.body.sourceLang;
    const targetLang = req.body.targetLang;
    if (!text || !sourceLang || !targetLang) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const response = await axios.get(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
        );
        console.log("API Response:", response.data);

        if (!response.data.responseData) {
            return res.status(500).json({ error: "Translation API failed" });
        }

        const translatedText = response.data.responseData.translatedText || "Translation failed";
        let pronunciation = targetLang === "en" ? text : "N/A";

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
        console.error("Translation API Error:", error.message || error);
        res.status(500).json({ error: "Translation failed", details: error.message });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.error(`Port ${PORT} is already in use. Please use a different port.`);
            process.exit(1);
        } else {
            throw err;
        }
    });
