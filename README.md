# German Speaking Pattern Assistant

A calm, one-click **speaking helper** for A2/B1 German learners during live online
classes (Zoom Web, Google Meet, Microsoft Teams Web, Goethe online, etc.).

When your brain freezes in class, you tap one button and **hear** the sentence you
need — so you can speak without pressure.

It runs in a **side panel** (not a popup), so it stays open beside your video call
instead of closing when you click back into the meeting.

---

## Two modes

### ⚡ Live (use during class)
- **Speak Now** — instant survival phrases grouped by situation:
  *I don't understand · Ask the teacher · Answer in class · Pair work · Technical problem.*
  Each card has **🔊 Say it** (hear it) and **Copy**.
- **Always Remember** — the 10 rules that fix most mistakes, always on screen.

### 📚 Learn (before / after class)
Active practice, not just tables to read:
- **🛠 Build** — pick a preposition + article/possessive + noun and the extension
  assembles a **correct German sentence** you can say out loud (handles contractions
  like *zu + dem → zum*, *bei + dem → beim*).
- **🗓 My Day** — answer the teacher's daily *“Was hast du gestern gemacht?”* in the
  **Perfekt** (past tense). Pick a time word + activity → a correct sentence
  (*Gestern bin ich zum Deutschkurs gegangen.*). Tap **➕ Add to story** to build a
  full answer, which is **saved** (in `chrome.storage`) so you can prepare it the
  night before and have it ready at 5:30 am. **▶️ Play all** reads the whole story.
- **🔮 My Plans** — answer *“Was machst du morgen?”* using the simplest future:
  **present tense + a time word** (*Morgen gehe ich zum Deutschkurs.*). Same builder
  and saved-story as My Day, kept separately, so you can plan tomorrow or the weekend.
- **🔤 Decline** — type **any** noun, choose its gender, and see the full
  Nominativ / Akkusativ / Dativ table with both the article and a possessive.
- **🎯 Quiz** — fast active-recall drill on Dativ article changes and possessive
  forms, with a session score and tap-to-hear answers.
- **📖 Essentials** — a searchable, tap-to-hear phrasebook (greetings, about you,
  feelings, time, numbers, days & months, weather). Type in English or German to
  filter. Phrases sourced from *Collins German 3000 Words & Phrases*.
- **Dativ** — definite + indefinite article changes and trigger words (mit, bei, …).
- **Possessive** — full Dativ table (mein → meinem / meiner / meinem / meinen, …).
- **Wo / Wohin** — location vs movement, plus a quick tap-to-answer trainer.
- **Patterns** — word order for normal, question, and modal-verb sentences.
- **Modals** — the 6 modal verbs + ready-to-say class sentences.
- **My Mistakes** — save the sentences your teacher corrects, with the *why*, and
  practise them later. Stored only on your computer.

---

## Install locally in Chrome (2 minutes)

1. Open **`chrome://extensions`** in Chrome (or Edge).
2. Turn on **Developer mode** (top-right toggle).
3. Click **Load unpacked**.
4. Select the **`german-speaking-pattern-assistant`** folder.
5. Click the puzzle-piece icon in the toolbar and **pin** “German Speaking Pattern Assistant”.
6. Click the icon → the **side panel** opens on the right.

> Tip: open it *before* class starts and leave it open the whole lesson.

---

## How to use during a German class

1. Keep it on the **⚡ Live** tab.
2. The teacher asks something and your mind goes blank → tap a phrase → press **🔊 Say it**.
3. Repeat it out loud. Done — you spoke.
4. After class, switch to **My Mistakes**, add what you got wrong, and practise.

**Voice speed** (bottom of the panel): switch between **Slow** (0.65×) and **Normal** for
pronunciation practice.

---

## Pronunciation voice

The extension uses your browser's built-in **Web Speech API** with a German (`de-DE`)
voice. Most systems already have one. If the footer shows
**“⚠ No German voice”**, install a German voice:

- **macOS:** System Settings → Accessibility → Spoken Content → System Voice →
  Manage Voices → add a **German** voice.
- **Windows:** Settings → Time & Language → Language → add **Deutsch** (this installs
  its speech voice).

Then restart Chrome.

---

## Privacy

- Runs **100% locally**. No backend, no login, no analytics.
- The only data stored is **your saved mistakes**, kept in `chrome.storage.local`
  on your own machine. Nothing is ever uploaded.
- No personal data is collected.

---

## File structure

```
german-speaking-pattern-assistant/
  manifest.json      Manifest V3 config (side panel)
  background.js      Opens the side panel on icon click
  sidepanel.html     UI shell
  sidepanel.css      Styles (calm dark theme, big buttons)
  sidepanel.js       All logic: speech, tabs, trainer, mistakes
  data.js            All German phrases & tables (edit this to add content)
  icons/             icon16 / icon48 / icon128
  README.md
```

To **add or change phrases**, edit `data.js` only — no build step, just reload the
extension at `chrome://extensions`.

---

## Future improvements

- AI grammar correction of your own typed sentences
- Speech **recognition** (check your pronunciation back)
- Daily 5-minute practice screen
- More prepositions and weak-noun support in the Build / Decline trainers
- Anki / flashcard export of My Mistakes
- Class transcript helper (with permission)
- Teacher mode + personalized A2/B1 grammar roadmap
- Cloud sync across devices
- **Sinhala** explanation mode + English/Sinhala/German translations

---

## Content source

Vocabulary genders and essential phrases are drawn from *Collins German 3000 Words
& Phrases* (© HarperCollins Publishers) for personal study. If you publish or share
this extension, replace that content with your own.

## License

Personal / educational use. Edit and extend freely.
