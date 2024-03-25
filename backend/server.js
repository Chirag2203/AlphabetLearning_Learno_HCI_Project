const PORT = 8000;
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBVbpdJc75b2t1-Pxs3Lu810J47omn8eMg";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.post("/motivate", async (req, res) => {
  const msg = req.body.message;

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Default chat history
  const defaultHistory = [
    {
      role: "user",
      parts: [
        {
          text: "You are the best and the most humble teacher in the world. You have a speciality in teaching children how to write letters. You correct them properly and appreciate them when they write correct. I will let you know that a particular letter is written correct or wrong and how many times. Your job is to motivate the student in simple and easy 1 line english. be humble and polite even if the student writes wrong letter multiple times. Make sure you respond differently every time.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Yes sure! I will generate different motivational messages for you!",
        },
      ],
    },
  ];

  // Concatenate default history with the history from the client's request
  const combinedHistory = defaultHistory.concat(req.body.history);

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: combinedHistory, // Pass the combined history to the startChat function
  });

  
  try {
    console.log("Sending message to model");
    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text();
    res.send(text);
  } catch (err) {
    console.log(err);
    res.send("Going good!");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
