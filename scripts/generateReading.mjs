import fs from "fs";

const categories = ["Economy", "World", "AI", "History"];

const today = new Date();
const dateString = today.toISOString().split("T")[0];
const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
const category = categories[dayIndex % categories.length];

// 1, 2, 3 중 기본 난이도
// 지금은 자동 기본값 1
// 나중에 GitHub Actions input으로 확장 가능
const level = 1;

function getLevelLabel(level) {
  if (level === 1) return "LEVEL 1";
  if (level === 2) return "LEVEL 2";
  return "LEVEL 3";
}

function getTopicByCategory(category) {
  const topics = {
    Economy: {
      title: "Why High Interest Rates Still Matter",
      sourceTopic: "global interest rates, inflation, household pressure, delayed investment"
    },
    World: {
      title: "Why Regional Conflicts Affect the Global Economy",
      sourceTopic: "regional conflict, shipping risk, energy prices, supply uncertainty"
    },
    AI: {
      title: "Why Governments Are Debating AI Rules",
      sourceTopic: "AI regulation, innovation, safety, labor change, public trust"
    },
    History: {
      title: "Why Historical Empires Relied on Networks, Not Just Armies",
      sourceTopic: "historical empires, trade routes, administration, communication, legitimacy"
    }
  };

  return topics[category];
}

