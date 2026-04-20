import { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ttsRate, setTtsRate] = useState(0.8);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const [summaryInputs, setSummaryInputs] = useState([]);
  const [summaryChecked, setSummaryChecked] = useState(false);
  const speechRef = useRef(null);

  useEffect(() => {
    fetch("/todayReading.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch todayReading.json");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setTtsRate(json?.tts?.defaultRate || 0.8);
        setSummaryInputs(new Array(json?.summary?.answers?.length || 0).fill(""));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    speechRef.current = null;
  };

  const speak = (text) => {
    if (!text) return;
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Number(ttsRate);
    utterance.lang = "en-US";
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const speakFullPassage = () => {
    if (!data?.passage?.length) return;
    speak(data.passage.join(" "));
  };

  const handleChoice = (qIndex, optionIndex) => {
    setSelectedQuestion((prev) => ({
      ...prev,
      [qIndex]: optionIndex
    }));
  };

  const revealAnswer = (qIndex) => {
    setShowAnswers((prev) => ({
      ...prev,
      [qIndex]: true
    }));
  };

  const revealAllAnswers = () => {
    const next = {};
    data.questions.forEach((_, idx) => {
      next[idx] = true;
    });
    setShowAnswers(next);
  };

  const handleSummaryInput = (idx, value) => {
    const next = [...summaryInputs];
    next[idx] = value;
    setSummaryInputs(next);
  };

  const renderedSummary = useMemo(() => {
    if (!data?.summary?.text) return [];
    return data.summary.text.split(/\(([^)]+)\)/g);
  }, [data]);

  const isCorrectBlank = (idx) => {
    if (!summaryChecked) return null;
    const user = (summaryInputs[idx] || "").trim().toLowerCase();
    const answer = (data?.summary?.answers?.[idx] || "").trim().toLowerCase();
    return user === answer;
  };

  const score = useMemo(() => {
    if (!data?.questions?.length) return 0;
    let correct = 0;
    data.questions.forEach((q, idx) => {
      if (selectedQuestion[idx] === q.answer) correct += 1;
    });
    return correct;
  }, [data, selectedQuestion]);

  if (loading) {
    return <div style={styles.page}>Loading...</div>;
  }

  if (!data) {
    return <div style={styles.page}>Failed to load todayReading.json</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.appTitle}>News Reading App</h1>
          <div style={styles.metaRow}>
            <span style={styles.badge}>{data.date}</span>
            <span style={styles.badge}>{data.category}</span>
            <span style={styles.badge}>{data.levelLabel || `LEVEL ${data.level}`}</span>
            <span style={styles.badge}>{data.estimatedWordCount} words</span>
          </div>
        </header>

        <section style={styles.card}>
          <h2 style={styles.readingTitle}>{data.title}</h2>
          <p style={styles.subInfo}>Topic: {data.sourceTopic}</p>

          <div style={styles.ttsBox}>
            <div style={styles.ttsHeader}>
              <strong>TTS Speed: {Number(ttsRate).toFixed(1)}</strong>
              <div style={styles.buttonRow}>
                <button style={styles.primaryButton} onClick={speakFullPassage}>
                  ▶ Full Passage
                </button>
                <button style={styles.secondaryButton} onClick={stopSpeaking}>
                  ■ Stop
                </button>
              </div>
            </div>

            <input
              type="range"
              min={data.tts?.minRate || 0.8}
              max={data.tts?.maxRate || 1.3}
              step={data.tts?.step || 0.1}
              value={ttsRate}
              onChange={(e) => setTtsRate(e.target.value)}
              style={styles.slider}
            />
          </div>
        </section>

        <section style={styles.card}>
          <h3 style={styles.sectionTitle}>Reading Passage</h3>

          {data.passage.map((paragraph, idx) => (
            <div key={idx} style={styles.paragraphBlock}>
              <p style={styles.paragraph}>
                <strong>{idx + 1}. </strong>
                {paragraph}
              </p>
              <button
                style={styles.smallButton}
                onClick={() => speak(paragraph)}
              >
                🔊 Paragraph {idx + 1}
              </button>
            </div>
          ))}
        </section>

        <section style={styles.card}>
          <h3 style={styles.sectionTitle}>Vocabulary Hints</h3>
          <div style={styles.vocabGrid}>
            {(data.vocabHints || []).map((item, idx) => (
              <div key={idx} style={styles.vocabItem}>
                <strong>{item.word}</strong>
                <div style={styles.vocabMeaning}>{item.meaning}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <div style={styles.quizHeader}>
            <h3 style={styles.sectionTitleNoMargin}>Multiple Choice</h3>
            <div style={styles.scoreBadge}>
              Score: {score} / {data.questions.length}
            </div>
          </div>

          {data.questions.map((question, qIndex) => {
            const chosen = selectedQuestion[qIndex];
            const answerShown = showAnswers[qIndex];

            return (
              <div key={qIndex} style={styles.questionBox}>
                <p style={styles.questionText}>
                  {qIndex + 1}. {question.q}
                </p>

                <div style={styles.optionList}>
                  {question.options.map((option, optionIndex) => {
                    const isSelected = chosen === optionIndex;
                    const isCorrect = question.answer === optionIndex;

                    let optionStyle = { ...styles.optionButton };

                    if (isSelected) {
                      optionStyle = { ...optionStyle, ...styles.optionSelected };
                    }

                    if (answerShown && isCorrect) {
                      optionStyle = { ...optionStyle, ...styles.optionCorrect };
                    }

                    if (answerShown && isSelected && !isCorrect) {
                      optionStyle = { ...optionStyle, ...styles.optionWrong };
                    }

                    return (
                      <button
                        key={optionIndex}
                        style={optionStyle}
                        onClick={() => handleChoice(qIndex, optionIndex)}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </button>
                    );
                  })}
                </div>

                <button
                  style={styles.primaryButton}
                  onClick={() => revealAnswer(qIndex)}
                >
                  Check Answer
                </button>

                {answerShown && (
                  <div style={styles.explanationBox}>
                    <div>
                      <strong>Answer:</strong>{" "}
                      {String.fromCharCode(65 + question.answer)}
                    </div>
                    <div>
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div style={styles.buttonRow}>
            <button style={styles.primaryButton} onClick={revealAllAnswers}>
              Check All
            </button>
          </div>
        </section>

        <section style={styles.card}>
          <h3 style={styles.sectionTitle}>Summary Practice</h3>
          <p style={styles.summaryText}>
            {renderedSummary.map((part, idx) => {
              if (idx % 2 === 0) {
                return <span key={idx}>{part}</span>;
              }

              const blankIndex = Math.floor(idx / 2);
              const result = isCorrectBlank(blankIndex);

              return (
                <input
                  key={idx}
                  value={summaryInputs[blankIndex] || ""}
                  onChange={(e) => handleSummaryInput(blankIndex, e.target.value)}
                  style={{
                    ...styles.blankInput,
                    ...(result === true ? styles.blankCorrect : {}),
                    ...(result === false ? styles.blankWrong : {})
                  }}
                />
              );
            })}
          </p>

          <div style={styles.buttonRow}>
            <button
              style={styles.primaryButton}
              onClick={() => setSummaryChecked(true)}
            >
              Check Summary
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() => {
                setSummaryInputs(new Array(data.summary.answers.length).fill(""));
                setSummaryChecked(false);
              }}
            >
              Reset
            </button>
          </div>

          {summaryChecked && (
            <div style={styles.answerList}>
              <strong>Correct Answers:</strong> {data.summary.answers.join(", ")}
            </div>
          )}
        </section>

        <section style={styles.card}>
          <h3 style={styles.sectionTitle}>Literal Translation Practice</h3>

          {data.literalSentences.map((sentence, idx) => (
            <div key={idx} style={styles.literalBox}>
              <div style={styles.literalText}>
                {idx + 1}. {sentence}
              </div>
              <button
                style={styles.smallButton}
                onClick={() => speak(sentence)}
              >
                🔊 Listen
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f6f7fb",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    color: "#1f2937"
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto"
  },
  header: {
    marginBottom: "20px"
  },
  appTitle: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700"
  },
  metaRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "12px"
  },
  badge: {
    backgroundColor: "#e5e7eb",
    borderRadius: "999px",
    padding: "6px 10px",
    fontSize: "13px"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "18px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
  },
  readingTitle: {
    marginTop: 0,
    marginBottom: "8px",
    fontSize: "28px"
  },
  subInfo: {
    color: "#4b5563",
    lineHeight: 1.6
  },
  ttsBox: {
    marginTop: "18px",
    padding: "14px",
    borderRadius: "12px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb"
  },
  ttsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap"
  },
  slider: {
    width: "100%",
    marginTop: "12px"
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "14px",
    fontSize: "22px"
  },
  sectionTitleNoMargin: {
    margin: 0,
    fontSize: "22px"
  },
  paragraphBlock: {
    marginBottom: "18px"
  },
  paragraph: {
    fontSize: "17px",
    lineHeight: 1.9,
    marginBottom: "4px"
  },
  vocabGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px"
  },
  vocabItem: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "12px",
    border: "1px solid #e5e7eb"
  },
  vocabMeaning: {
    marginTop: "6px",
    color: "#4b5563"
  },
  quizHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "12px"
  },
  scoreBadge: {
    backgroundColor: "#eef2ff",
    color: "#312e81",
    borderRadius: "999px",
    padding: "8px 12px",
    fontSize: "14px",
    fontWeight: "600"
  },
  questionBox: {
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "16px"
  },
  questionText: {
    fontWeight: "bold",
    lineHeight: 1.7
  },
  optionList: {
    display: "grid",
    gap: "10px",
    marginTop: "12px",
    marginBottom: "12px"
  },
  optionButton: {
    textAlign: "left",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    cursor: "pointer"
  },
  optionSelected: {
    border: "2px solid #6366f1"
  },
  optionCorrect: {
    backgroundColor: "#dcfce7",
    border: "1px solid #16a34a"
  },
  optionWrong: {
    backgroundColor: "#fee2e2",
    border: "1px solid #dc2626"
  },
  explanationBox: {
    marginTop: "12px",
    backgroundColor: "#f9fafb",
    padding: "12px",
    borderRadius: "10px",
    lineHeight: 1.7
  },
  summaryText: {
    lineHeight: 2.2,
    fontSize: "17px"
  },
  blankInput: {
    width: "120px",
    margin: "0 6px",
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "16px"
  },
  blankCorrect: {
    backgroundColor: "#dcfce7",
    border: "1px solid #16a34a"
  },
  blankWrong: {
    backgroundColor: "#fee2e2",
    border: "1px solid #dc2626"
  },
  answerList: {
    marginTop: "12px",
    color: "#374151"
  },
  literalBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "10px",
    flexWrap: "wrap"
  },
  literalText: {
    flex: 1,
    lineHeight: 1.8
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  primaryButton: {
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer"
  },
  secondaryButton: {
    backgroundColor: "#e5e7eb",
    color: "#111827",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer"
  },
  smallButton: {
    backgroundColor: "#eef2ff",
    color: "#1f2937",
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    cursor: "pointer",
    marginTop: "8px"
  }
};
