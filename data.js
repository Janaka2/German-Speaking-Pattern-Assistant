// All German content lives here so you can edit phrases without touching logic.
// Each phrase: { de, en, say } -> German text, English meaning, easy say-it hint.
window.GSPA_DATA = {
  // ---------------------------------------------------------------------------
  // LIVE MODE: emergency phrases you can click and say out loud in seconds.
  // ---------------------------------------------------------------------------
  speakNow: [
    {
      group: "I don't understand",
      icon: "❓",
      phrases: [
        { de: "Entschuldigung, ich habe das nicht verstanden.", en: "Sorry, I didn't understand that.", say: "ent-SHOOL-di-gung, ikh HAA-be das nikht fer-SHTAN-den" },
        { de: "Können Sie das bitte wiederholen?", en: "Can you please repeat that?", say: "KÖN-nen zee das BIT-te vee-der-HOH-len" },
        { de: "Können Sie bitte langsamer sprechen?", en: "Can you please speak slower?", say: "KÖN-nen zee BIT-te LANG-zaa-mer SHPREH-khen" },
        { de: "Wie bitte?", en: "Pardon? / Sorry?", say: "vee BIT-te" }
      ]
    },
    {
      group: "Ask the teacher",
      icon: "🙋",
      phrases: [
        { de: "Ich habe eine Frage.", en: "I have a question.", say: "ikh HAA-be AI-ne FRAA-ge" },
        { de: "Können Sie mir bitte helfen?", en: "Can you please help me?", say: "KÖN-nen zee meer BIT-te HEL-fen" },
        { de: "Können Sie bitte ein Beispiel geben?", en: "Can you please give an example?", say: "KÖN-nen zee BIT-te ain BAI-shpeel GAY-ben" },
        { de: "Wie sagt man das auf Deutsch?", en: "How do you say that in German?", say: "vee zaagt man das auf DOYTCH" },
        { de: "Was bedeutet das?", en: "What does that mean?", say: "vas be-DOY-tet das" }
      ]
    },
    {
      group: "Answer in class",
      icon: "💬",
      phrases: [
        { de: "Ich denke, dass ...", en: "I think that ...", say: "ikh DENG-ke, das" },
        { de: "Ich glaube, dass ...", en: "I believe that ...", say: "ikh GLAU-be, das" },
        { de: "Meiner Meinung nach ...", en: "In my opinion ...", say: "MAI-ner MAI-nung naakh" },
        { de: "Ich bin nicht sicher, aber ich denke ...", en: "I'm not sure, but I think ...", say: "ikh bin nikht ZIKH-er, AA-ber ikh DENG-ke" }
      ]
    },
    {
      group: "Pair / group work",
      icon: "👥",
      phrases: [
        { de: "Möchtest du anfangen?", en: "Do you want to start?", say: "MÖKH-test doo AN-fang-en" },
        { de: "Ich kann anfangen.", en: "I can start.", say: "ikh kan AN-fang-en" },
        { de: "Was denkst du?", en: "What do you think?", say: "vas DENGKST doo" },
        { de: "Kannst du das bitte wiederholen?", en: "Can you please repeat that?", say: "kanst doo das BIT-te vee-der-HOH-len" }
      ]
    },
    {
      group: "Technical problem",
      icon: "🔌",
      phrases: [
        { de: "Entschuldigung, mein Mikrofon war aus.", en: "Sorry, my microphone was off.", say: "ent-SHOOL-di-gung, main MIK-ro-fon var aus" },
        { de: "Meine Verbindung ist nicht stabil.", en: "My connection is not stable.", say: "MAI-ne fer-BIN-dung ist nikht shta-BEEL" },
        { de: "Ich kann Sie nicht gut hören.", en: "I can't hear you well.", say: "ikh kan zee nikht goot HÖ-ren" }
      ]
    }
  ],

  // Always visible, the 10 rules that fix most mistakes.
  alwaysRemember: [
    "Verb is in position 2.",
    "Modal verb → main verb goes to the END.",
    "weil / dass → verb goes to the end.",
    "mit · bei · nach · seit · von · zu · aus → Dativ.",
    "Wo? (location, no movement) → Dativ.",
    "Wohin? (movement) → Akkusativ.",
    "der → dem (Dativ).",
    "die → der (Dativ).",
    "das → dem (Dativ).",
    "plural Dativ → den + noun usually gets -n."
  ],

  // ---------------------------------------------------------------------------
  // LEARN MODE
  // ---------------------------------------------------------------------------
  dativ: {
    definite: [
      { from: "der", to: "dem", ex: "Ich spreche mit dem Lehrer." },
      { from: "die", to: "der", ex: "Ich helfe der Frau." },
      { from: "das", to: "dem", ex: "Ich spiele mit dem Kind." },
      { from: "die (plural)", to: "den + …n", ex: "Ich spreche mit den Kindern." }
    ],
    indefinite: [
      { from: "ein", to: "einem", ex: "Ich wohne in einem Haus." },
      { from: "eine", to: "einer", ex: "Ich spreche mit einer Freundin." },
      { from: "ein", to: "einem", ex: "Ich spiele mit einem Kind." },
      { from: "keine (plural)", to: "keinen + …n", ex: "Ich gehe mit keinen Kindern." }
    ],
    triggers: [
      { de: "mit", en: "with", ex: "Ich fahre mit dem Bus." },
      { de: "bei", en: "at / near / with", ex: "Ich bin bei meiner Freundin." },
      { de: "nach", en: "after / to", ex: "Nach der Schule gehe ich nach Hause." },
      { de: "seit", en: "since / for", ex: "Ich lerne seit einem Jahr Deutsch." },
      { de: "von", en: "from / of", ex: "Das ist ein Geschenk von meinem Vater." },
      { de: "zu", en: "to", ex: "Ich gehe zu meinem Arzt." },
      { de: "aus", en: "from / out of", ex: "Ich komme aus der Schweiz." },
      { de: "gegenüber", en: "opposite", ex: "Die Bank ist gegenüber dem Park." }
    ]
  },

  // Possessive in the Dativ. Order of forms: masc / fem / neut / plural.
  possessive: [
    { word: "mein", en: "my", forms: ["meinem", "meiner", "meinem", "meinen"] },
    { word: "dein", en: "your (informal)", forms: ["deinem", "deiner", "deinem", "deinen"] },
    { word: "sein", en: "his / its", forms: ["seinem", "seiner", "seinem", "seinen"] },
    { word: "ihr", en: "her / their", forms: ["ihrem", "ihrer", "ihrem", "ihren"] },
    { word: "unser", en: "our", forms: ["unserem", "unserer", "unserem", "unseren"] },
    { word: "euer", en: "your (plural)", forms: ["eurem", "eurer", "eurem", "euren"] },
    { word: "Ihr", en: "your (formal)", forms: ["Ihrem", "Ihrer", "Ihrem", "Ihren"] }
  ],
  possessiveExamples: [
    "mein Vater → mit meinem Vater",
    "meine Mutter → mit meiner Mutter",
    "mein Kind → mit meinem Kind",
    "meine Kinder → mit meinen Kindern"
  ],

  woWohin: {
    rule: [
      { q: "Wo?", meaning: "location (no movement)", case: "Dativ" },
      { q: "Wohin?", meaning: "movement (going somewhere)", case: "Akkusativ" }
    ],
    examples: {
      location: [
        "Ich bin in der Schule.",
        "Das Buch liegt auf dem Tisch."
      ],
      movement: [
        "Ich gehe in die Schule.",
        "Ich lege das Buch auf den Tisch."
      ]
    },
    // Mini trainer questions.
    trainer: [
      { sentence: "Ich gehe ___ Schule.", answer: "movement", correct: "in die Schule", why: "Movement → Akkusativ → die." },
      { sentence: "Ich bin ___ Schule.", answer: "location", correct: "in der Schule", why: "Location → Dativ → der." },
      { sentence: "Ich lege das Buch ___ Tisch.", answer: "movement", correct: "auf den Tisch", why: "Movement → Akkusativ → den." },
      { sentence: "Das Buch liegt ___ Tisch.", answer: "location", correct: "auf dem Tisch", why: "Location → Dativ → dem." }
    ]
  },

  patterns: [
    { title: "Normal sentence", rule: "Subject + Verb(2) + Time + Place", ex: "Ich lerne heute zu Hause Deutsch." },
    { title: "W-question", rule: "Question word + Verb + Subject + Rest", ex: "Wann lernst du Deutsch?" },
    { title: "Yes/No question", rule: "Verb + Subject + Rest?", ex: "Lernst du Deutsch?" },
    { title: "Modal verb", rule: "Subject + Modal(2) + Rest + Infinitive(END)", ex: "Ich möchte Deutsch sprechen." }
  ],

  modals: [
    { de: "können", en: "can / be able to" },
    { de: "müssen", en: "must / have to" },
    { de: "wollen", en: "want to" },
    { de: "möchten", en: "would like to" },
    { de: "dürfen", en: "may / be allowed to" },
    { de: "sollen", en: "should / supposed to" }
  ],
  modalSentences: [
    { de: "Ich möchte eine Frage stellen.", en: "I would like to ask a question." },
    { de: "Ich kann das nicht verstehen.", en: "I can't understand that." },
    { de: "Können Sie das bitte wiederholen?", en: "Can you please repeat that?" },
    { de: "Darf ich es versuchen?", en: "May I try it?" },
    { de: "Was soll ich machen?", en: "What should I do?" },
    { de: "Ich muss mehr üben.", en: "I must practise more." }
  ],

  // ---------------------------------------------------------------------------
  // GRAMMAR ENGINE — powers the Build, Decline and Quiz trainers.
  // Gender index everywhere: 0 = masculine, 1 = feminine, 2 = neuter, 3 = plural.
  // ---------------------------------------------------------------------------
  grammar: {
    genders: [
      { idx: 0, label: "der · masculine", short: "der" },
      { idx: 1, label: "die · feminine", short: "die" },
      { idx: 2, label: "das · neuter", short: "das" },
      { idx: 3, label: "die · plural", short: "plural" }
    ],

    // Definite article by case + gender index.
    defArticle: {
      nom: ["der", "die", "das", "die"],
      akk: ["den", "die", "das", "die"],
      dat: ["dem", "der", "dem", "den"]
    },

    // Possessive ("ein-word") endings added to the stem, by case + gender index.
    possEndings: {
      nom: ["", "e", "", "e"],
      akk: ["en", "e", "", "e"],
      dat: ["em", "er", "em", "en"]
    },

    possBases: [
      { w: "mein", en: "my" },
      { w: "dein", en: "your (informal)" },
      { w: "sein", en: "his / its" },
      { w: "ihr", en: "her / their" },
      { w: "unser", en: "our" },
      { w: "euer", en: "your (plural)" },
      { w: "Ihr", en: "your (formal)" }
    ],

    // Dativ prepositions for the sentence builder.
    // verb = subject + verb WITHOUT the preposition (added later).
    // contr = definite-article contractions (only with der/die/das, never possessives).
    prepositions: [
      { p: "mit", verb: "Ich spreche", en: "I speak with", contr: {} },
      { p: "bei", verb: "Ich bin", en: "I am at", contr: { dem: "beim" } },
      { p: "zu", verb: "Ich gehe", en: "I go to", contr: { dem: "zum", der: "zur" } },
      { p: "von", verb: "Das ist", en: "That is from", contr: { dem: "vom" } },
      { p: "aus", verb: "Ich komme", en: "I come from", contr: {} }
    ],

    // Verified nouns (genders from Collins German 3000). No weak masculines,
    // so singular Dativ = base form. g = gender index; dat used only for plurals.
    builderNouns: [
      { noun: "Lehrer", g: 0, en: "teacher" },
      { noun: "Arzt", g: 0, en: "doctor" },
      { noun: "Zahnarzt", g: 0, en: "dentist" },
      { noun: "Vater", g: 0, en: "father" },
      { noun: "Bruder", g: 0, en: "brother" },
      { noun: "Sohn", g: 0, en: "son" },
      { noun: "Freund", g: 0, en: "(male) friend" },
      { noun: "Bus", g: 0, en: "bus" },
      { noun: "Laden", g: 0, en: "shop" },
      { noun: "Frau", g: 1, en: "woman" },
      { noun: "Mutter", g: 1, en: "mother" },
      { noun: "Schwester", g: 1, en: "sister" },
      { noun: "Tochter", g: 1, en: "daughter" },
      { noun: "Freundin", g: 1, en: "(female) friend" },
      { noun: "Lehrerin", g: 1, en: "(female) teacher" },
      { noun: "Schule", g: 1, en: "school" },
      { noun: "Firma", g: 1, en: "company" },
      { noun: "Kind", g: 2, en: "child" },
      { noun: "Auto", g: 2, en: "car" },
      { noun: "Büro", g: 2, en: "office" },
      { noun: "Hotel", g: 2, en: "hotel" },
      { noun: "Restaurant", g: 2, en: "restaurant" },
      { noun: "Krankenhaus", g: 2, en: "hospital" },
      { noun: "Kinder", g: 3, en: "children", dat: "Kindern" },
      { noun: "Eltern", g: 3, en: "parents", dat: "Eltern" },
      { noun: "Freunde", g: 3, en: "friends", dat: "Freunden" },
      { noun: "Geschwister", g: 3, en: "siblings", dat: "Geschwistern" }
    ]
  },

  // ---------------------------------------------------------------------------
  // ESSENTIALS PHRASEBOOK — high-value spoken phrases & vocab, themed.
  // Source: Collins German 3000 Words & Phrases (essentials section).
  // Each item is [German, English]; tap a line to hear it.
  // ---------------------------------------------------------------------------
  essentials: [
    {
      theme: "Greetings & basics",
      icon: "👋",
      items: [
        ["Hallo.", "Hello."],
        ["Guten Morgen.", "Good morning."],
        ["Guten Tag.", "Good afternoon / hello."],
        ["Guten Abend.", "Good evening."],
        ["Tschüss!", "Bye!"],
        ["Bis bald.", "See you soon."],
        ["Bis morgen.", "See you tomorrow."],
        ["Ja. / Nein.", "Yes. / No."],
        ["Bitte.", "Please. / You're welcome."],
        ["Vielen Dank.", "Thank you very much."],
        ["Entschuldigung.", "Excuse me. / Sorry."],
        ["Es tut mir leid.", "I'm sorry."],
        ["Einverstanden!", "OK! / Agreed!"],
        ["Ich verstehe nicht.", "I don't understand."]
      ]
    },
    {
      theme: "About you",
      icon: "🧑",
      items: [
        ["Wie heißen Sie?", "What's your name?"],
        ["Ich heiße ...", "My name is ..."],
        ["Wo kommen Sie her?", "Where are you from?"],
        ["Ich komme aus ...", "I'm from ..."],
        ["Wo wohnen Sie?", "Where do you live?"],
        ["Ich wohne in ...", "I live in ..."],
        ["Wie alt sind Sie?", "How old are you?"],
        ["Ich bin ... Jahre alt.", "I'm ... years old."],
        ["Haben Sie Kinder?", "Do you have children?"],
        ["Ich habe ... Kinder.", "I have ... children."],
        ["Was machen Sie beruflich?", "What do you do (job)?"],
        ["Ich arbeite als ...", "I work as a ..."]
      ]
    },
    {
      theme: "How are you & feelings",
      icon: "😊",
      items: [
        ["Wie geht es Ihnen?", "How are you? (formal)"],
        ["Wie geht's?", "How's it going?"],
        ["Sehr gut, danke, und Ihnen?", "Very well, thanks, and you?"],
        ["Danke, gut.", "Fine, thanks."],
        ["Nicht schlecht, danke.", "Not bad, thanks."],
        ["Es geht so.", "Could be worse / so-so."],
        ["Ich bin müde.", "I'm tired."],
        ["Ich habe Hunger.", "I'm hungry."],
        ["Ich habe Durst.", "I'm thirsty."],
        ["Ich bin glücklich.", "I'm happy."],
        ["Ich bin traurig.", "I'm sad."],
        ["Ich bin nervös.", "I'm nervous."]
      ]
    },
    {
      theme: "Time & when",
      icon: "🕐",
      items: [
        ["Wie spät ist es?", "What time is it?"],
        ["Es ist neun Uhr.", "It's nine o'clock."],
        ["Es ist halb zehn.", "It's half past nine."],
        ["heute", "today"],
        ["morgen", "tomorrow"],
        ["gestern", "yesterday"],
        ["heute Abend", "tonight"],
        ["jetzt", "now"],
        ["später", "later"],
        ["bald", "soon"],
        ["früh", "early"],
        ["verspätet", "late"]
      ]
    },
    {
      theme: "Numbers",
      icon: "🔢",
      items: [
        ["null", "0"], ["eins", "1"], ["zwei", "2"], ["drei", "3"], ["vier", "4"],
        ["fünf", "5"], ["sechs", "6"], ["sieben", "7"], ["acht", "8"], ["neun", "9"],
        ["zehn", "10"], ["elf", "11"], ["zwölf", "12"], ["dreizehn", "13"],
        ["zwanzig", "20"], ["dreißig", "30"], ["vierzig", "40"], ["fünfzig", "50"],
        ["hundert", "100"], ["tausend", "1000"]
      ]
    },
    {
      theme: "Days & months",
      icon: "📅",
      items: [
        ["Montag", "Monday"], ["Dienstag", "Tuesday"], ["Mittwoch", "Wednesday"],
        ["Donnerstag", "Thursday"], ["Freitag", "Friday"], ["Samstag", "Saturday"],
        ["Sonntag", "Sunday"], ["die Woche", "week"], ["das Wochenende", "weekend"],
        ["der Monat", "month"], ["Januar", "January"], ["Februar", "February"],
        ["März", "March"], ["April", "April"], ["Mai", "May"], ["Juni", "June"],
        ["Juli", "July"], ["August", "August"], ["der Frühling", "spring"],
        ["der Sommer", "summer"], ["der Herbst", "autumn"], ["der Winter", "winter"]
      ]
    },
    {
      theme: "Weather",
      icon: "🌤",
      items: [
        ["Wie ist das Wetter?", "How's the weather?"],
        ["Es ist sonnig.", "It's sunny."],
        ["Es regnet.", "It's raining."],
        ["Es schneit.", "It's snowing."],
        ["Es ist bewölkt.", "It's cloudy."],
        ["Es ist windig.", "It's windy."],
        ["Es ist kalt.", "It's cold."],
        ["Es ist warm.", "It's warm."],
        ["Es ist heiß.", "It's hot."]
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // MY DAY — answer "Was hast du gestern gemacht?" in the Perfekt (past tense).
  // Each activity: aux = haben/sein, rest = everything after the conjugated aux
  // (object + past participle), so word order is always correct.
  //   "Ich" front:  Ich {habe|bin} {rest}.
  //   Time front:   {Time} {habe|bin} ich {rest}.   (verb stays in position 2)
  // ---------------------------------------------------------------------------
  pastDay: {
    question: ["Was hast du gestern gemacht?", "What did you do yesterday? (informal)"],
    questionFormal: ["Was haben Sie gestern gemacht?", "What did you do yesterday? (formal)"],
    rule: [
      "Speaking about the past = Perfekt:  haben / sein + participle.",
      "Most verbs → haben:  Ich habe Deutsch gelernt.",
      "Movement / change of state → sein:  Ich bin nach Hause gegangen.",
      "Participle is usually  ge…t  (machen → gemacht)  or  ge…en  (essen → gegessen).",
      "Start with a time word? The verb stays in position 2:  Gestern habe ich …"
    ],
    // Connectors / time markers to begin a sentence (already capitalised).
    timeWords: [
      ["", "(no time word) — Ich …"],
      ["Gestern", "Yesterday"],
      ["Gestern Abend", "Yesterday evening"],
      ["Zuerst", "First"],
      ["Dann", "Then"],
      ["Danach", "After that"],
      ["Später", "Later"],
      ["Am Morgen", "In the morning"],
      ["Nach dem Unterricht", "After the class"],
      ["Am Ende", "In the end"]
    ],
    activities: [
      { en: "I got up early", aux: "sein", rest: "früh aufgestanden" },
      { en: "I got up at half past five", aux: "sein", rest: "um halb sechs aufgestanden" },
      { en: "I had breakfast", aux: "haben", rest: "gefrühstückt" },
      { en: "I went to German class", aux: "sein", rest: "zum Deutschkurs gegangen" },
      { en: "I studied German", aux: "haben", rest: "Deutsch gelernt" },
      { en: "I spoke German in class", aux: "haben", rest: "im Unterricht Deutsch gesprochen" },
      { en: "I learned new words", aux: "haben", rest: "neue Wörter gelernt" },
      { en: "I practised grammar", aux: "haben", rest: "Grammatik geübt" },
      { en: "I did my homework", aux: "haben", rest: "meine Hausaufgaben gemacht" },
      { en: "I took a break", aux: "haben", rest: "eine Pause gemacht" },
      { en: "I had lunch", aux: "haben", rest: "zu Mittag gegessen" },
      { en: "I worked", aux: "haben", rest: "gearbeitet" },
      { en: "I went home", aux: "sein", rest: "nach Hause gegangen" },
      { en: "I rested", aux: "haben", rest: "mich ausgeruht" },
      { en: "I went shopping", aux: "sein", rest: "einkaufen gegangen" },
      { en: "I cooked dinner", aux: "haben", rest: "das Abendessen gekocht" },
      { en: "I had dinner", aux: "haben", rest: "zu Abend gegessen" },
      { en: "I watched TV", aux: "haben", rest: "ferngesehen" },
      { en: "I listened to music", aux: "haben", rest: "Musik gehört" },
      { en: "I read a book", aux: "haben", rest: "ein Buch gelesen" },
      { en: "I talked with my family", aux: "haben", rest: "mit meiner Familie gesprochen" },
      { en: "I made a phone call", aux: "haben", rest: "telefoniert" },
      { en: "I went for a walk", aux: "sein", rest: "spazieren gegangen" },
      { en: "I went to bed", aux: "sein", rest: "ins Bett gegangen" },
      { en: "I slept well", aux: "haben", rest: "gut geschlafen" }
    ]
  },

  // ---------------------------------------------------------------------------
  // MY PLANS (future) — answer "Was machst du morgen?" the SIMPLE way:
  // present tense + a time word.  "Morgen gehe ich zum Deutschkurs."
  // Each activity: verb = conjugated "ich" form, rest = the rest of the clause
  // (separable prefixes go at the END, so word order is always correct).
  //   "Ich" front:  Ich {verb} {rest}.
  //   Time front:   {Time} {verb} ich {rest}.   (verb stays in position 2)
  // ---------------------------------------------------------------------------
  future: {
    question: ["Was machst du morgen?", "What are you doing tomorrow? (informal)"],
    questionFormal: ["Was machen Sie am Wochenende?", "What are you doing at the weekend? (formal)"],
    rule: [
      "Easiest future = present tense + a time word.",
      "Morgen gehe ich zum Deutschkurs.  (Tomorrow I'm going to German class.)",
      "Time word at the front? The verb stays in position 2:  Morgen lerne ich Deutsch.",
      "You can also use  werden + verb:  Ich werde Deutsch lernen.  (I will study German.)"
    ],
    timeWords: [
      ["Morgen", "Tomorrow"],
      ["Heute Abend", "This evening"],
      ["Am Wochenende", "At the weekend"],
      ["Nächste Woche", "Next week"],
      ["Später", "Later"],
      ["Gleich", "In a moment"],
      ["Am Montag", "On Monday"],
      ["Nach dem Unterricht", "After the class"],
      ["", "(no time word) — Ich …"]
    ],
    activities: [
      { en: "I will get up early", verb: "stehe", rest: "früh auf" },
      { en: "I will get up at half past five", verb: "stehe", rest: "um halb sechs auf" },
      { en: "I will have breakfast", verb: "frühstücke", rest: "" },
      { en: "I will go to German class", verb: "gehe", rest: "zum Deutschkurs" },
      { en: "I will study German", verb: "lerne", rest: "Deutsch" },
      { en: "I will speak German in class", verb: "spreche", rest: "im Unterricht Deutsch" },
      { en: "I will learn new words", verb: "lerne", rest: "neue Wörter" },
      { en: "I will practise grammar", verb: "übe", rest: "Grammatik" },
      { en: "I will do my homework", verb: "mache", rest: "meine Hausaufgaben" },
      { en: "I will take a break", verb: "mache", rest: "eine Pause" },
      { en: "I will have lunch", verb: "esse", rest: "zu Mittag" },
      { en: "I will work", verb: "arbeite", rest: "" },
      { en: "I will go home", verb: "gehe", rest: "nach Hause" },
      { en: "I will rest", verb: "ruhe", rest: "mich aus" },
      { en: "I will go shopping", verb: "gehe", rest: "einkaufen" },
      { en: "I will cook dinner", verb: "koche", rest: "das Abendessen" },
      { en: "I will have dinner", verb: "esse", rest: "zu Abend" },
      { en: "I will watch TV", verb: "sehe", rest: "fern" },
      { en: "I will listen to music", verb: "höre", rest: "Musik" },
      { en: "I will read a book", verb: "lese", rest: "ein Buch" },
      { en: "I will call my family", verb: "rufe", rest: "meine Familie an" },
      { en: "I will visit a friend", verb: "besuche", rest: "einen Freund" },
      { en: "I will go for a walk", verb: "gehe", rest: "spazieren" },
      { en: "I will go to bed", verb: "gehe", rest: "ins Bett" },
      { en: "I will sleep well", verb: "schlafe", rest: "gut" }
    ]
  }
};
