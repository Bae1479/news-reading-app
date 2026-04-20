import fs from "fs";

const categories = ["Economy", "World", "AI", "History"];

const today = new Date();
const dateString = today.toISOString().split("T")[0];
const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
const category = categories[dayIndex % categories.length];
const level = 1;

function getLevelLabel(n) {
  return `LEVEL ${n}`;
}

function getReadingSet(category, level) {
  const sets = {
    Economy: {
      title: "Why High Interest Rates Still Matter",
      sourceTopic: "interest rates, inflation, consumption, investment, policy timing",
      passage: [
        "Interest rates remain one of the most closely watched tools in modern economic policy. When central banks raise rates, they usually want to reduce inflation by slowing demand. If borrowing becomes more expensive, households and firms tend to spend less freely. In theory, this helps cool rapid price growth. In practice, however, the outcome is rarely simple. Policies designed to reduce inflation can also weaken hiring, delay investment, and increase pressure on people who already face high living costs. That is why debates about interest rates continue even when inflation appears to be easing.",
        "For households, the impact is often direct. Mortgage payments may rise, credit card balances become more expensive, and people may delay large purchases such as cars, appliances, or home improvements. Even people without major debt can feel the effect. When consumer spending slows, stores place smaller orders, service industries become cautious, and employers may hesitate before expanding payrolls. In that way, a decision announced by a central bank can gradually affect everyday life through many channels at once.",
        "Businesses respond to higher rates in similar ways. A company planning to open a new branch, build a factory, or invest in research has to ask whether future returns are still worth the additional financing cost. If loans become more expensive, managers often postpone expansion unless expected profits are especially strong. Economists sometimes argue that this is necessary because excessive investment during a boom can feed inflation further. But if business spending falls too sharply, the economy may lose momentum in ways that last beyond the period of high inflation.",
        "The problem becomes more difficult because inflation does not come from one source alone. Sometimes prices rise because consumer demand is strong. At other times, inflation is driven by supply disruptions, such as energy shortages, transport delays, or conflict that affects trade routes. Interest-rate policy can influence spending, but it cannot directly produce more oil, repair damaged logistics, or solve geopolitical tension. As a result, central banks are often criticized from opposite directions: some people say they are doing too much, while others insist they are not doing enough.",
        "Timing is therefore crucial. If rates are reduced too early, inflation may return before expectations become stable. If rates remain high for too long, an unnecessary slowdown may develop. Policymakers must study wage growth, labor-market strength, consumer sentiment, and business activity rather than rely on a single statistic. They also care about expectations. If firms and workers begin to assume inflation will remain high, they may raise prices and wage demands in ways that make inflation harder to control. For that reason, interest-rate debates are ultimately about balance. Central banks are trying to preserve price stability without damaging employment, investment, and public confidence more than necessary."
      ],
      questions: [
        {
          q: "What is the main purpose of raising interest rates?",
          options: [
            "To increase household borrowing",
            "To reduce inflationary pressure",
            "To guarantee higher profits for firms",
            "To eliminate all supply shortages"
          ],
          answer: 1,
          explanation: "The passage says central banks usually raise rates to slow demand and reduce inflation."
        },
        {
          q: "According to the passage, how can households feel the effect of higher rates?",
          options: [
            "Mortgage and credit costs may rise",
            "Imported goods disappear immediately",
            "Taxes are automatically reduced",
            "Wages always increase"
          ],
          answer: 0,
          explanation: "The passage directly mentions mortgage payments and credit card balances becoming more expensive."
        },
        {
          q: "Why is interest-rate policy not always enough by itself?",
          options: [
            "It applies only to large companies",
            "It cannot directly fix supply shocks",
            "It works only during recessions",
            "It prevents all consumer spending"
          ],
          answer: 1,
          explanation: "The passage explains that rate policy cannot directly solve energy shortages, logistics problems, or conflict."
        },
        {
          q: "Why do policymakers care about expectations?",
          options: [
            "Because expectations can shape inflation behavior",
            "Because expectations replace official data",
            "Because expectations affect only exporters",
            "Because expectations are easy to control"
          ],
          answer: 0,
          explanation: "If people expect inflation to stay high, they may behave in ways that keep inflation elevated."
        },
        {
          q: "Which statement best summarizes the passage?",
          options: [
            "High rates help inflation but may create economic trade-offs",
            "Interest rates affect only financial markets",
            "Inflation is caused only by consumer spending",
            "Central banks prefer slow growth in every situation"
          ],
          answer: 0,
          explanation: "The passage emphasizes both the usefulness and the cost of high interest rates."
        }
      ],
      summary: {
        text: "High interest rates are meant to (reduce) inflation, but they can also slow spending, delay (investment), and create difficult trade-offs.",
        answers: ["reduce", "investment"]
      },
      literalSentences: [
        "If borrowing becomes more expensive, households and firms tend to spend less freely.",
        "A decision announced by a central bank can gradually affect everyday life through many channels at once.",
        "Interest-rate debates are ultimately about balance."
      ]
    },

    World: {
      title: "Why Regional Conflict Can Become a Global Economic Issue",
      sourceTopic: "regional conflict, shipping routes, energy prices, financial uncertainty",
      passage: [
        "Regional conflict is often described as a local crisis, but its consequences rarely remain limited to one place. In a highly connected world economy, conflict in one strategic area can affect shipping, energy prices, insurance costs, and investor confidence far beyond the region itself. For that reason, world news and economic news are frequently linked. A conflict does not have to spread geographically in order to spread economically.",
        "One of the clearest channels is energy. If a conflict threatens an oil-producing area or an important transport route, markets may respond immediately. Prices can rise even before an actual shortage appears because traders, firms, and governments fear future disruption. Higher energy costs then affect transportation, manufacturing, agriculture, and household utility bills. What begins as a security issue can therefore become an inflation issue in countries located far from the original conflict zone.",
        "Shipping is another major factor. Global trade depends on reliable sea routes, stable ports, and predictable insurance conditions. When conflict makes transport riskier, shipping companies may choose longer routes or reduce activity in dangerous areas. Insurance premiums may rise sharply, delivery schedules may become less reliable, and businesses may wait longer for essential components. Even firms with no direct connection to the conflict can see costs increase because the global logistics network has become less efficient.",
        "Financial markets also react to uncertainty. During crises, investors often move toward assets they consider safer, such as government bonds or gold. Stock prices may fall, currencies may shift, and borrowing costs may change. These reactions matter because they influence real economic decisions. If companies face weaker demand or more uncertain financing conditions, they may postpone hiring and investment. Governments may also find it more expensive to support households through subsidies or emergency spending.",
        "In the longer term, conflict can change strategy as well as prices. Countries may try to diversify energy suppliers, strengthen reserves, protect key routes, or relocate parts of supply chains. These changes are costly, but crises often reveal weaknesses that had already existed. The broader lesson is that regional conflict should not be understood only in military terms. In an interconnected system, local instability can produce global consequences through trade, energy, expectations, and policy responses."
      ],
      questions: [
        {
          q: "What is the main argument of the passage?",
          options: [
            "Regional conflicts stay regional in their effects",
            "Regional conflicts can have global economic consequences",
            "Energy prices never respond to conflict",
            "Shipping routes are less important than before"
          ],
          answer: 1,
          explanation: "The author argues that conflict can spread economically through connected systems."
        },
        {
          q: "Why can energy prices rise before an actual shortage appears?",
          options: [
            "Because demand disappears",
            "Because companies stop using oil permanently",
            "Because markets fear future disruption",
            "Because governments ban exports immediately"
          ],
          answer: 2,
          explanation: "The passage says fear and expectation can push prices up even before supply is reduced."
        },
        {
          q: "How can shipping instability affect unrelated businesses?",
          options: [
            "By reducing labor costs",
            "By improving delivery speed",
            "By increasing delays and logistics costs",
            "By eliminating insurance payments"
          ],
          answer: 2,
          explanation: "The passage notes that delays and higher costs spread through supply chains."
        },
        {
          q: "How do financial markets respond during conflict?",
          options: [
            "They become irrelevant",
            "Investors often move toward safer assets",
            "All stock prices rise",
            "Currencies stop changing"
          ],
          answer: 1,
          explanation: "The passage explicitly mentions movement toward safer assets such as bonds or gold."
        },
        {
          q: "What is one long-term response mentioned in the passage?",
          options: [
            "Reducing trade permanently",
            "Ignoring energy security",
            "Diversifying suppliers and routes",
            "Ending all public spending"
          ],
          answer: 2,
          explanation: "The author mentions diversification and supply-chain adjustment as longer-term responses."
        }
      ],
      summary: {
        text: "Regional conflict can raise (energy) prices, disrupt shipping, and spread wider economic (uncertainty) across countries.",
        answers: ["energy", "uncertainty"]
      },
      literalSentences: [
        "A conflict does not have to spread geographically in order to spread economically.",
        "Prices can rise even before an actual shortage appears because traders, firms, and governments fear future disruption.",
        "In an interconnected system, local instability can produce global consequences."
      ]
    },

    AI: {
      title: "Why Governments Are Debating AI Rules",
      sourceTopic: "AI regulation, innovation, public trust, labor change, safety",
      passage: [
        "Artificial intelligence is no longer viewed only as a technical advance. It is increasingly discussed as an issue of policy, labor, education, competition, and public trust. As AI systems become more capable in writing, search, coding, and image generation, governments face a difficult question: how can they support innovation without allowing harmful uses to spread too quickly? That question lies at the center of current debates over AI regulation.",
        "Supporters of regulation usually focus on safety and accountability. They argue that AI systems can generate false information, amplify bias, imitate human communication too persuasively, or be used in sensitive decisions without enough transparency. In fields such as education, hiring, healthcare, and public administration, even small errors can create unfair results at scale. For that reason, many people believe clear standards are necessary before adoption becomes too widespread.",
        "Critics of strong regulation are not necessarily against rules. Instead, they worry about badly designed rules. If governments impose vague or heavy requirements too early, smaller firms may struggle to compete while large companies gain even more power. Some researchers also warn that countries that regulate too rigidly may fall behind in a technology likely to affect productivity, science, defense, and business strategy. From this perspective, regulation is necessary, but timing and design matter greatly.",
        "Another challenge is that AI is not a single tool. A chatbot used for writing help does not create the same risk as a system used in medical diagnosis or autonomous transport. Lawmakers therefore must decide whether to regulate the model itself, the company deploying it, the data used to train it, or the setting in which it is applied. No single rule solves every problem. The diversity of AI applications is one reason the debate remains complicated.",
        "Labor concerns also shape the discussion. Some people believe AI will reduce routine work and improve productivity, eventually creating new jobs. Others worry that many workers will face pressure before retraining systems are ready. Writing, design, analysis, and customer support are already changing. As a result, AI policy is not only about innovation; it is also about how social and economic transitions will be managed. Governments are trying to avoid two mistakes at once: moving too slowly to prevent harm, or moving so rigidly that useful progress is blocked."
      ],
      questions: [
        {
          q: "Why has AI become a political and social issue?",
          options: [
            "Because it is used only in research labs",
            "Because its effects now reach many parts of society",
            "Because governments write all AI software",
            "Because AI systems have stopped improving"
          ],
          answer: 1,
          explanation: "The passage says AI now affects policy, labor, trust, education, and competition."
        },
        {
          q: "Why do supporters of regulation want clear standards?",
          options: [
            "To slow all research permanently",
            "To avoid adoption in every field",
            "To reduce harm and improve accountability",
            "To make large firms weaker immediately"
          ],
          answer: 2,
          explanation: "The passage emphasizes safety, fairness, and accountability."
        },
        {
          q: "Why do critics worry about badly designed regulation?",
          options: [
            "It may damage innovation and competition",
            "It makes AI easier to use",
            "It removes all public trust",
            "It eliminates the need for policy"
          ],
          answer: 0,
          explanation: "The author says poor rules may burden smaller firms and slow useful progress."
        },
        {
          q: "Why is AI hard to regulate with one broad rule?",
          options: [
            "Because lawmakers ignore technology",
            "Because all AI systems are identical",
            "Because different applications create different risks",
            "Because only transport systems use AI"
          ],
          answer: 2,
          explanation: "The passage notes that chatbots, diagnosis tools, and transport systems do not create the same risks."
        },
        {
          q: "What balance are governments trying to achieve?",
          options: [
            "Faster inflation and lower wages",
            "Innovation with safety and social stability",
            "Fewer tools and more secrecy",
            "Less trust and more automation"
          ],
          answer: 1,
          explanation: "The conclusion says governments are trying to support useful progress while preventing harm."
        }
      ],
      summary: {
        text: "Governments are debating AI rules because they must balance (innovation) with safety, fairness, and public (trust).",
        answers: ["innovation", "trust"]
      },
      literalSentences: [
        "That question lies at the center of current debates over AI regulation.",
        "No single rule solves every problem.",
        "AI policy is not only about innovation; it is also about how social and economic transitions will be managed."
      ]
    },

    History: {
      title: "Why Strong Empires Needed More Than Armies",
      sourceTopic: "empires, communication, trade networks, local elites, legitimacy",
      passage: [
        "When people imagine powerful empires, they usually picture armies, conquest, and rulers at the center of command. Military force certainly mattered, but it was rarely enough on its own. Large empires endured only when they could move information, collect resources, and persuade distant populations that imperial rule had some legitimacy. In that sense, empires relied on networks as much as on soldiers.",
        "Administration was one of the greatest challenges. Conquering territory could take months, but governing it could require generations of adaptation. Without systems of communication, tax collection, record keeping, and local enforcement, even a victorious empire could become unstable. Orders from the center might arrive too late, officials might act corruptly, and local leaders might develop interests that no longer matched those of the imperial government.",
        "Trade networks strengthened empires in several ways. They generated revenue, linked regions economically, and moved not only goods but also information, languages, and customs. A stable imperial environment could make trade safer by protecting roads, ports, and caravan routes. In return, merchants and local elites often had reasons to cooperate with imperial authorities. Economic integration therefore gave empires a source of resilience that extended beyond military power.",
        "Local cooperation was equally important. Most empires did not rule every province in exactly the same way. Instead, they often depended on local elites to collect taxes, maintain order, and translate central policies into local practice. This arrangement was efficient, but it also created risk. If local support weakened, rebellion became more likely. Empires had to negotiate constantly by rewarding loyalty, recognizing tradition, and punishing resistance when necessary.",
        "Legitimacy mattered as much as force. Rulers used ceremonies, laws, monuments, and official language to present themselves as protectors of order rather than simple conquerors. If subjects believed imperial rule brought peace, prosperity, or justice, cooperation became easier and the need for constant coercion was reduced. Looking at imperial history in this way changes the picture. Durable power was not just military. It depended on communication, coordination, trade, and the ability to make rule appear acceptable across distance."
      ],
      questions: [
        {
          q: "What is the main idea of the passage?",
          options: [
            "Empires survived only through military strength",
            "Durable empires depended on networks as well as armies",
            "Trade damaged imperial stability",
            "Local elites were unimportant"
          ],
          answer: 1,
          explanation: "The passage argues that communication, trade, and legitimacy were essential alongside military force."
        },
        {
          q: "Why was administration difficult for empires?",
          options: [
            "Because conquest always failed",
            "Because local populations all spoke one language",
            "Because governing required communication and institutions",
            "Because trade made rule impossible"
          ],
          answer: 2,
          explanation: "The author explains that governing required communication, taxation, records, and enforcement."
        },
        {
          q: "How did trade help empires?",
          options: [
            "By removing the need for armies",
            "By generating revenue and linking regions",
            "By preventing all rebellion",
            "By ending local traditions"
          ],
          answer: 1,
          explanation: "Trade supported revenue, integration, and resilience."
        },
        {
          q: "Why could dependence on local elites be risky?",
          options: [
            "They always supported rebellion immediately",
            "They weakened trade routes by design",
            "Their interests could move away from the center",
            "They could not collect taxes"
          ],
          answer: 2,
          explanation: "The passage says local leaders could become less aligned with imperial authorities."
        },
        {
          q: "What role did legitimacy play?",
          options: [
            "It made military force irrelevant",
            "It helped reduce the need for constant coercion",
            "It prevented all corruption",
            "It mattered only in capitals"
          ],
          answer: 1,
          explanation: "If rule seemed acceptable, cooperation increased and less force was needed."
        }
      ],
      summary: {
        text: "Empires endured not only through armies but through (communication), trade, and political (legitimacy).",
        answers: ["communication", "legitimacy"]
      },
      literalSentences: [
        "In that sense, empires relied on networks as much as on soldiers.",
        "Economic integration therefore gave empires a source of resilience that extended beyond military power.",
        "Durable power was not just military."
      ]
    }
  };

  const selected = sets[category];

  const vocabByLevel = {
    1: [
      { word: "policy", meaning: "an official plan or course of action" },
      { word: "investment", meaning: "money used for future growth" },
      { word: "regulation", meaning: "official control or rules" },
      { word: "legitimacy", meaning: "accepted rightfulness" }
    ],
    2: [
      { word: "inflationary", meaning: "related to rising prices" },
      { word: "accountability", meaning: "responsibility for actions" },
      { word: "integration", meaning: "combining into a whole" },
      { word: "coercion", meaning: "forcing someone through pressure" }
    ],
    3: [
      { word: "resilience", meaning: "ability to recover from difficulty" },
      { word: "transparency", meaning: "openness and clarity" },
      { word: "interconnected", meaning: "linked closely together" },
      { word: "stability", meaning: "the condition of being steady" }
    ]
  };

  return {
    ...selected,
    vocabHints: vocabByLevel[level] || vocabByLevel[1]
  };
}

const reading = getReadingSet(category, level);
const estimatedWordCount = reading.passage.join(" ").split(/\s+/).length;

const data = {
  date: dateString,
  level,
  levelLabel: getLevelLabel(level),
  category,
  title: reading.title,
  sourceTopic: reading.sourceTopic,
  estimatedWordCount,
  passage: reading.passage,
  questions: reading.questions,
  summary: reading.summary,
  literalSentences: reading.literalSentences,
  vocabHints: reading.vocabHints,
  tts: {
    defaultRate: 0.8,
    minRate: 0.8,
    maxRate: 1.3,
    step: 0.1
  }
};

fs.writeFileSync("public/todayReading.json", JSON.stringify(data, null, 2), "utf8");
console.log(`Generated ${category} / ${data.levelLabel} / ${estimatedWordCount} words`);