function buildPassage(category, level) {
  const topic = getTopicByCategory(category);

  const passages = {
    Economy: [
      "In many countries, interest rates remain one of the most closely watched signals in the economy. When central banks raise rates, the goal is usually clear: to slow inflation before rising prices become a long-term problem. Yet the policy is never simple. Higher rates may reduce excessive spending, but they can also place pressure on families, small businesses, and governments that are already dealing with weak growth. This tension is why debates about monetary policy continue long after inflation begins to ease.",
      "For households, the effect of high rates is often immediate. Mortgage payments may rise, credit card balances become more expensive, and people who once felt confident about large purchases begin to hesitate. Even those who are not borrowing directly can feel the impact. If consumers reduce spending, stores order less inventory, businesses postpone expansion, and employers become more cautious about hiring. In that way, an interest-rate decision made by a central bank can slowly spread through daily life in ways that are both visible and indirect.",
      "Businesses face a similar problem. A company planning to build a new factory, open more stores, or invest in research must calculate whether future profits will justify higher financing costs. When borrowing becomes expensive, managers tend to delay projects unless the expected return is unusually strong. Economists sometimes see this slowdown as necessary because it helps cool an overheated economy. However, if investment falls too sharply, the same policy that lowers inflation may also weaken future productivity and reduce economic momentum.",
      "Another reason the issue remains difficult is that inflation is not caused by one factor alone. In some periods, prices rise because consumers are spending too freely. In others, inflation is driven by supply shocks such as energy shortages, shipping delays, or geopolitical conflict. Interest-rate policy is powerful, but it cannot solve every kind of inflation equally well. Raising rates may reduce demand, yet it cannot directly create more oil, reopen blocked trade routes, or repair damaged supply chains. This is why policymakers are often criticized from both sides at the same time.",
      "Recent economic debates have focused not only on whether rates should rise or fall, but also on timing. If central banks cut too early, inflation could return before expectations stabilize. If they wait too long, they may deepen an economic slowdown that is already underway. Much depends on whether price growth is broad and persistent or limited to a few sectors. Labor-market data, wage growth, consumer confidence, and business investment all become part of the decision. Policymakers therefore rely on a wide range of indicators rather than a single headline number.",
      "At the same time, public expectations matter more than many people realize. If workers and companies begin to assume that inflation will remain high, they often change their behavior in ways that make inflation harder to control. Employees demand larger wage increases, firms raise prices more quickly, and long-term contracts reflect the expectation of future instability. Central banks therefore try not only to influence actual spending but also to shape confidence. Their statements, forecasts, and tone can affect financial markets long before any official rate change occurs.",
      "For this reason, high interest rates are not simply a technical tool used by economists. They represent an attempt to balance competing priorities: price stability, employment, investment, and public trust. There is rarely a perfect moment to tighten policy or to relax it. Instead, central banks move through uncertainty, knowing that every choice carries costs. Understanding this broader context helps explain why interest-rate debates remain central to economic news even when inflation appears to be moving in the right direction."
    ],
    World: [
      "Regional conflicts are often described as local events, but their effects rarely remain limited to one place. In a global economy built on shipping lanes, energy flows, and financial confidence, even a geographically narrow conflict can produce consequences far beyond the battlefield. Investors, manufacturers, and governments pay close attention not only to military developments themselves but also to the possibility that the conflict could interrupt transport, disturb trade routes, or increase the price of essential resources. This is one reason world news and economic news are often closely connected.",
      "One major channel of influence is energy. If a conflict affects an oil-producing region or threatens a route used to transport fuel, markets respond quickly. The fear of future disruption can push prices upward even before a physical shortage appears. Higher energy prices then feed into many other sectors. Transportation becomes more expensive, factory costs rise, food distribution is affected, and households begin to feel pressure through electricity and heating bills. What begins as a security issue can therefore turn into a broader inflation concern for countries far away.",
      "Shipping is another vulnerable area. Much of world trade depends on narrow passages, major ports, and predictable insurance costs. When conflict raises the danger of attack or instability, shipping companies may choose longer routes, reduce the number of voyages, or pay sharply higher insurance premiums. Delays then spread through supply chains. Retailers wait longer for goods, manufacturers struggle to obtain parts, and exporters face unpredictable delivery schedules. Even companies with no direct connection to the conflict may find their costs rising because global logistics have become less efficient.",
      "Financial markets also react to uncertainty. During periods of conflict, investors often move money toward assets they believe are safer, such as government bonds or gold. Currency values may shift, stock prices may fall, and borrowing conditions can tighten. These changes affect more than professional traders. If financial conditions worsen, businesses may delay hiring or investment, and governments may face higher costs when financing public spending. In this way, the psychological effect of conflict can become economically significant even when direct trade volumes remain unchanged.",
      "Governments respond in several ways. Some release emergency energy reserves, seek alternative suppliers, or coordinate with allies to protect shipping routes. Others increase domestic subsidies to reduce pressure on households. Yet these steps are often expensive and politically difficult. Leaders must decide whether short-term support is worth the budgetary burden, especially if the conflict continues for months rather than weeks. In democracies, public patience may weaken if citizens feel they are paying a growing price for events they cannot control and do not fully understand.",
      "Conflicts also influence diplomacy and long-term strategy. Countries that depend too heavily on a single supplier or trade route may try to diversify. Manufacturers may relocate parts of their supply chains, and governments may invest more in energy security, domestic production, or regional alliances. These adjustments are rarely immediate, but conflict can accelerate decisions that had already been under discussion. In that sense, a crisis does not only create damage; it can also reveal existing weaknesses in how the world economy is organized.",
      "For readers of world news, the important lesson is that conflict should not be viewed only through military headlines. The larger story often includes shipping, prices, financial confidence, and policy choices made in distant capitals. Regional violence becomes global in its consequences because modern systems are tightly linked. When one strategic area becomes unstable, the shock moves outward through trade, energy, and expectations. That is why events in one region can shape household costs and political debates on the other side of the world."
    ],
    AI: [
      "Artificial intelligence is no longer discussed only as a technical achievement. It has become a political, economic, and social issue at the same time. Governments now face a difficult question: how can they encourage innovation without allowing harmful uses of the technology to spread too quickly? This debate has intensified as AI systems have become more capable in language, image generation, search, coding, and decision support. The more useful these systems appear, the more urgent the demand for clear rules becomes.",
      "Supporters of regulation usually begin with safety and trust. They argue that powerful AI systems can generate false information at scale, imitate human communication too convincingly, or reinforce unfair bias if training data are flawed. In sensitive areas such as hiring, education, healthcare, or law enforcement, even small errors can have serious consequences. Because private companies are often moving faster than public institutions, critics worry that standards may be set by market competition rather than by democratic debate. For them, regulation is not an obstacle to progress but a condition for responsible adoption.",
      "Others warn that poorly designed regulation could do real damage. AI development depends on research freedom, investment, talent mobility, and fast experimentation. If governments impose vague or burdensome rules too early, smaller companies may be pushed out, leaving only large firms with enough resources to comply. Some economists also argue that countries that regulate too aggressively could fall behind in a technology likely to shape productivity, defense, education, and scientific discovery. In this view, caution is necessary, but overreaction carries its own cost.",
      "A further complication is that AI is not one thing. A chatbot used for writing assistance is not the same as an algorithm used in medical diagnosis or autonomous navigation. Different applications create different levels of risk. This makes broad regulation difficult. Policymakers must decide whether to regulate the underlying models, the data they are trained on, the companies that deploy them, or the contexts in which they are used. Each approach has strengths, but none solves the entire problem. Lawmakers therefore struggle to create rules that are flexible without becoming meaningless.",
      "Labor concerns add another layer to the debate. Optimists argue that AI will increase productivity, reduce routine work, and create new occupations just as previous technologies did. Skeptics accept that some new jobs will emerge but note that transition costs may be severe. Workers in writing, customer service, design, analysis, and programming may face pressure long before retraining systems are ready. If productivity gains are captured mainly by large firms, inequality could widen even while the overall economy grows. That possibility makes AI policy not just a matter of technology, but also of social stability.",
      "Public trust depends heavily on transparency. People are more willing to accept AI when they understand how and why it is being used. This does not mean every model must reveal every line of code. Rather, institutions may need to explain what data were used, what limits the system has, and when human review remains necessary. Without such safeguards, citizens may feel that important decisions are being made by opaque systems they cannot challenge. Once trust is lost, even useful applications may face resistance.",
      "The debate over AI regulation is therefore not a simple clash between innovation and fear. It is a negotiation over speed, responsibility, competition, and legitimacy. Governments are trying to avoid two opposite mistakes: moving so slowly that harm spreads before standards exist, or moving so rigidly that progress is frozen. The outcome will shape not only the technology sector but also the relationship between citizens, institutions, and automated systems in the years ahead."
    ],
    History: [
      "When people imagine powerful empires, they often picture armies, conquest, and the authority of a ruler at the center. Military force certainly mattered, but it was rarely enough on its own. Large empires survived only when they could move information, collect resources, and persuade distant populations that imperial rule had some form of legitimacy. In other words, empires depended on networks as much as on soldiers. Roads, ports, scribes, tax systems, and local alliances were often just as important as battle victories.",
      "Administration was one of the greatest challenges. Conquering a territory might take months, but governing it could take centuries of adaptation. An empire that expanded too quickly without building systems of communication often found that local officials became corrupt, slow, or semi-independent. Messages could take weeks to travel, tax demands could be misunderstood, and military orders could arrive too late to matter. This is why many successful empires invested heavily in roads, relay stations, archives, and bureaucratic training. Their strength lay not only in what they controlled, but in how effectively they connected distant regions.",
      "Trade networks played a similar role. Empires were not merely territorial structures; they were also economic systems. Merchants moved goods, but they also carried information, languages, customs, and technologies. A stable imperial environment could encourage markets by reducing banditry, standardizing weights, and protecting routes. In return, trade generated revenue and tied local elites to the imperial order. When merchants, tax collectors, and administrators all benefited from a functioning network, the empire gained resilience beyond the battlefield.",
      "Local cooperation was equally necessary. No empire ruled every province in exactly the same way. In many cases, imperial authorities relied on local elites to maintain order, collect taxes, and translate central policies into local practice. This arrangement was efficient, but it also created risk. If local leaders no longer trusted the center, rebellion became more likely. Empires therefore had to negotiate constantly: offering privileges, recognizing local traditions, and rewarding loyalty while punishing resistance. Successful rule depended less on uniformity than on flexible integration.",
      "Communication shaped legitimacy as well as control. Rulers used monuments, ceremonies, legal codes, and official languages to present themselves as protectors of order rather than mere conquerors. These messages were not simply propaganda in the modern sense. They helped create a shared political imagination in which imperial rule seemed natural, beneficial, or divinely supported. If subjects believed the empire brought peace, prosperity, or justice, they were more likely to cooperate even when taxation was heavy. Legitimacy, once established, reduced the need for constant force.",
      "Yet networks could also become sources of weakness. The more connected an empire was, the more vulnerable it became to disruptions in those connections. Trade collapse, succession crises, disease, regional rivalry, or fiscal breakdown could spread quickly through the same systems that once produced strength. Roads that carried officials could also carry invaders. Bureaucracies that maintained stability could become expensive and rigid. Dependence on local intermediaries could turn dangerous if loyalty shifted. For this reason, imperial decline often reflected systemic strain rather than a single dramatic defeat.",
      "Looking at empires through the lens of networks changes the way history is understood. It reminds us that durable power is organizational, not merely military. Armies could win territory, but they could not by themselves sustain administration, commerce, or legitimacy across vast distances. The empires that lasted were those that linked people, places, and institutions into workable systems. Their history is therefore not only a story of conquest, but also a story of communication, coordination, and negotiated authority."
    ]
  };

  let base = passages[category];

  if (level === 1) {
    return base;
  }

  if (level === 2) {
    return base.map((p) =>
      p
        .replace(/usually clear/g, "relatively clear")
        .replace(/place pressure on/g, "intensify pressure on")
        .replace(/slowly spread through daily life/g, "gradually filter through everyday life")
        .replace(/carefully balance/g, "delicately balance")
        .replace(/closely connected/g, "deeply intertwined")
        .replace(/public trust/g, "institutional credibility")
        .replace(/looked at/g, "understood")
    );
  }

  return base.map((p) =>
    p
      .replace(/important/g, "consequential")
      .replace(/difficult/g, "contentious")
      .replace(/closely watched/g, "scrutinized")
      .replace(/pressure/g, "downward pressure")
      .replace(/reduce/g, "moderate")
      .replace(/slowdown/g, "deceleration")
      .replace(/connected/g, "interdependent")
      .replace(/used/g, "deployed")
      .replace(/powerful/g, "high-capacity")
      .replace(/survived/g, "endured")
      .replace(/helped/g, "facilitated");
  });
}

