import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [rate, setRate] = useState(0.8);

  useEffect(() => {
    fetch("/todayReading.json")
      .then(res => res.json())
      .then(setData);
  }, []);

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = rate;
    speechSynthesis.speak(utter);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{data.title}</h1>

      <label>TTS Speed: {rate}</label>
      <input
        type="range"
        min="0.8"
        max="1.3"
        step="0.1"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />

      {data.passage.map((p, i) => (
        <p key={i} onClick={() => speak(p)}>
          {p}
        </p>
      ))}

      <h3>Literal Practice</h3>
      {data.literalSentences.map((s, i) => (
        <div key={i}>
          <span>{s}</span>
          <button onClick={() => speak(s)}>🔊</button>
        </div>
      ))}
    </div>
  );
}
