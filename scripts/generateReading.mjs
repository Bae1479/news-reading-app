import fs from "fs";

const data = {
  date: new Date().toISOString().split("T")[0],
  level: 1,
  levelLabel: "LEVEL 1",
  category: "Economy",
  title: "Test Stable Version",
  sourceTopic: "test",
  estimatedWordCount: 120,
  passage: [
    "This is a stable test paragraph for debugging.",
    "If this works, we know the problem is in the complex generator."
  ],
  questions: [
    {
      q: "What is this?",
      options: ["A test", "A failure", "A bug", "An error"],
      answer: 0,
      explanation: "It is a test."
    }
  ],
  summary: {
    text: "This is a (test) summary.",
    answers: ["test"]
  },
  literalSentences: [
    "This is a test sentence.",
    "Debugging is important.",
    "We fix errors step by step."
  ],
  vocabHints: [
    { word: "test", meaning: "trial" }
  ],
  tts: {
    defaultRate: 0.8,
    minRate: 0.8,
    maxRate: 1.3,
    step: 0.1
  }
};

fs.writeFileSync("public/todayReading.json", JSON.stringify(data, null, 2));
console.log("Stable generator success");