function buildQuestions(category) {
  const byCategory = {
    Economy: [
      {
        q: "What is the main reason central banks keep interest rates high?",
        options: [
          "To increase exports immediately",
          "To reduce inflationary pressure",
          "To guarantee wage growth",
          "To lower government debt instantly"
        ],
        answer: 1,
        explanation: "The passage explains that high interest rates are mainly used to slow inflation before it becomes entrenched."
      },
      {
        q: "According to the passage, how do higher rates affect businesses?",
        options: [
          "They always force firms to raise salaries",
          "They make imports cheaper in every case",
          "They can cause firms to delay investment plans",
          "They remove uncertainty from future planning"
        ],
        answer: 2,
        explanation: "The passage states that when borrowing becomes expensive, businesses often postpone expansion or research."
      },
      {
        q: "Why are interest rates not a complete solution to inflation?",
        options: [
          "Because rate changes only affect tourism",
          "Because inflation may also come from supply shocks",
          "Because consumers ignore central bank decisions",
          "Because businesses never respond to borrowing costs"
        ],
        answer: 1,
        explanation: "The passage notes that inflation can come from energy shortages, shipping delays, or conflict, which rate hikes cannot directly fix."
      },
      {
        q: "What does the passage suggest about public expectations?",
        options: [
          "They are less important than official statistics",
          "They matter only during recessions",
          "They can influence inflation itself",
          "They are controlled entirely by employers"
        ],
        answer: 2,
        explanation: "If people expect inflation to remain high, they may behave in ways that make inflation harder to reduce."
      },
      {
        q: "Which statement best summarizes the passage?",
        options: [
          "Interest rates affect only financial markets, not daily life.",
          "Rate policy involves balancing inflation control with economic risks.",
          "Inflation is caused entirely by consumer overspending.",
          "Central banks prefer unemployment to price stability."
        ],
        answer: 1,
        explanation: "The passage repeatedly emphasizes the trade-off between controlling inflation and avoiding excessive economic slowdown."
      }
    ],
    World: [
      {
        q: "What is the main idea of the passage?",
        options: [
          "Regional conflicts usually remain local in their effects",
          "Military reporting is more important than economic reporting",
          "Regional conflicts can spread economic effects globally",
          "Governments can easily prevent all conflict-related disruptions"
        ],
        answer: 2,
        explanation: "The passage argues that local conflicts often produce global consequences through energy, shipping, and finance."
      },
      {
        q: "Why can energy prices rise even before an actual shortage appears?",
        options: [
          "Because factories immediately stop operating",
          "Because markets react to the fear of disruption",
          "Because households begin storing fuel illegally",
          "Because governments refuse to monitor prices"
        ],
        answer: 1,
        explanation: "The passage says the fear of future disruption can push prices up before supply is physically reduced."
      },
      {
        q: "How does shipping instability affect unrelated companies?",
        options: [
          "It often lowers insurance costs",
          "It makes global logistics more efficient",
          "It can raise costs across supply chains",
          "It eliminates delays at ports"
        ],
        answer: 2,
        explanation: "Longer routes, higher insurance, and delays can affect firms even if they have no direct link to the conflict."
      },
      {
        q: "What role do financial markets play during conflict?",
        options: [
          "They remain unaffected unless trade stops completely",
          "They can spread uncertainty through investment behavior",
          "They always stabilize national budgets",
          "They reduce demand for safer assets"
        ],
        answer: 1,
        explanation: "The passage explains that investors may move toward safer assets, affecting borrowing conditions and business decisions."
      },
      {
        q: "What is one long-term effect mentioned in the passage?",
        options: [
          "Countries may diversify suppliers and routes",
          "Conflicts usually reduce diplomatic planning",
          "Manufacturers stop caring about resilience",
          "Energy security becomes less important"
        ],
        answer: 0,
        explanation: "The passage states that prolonged conflict may push countries to diversify supply chains and strengthen energy security."
      }
    ],
    AI: [
      {
        q: "Why has AI become a political issue as well as a technical one?",
        options: [
          "Because AI has become less useful over time",
          "Because its social and economic effects are widening",
          "Because governments now write most AI software",
          "Because AI is used only in education"
        ],
        answer: 1,
        explanation: "The passage emphasizes that AI now affects politics, labor, trust, and institutions, not just engineering."
      },
      {
        q: "What is one major argument made by supporters of regulation?",
        options: [
          "AI should replace human review in all fields",
          "Private firms always regulate themselves effectively",
          "Rules are needed for safe and responsible adoption",
          "Innovation becomes impossible without strict bans"
        ],
        answer: 2,
        explanation: "The passage notes that supporters see regulation as necessary to ensure safety, fairness, and public trust."
      },
      {
        q: "Why do some critics oppose overly strict regulation?",
        options: [
          "They believe AI creates no risks at all",
          "They fear it may harm innovation and competition",
          "They want only large firms to survive",
          "They think transparency is unnecessary"
        ],
        answer: 1,
        explanation: "The passage says poorly designed regulation could burden smaller firms and slow experimentation."
      },
      {
        q: "Why is AI difficult to regulate with one broad rule?",
        options: [
          "Because all AI systems have identical risks",
          "Because lawmakers do not know AI exists",
          "Because AI applications differ greatly by context",
          "Because regulation only applies to robots"
        ],
        answer: 2,
        explanation: "The passage explains that chatbots, medical tools, and autonomous systems create different kinds of risk."
      },
      {
        q: "Which statement best reflects the author's view?",
        options: [
          "AI policy requires balancing innovation and responsibility",
          "The best policy is to stop AI development entirely",
          "Market competition alone will solve every AI problem",
          "Labor concerns are unrelated to AI regulation"
        ],
        answer: 0,
        explanation: "The author presents AI regulation as a negotiation over speed, safety, legitimacy, and competition."
      }
    ],
    History: [
      {
        q: "What is the central claim of the passage?",
        options: [
          "Empires depended mainly on military force",
          "Trade mattered less than conquest in imperial history",
          "Durable empires relied on networks as well as armies",
          "Local elites had no role in imperial stability"
        ],
        answer: 2,
        explanation: "The passage argues that roads, administration, trade, and legitimacy were as important as military power."
      },
      {
        q: "Why were communication systems so important to empires?",
        options: [
          "They made conquest unnecessary",
          "They helped govern distant territories effectively",
          "They replaced tax collection entirely",
          "They prevented all corruption"
        ],
        answer: 1,
        explanation: "The passage explains that messages, orders, and tax systems required strong communication networks."
      },
      {
        q: "How did trade strengthen empires?",
        options: [
          "It discouraged revenue collection",
          "It isolated local elites from imperial rule",
          "It connected markets and supported resilience",
          "It removed the need for administration"
        ],
        answer: 2,
        explanation: "Trade routes generated revenue and linked merchants, officials, and elites to the imperial system."
      },
      {
        q: "What was one risk of depending on local elites?",
        options: [
          "They could become disloyal to the center",
          "They always refused imperial privileges",
          "They made communication faster",
          "They eliminated the need for negotiation"
        ],
        answer: 0,
        explanation: "The passage notes that rebellion became more likely if local leaders no longer trusted the center."
      },
      {
        q: "What does the passage say about imperial decline?",
        options: [
          "It usually came from one battle alone",
          "It often reflected strain across connected systems",
          "It was unrelated to trade or administration",
          "It occurred only when roads disappeared"
        ],
        answer: 1,
        explanation: "The author argues that decline often resulted from systemic disruption rather than a single event."
      }
    ]
  };

  return byCategory[category];
}

