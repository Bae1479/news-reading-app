import fs from "fs";

function generateReading() {
  const data = {
    date: new Date().toISOString().split("T")[0],
    level: 1,
    title: "Global Interest Rates and Economic Pressure",
    category: "Economy",
    passage: [
      "Central banks around the world are facing increasing pressure to manage inflation while supporting economic growth. Over the past year, many countries have raised interest rates to control rising prices, but this strategy has also slowed down economic activity.",
      "Higher interest rates make borrowing more expensive for both consumers and businesses. As a result, people tend to spend less, and companies may delay investments. While this can reduce inflation, it can also lead to slower economic growth.",
      "Some economists argue that central banks must carefully balance these two goals. If they raise rates too aggressively, they risk causing a recession. On the other hand, if they do too little, inflation may remain high for a longer period.",
      "In addition, global factors such as energy prices, geopolitical tensions, and supply chain disruptions continue to affect inflation. These challenges make it more difficult for policymakers to predict the future direction of the economy.",
      "Despite these uncertainties, many central banks have signaled that they will continue to monitor economic data closely. Their decisions in the coming months will play a crucial role in shaping the global economic outlook."
    ],
    questions: [
      {
        q: "What is the main purpose of raising interest rates?",
        options: [
          "To increase consumer spending",
          "To control inflation",
          "To boost company investments",
          "To reduce taxes"
        ],
        answer: 1,
        explanation: "Interest rates are raised to control inflation by reducing spending."
      }
    ],
    summary: {
      text: "Central banks are trying to (____) inflation while maintaining (____), but face risks such as recession and global uncertainty.",
      answers: ["control", "growth"]
    },
    literalSentences: [
      "Higher interest rates make borrowing more expensive.",
      "Companies may delay investments.",
      "Central banks monitor economic data closely."
    ],
    tts: {
      defaultRate: 0.8,
      minRate: 0.8,
      maxRate: 1.3,
      step: 0.1
    }
  };

  fs.writeFileSync("public/todayReading.json", JSON.stringify(data, null, 2));
}

generateReading();
