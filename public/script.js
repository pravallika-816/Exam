async function translateText() {
    const text = document.getElementById("text").value;
    const sourceLang = document.getElementById("sourceLang").value;
    const targetLang = document.getElementById("targetLang").value;

    if (!text) {
        alert("Please enter text to translate!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, sourceLang, targetLang })
        });

        const data = await response.json();
        if (data.translatedText) {
            document.getElementById("result").innerText = "Translated: " + data.translatedText;
            document.getElementById("pronunciation").innerText = "Pronunciation: " + data.pronunciation || "N/A";
        } else {
            document.getElementById("result").innerText = "Error: " + data.error;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById("result").innerText = "Error fetching translation.";
    }
}

function copyToClipboard() {
    const resultText = document.getElementById("result").innerText;
    if (resultText) {
        navigator.clipboard.writeText(resultText).then(() => {
            alert("Translated text copied to clipboard!");
        });
    } else {
        alert("Nothing to copy!");
    }
}