function buildSummary(category) {
  const summaries = {
    Economy: {
      text: "High interest rates are used to (control) inflation, but they can also slow spending, delay (investment), and create difficult policy trade-offs.",
      answers: ["control", "investment"]
    },
    World: {
      text: "Regional conflicts can affect global markets through higher (energy) prices, shipping disruption, and broader economic (uncertainty).",
      answers: ["energy", "uncertainty"]
    },
    AI: {
      text: "Governments are debating AI rules because they must balance (innovation) with safety, fairness, and public (trust).",
      answers: ["innovation", "trust"]
    },
    History: {
      text: "Empires endured not only through armies but through networks of (communication), trade, and political (legitimacy).",
      answers: ["communication", "legitimacy"]
    }
  };

  return summaries[category];
}

function buildLiteralSentences(category) {
  const byCategory = {
    Economy: [
      "Higher rates may reduce excessive spending, but they can also place pressure on families, small businesses, and governments that are already dealing with weak growth.",
      "When borrowing becomes expensive, managers tend to delay projects unless the expected return is unusually strong.",
      "Their statements, forecasts, and tone can affect financial markets long before any official rate change occurs."
    ],
    World: [
      "The fear of future disruption can push prices upward even before a physical shortage appears.",
      "Even companies with no direct connection to the conflict may find their costs rising because global logistics have become less efficient.",
      "Regional violence becomes global in its consequences because modern systems are tightly linked."
    ],
    AI: [
      "The more useful these systems appear, the more urgent the demand for clear rules becomes.",
      "For them, regulation is not an obstacle to progress but a condition for responsible adoption.",
      "Governments are trying to avoid two opposite mistakes: moving so slowly that harm spreads before standards exist, or moving so rigidly that progress is frozen."
    ],
    History: [
      "Large empires survived only when they could move information, collect resources, and persuade distant populations that imperial rule had some form of legitimacy.",
      "An empire that expanded too quickly without building systems of communication often found that local officials became corrupt, slow, or semi-independent.",
      "Armies could win territory, but they could not by themselves sustain administration, commerce, or legitimacy across vast distances."
    ]
  };

  return byCategory[category];
}

function buildVocabularyHints(level) {
  if (level === 1) {
    return [
      { word: "inflation", meaning: "a rise in prices" },
      { word: "investment", meaning: "putting money into future growth" },
      { word: "regulation", meaning: "official rules or control" },
      { word: "legitimacy", meaning: "accepted right to rule" }
    ];
  }

  if (level === 2) {
    return [
      { word: "persistent", meaning: "continuing for a long time" },
      { word: "intertwined", meaning: "closely connected" },
      { word: "transparent", meaning: "open and clear" },
      { word: "resilience", meaning: "the ability to recover" }
    ];
  }

  return [
    { word: "entrenched", meaning: "firmly established" },
    { word: "interdependent", meaning: "mutually dependent" },
    { word: "legitimacy", meaning: "recognized rightfulness" },
    { word: "deceleration", meaning: "a slowing down" }
  ];
}

function generateReading() {
  const topic = getTopicByCategory(category);
  const passage = buildPassage(category, level);
  const questions = buildQuestions(category);
  const summary = buildSummary(category);
  const literalSentences = buildLiteralSentences(category);
  const vocabHints = buildVocabularyHints(level);

  const totalWords = passage.join(" ").split(/\s+/).length;

  const data = {
    date: dateString,
    level,
    levelLabel: getLevelLabel(level),
    category,
    title: topic.title,
    sourceTopic: topic.sourceTopic,
    estimatedWordCount: totalWords,
    passage,
    questions,
    summary,
    literalSentences,
    vocabHints,
    tts: {
      defaultRate: 0.8,
      minRate: 0.8,
      maxRate: 1.3,
      step: 0.1
    }
  };

  fs.writeFileSync("public/todayReading.json", JSON.stringify(data, null, 2), "utf8");
  console.log(`Generated ${category} reading (${totalWords} words) for ${dateString}`);
}

generateReading();
