# 365 Days of Us — Interactive Anniversary Treasure Hunt 💖

> **"12 months. 12 little surprises. A thousand memories."**  
> A romantic, dreamy, and interactive anniversary treasure-hunt web experience designed especially for your boyfriend.

---

## 🌟 Overview & Concept

This website is a personal 1st anniversary digital universe crafted with a soft romantic multiverse aesthetic (blush pink, lavender, warm cream, gentle gold, subtle glowing portals, and starry stardust particles).

### How the Treasure Hunt Works:
- **Romantic Gatekeeper Test (Login)**:
  - Before entering, he must pass the boyfriend verification test!
  - **Username**: `cookie` (the sweet nickname you call him 🍪)
  - **Password**: `animini` (your secret special way to say "I love you" 💕)
  - If he has trouble, cute hint buttons are built right into the login card to guide him!
- **12 Portals in Total**: 12 personalized surprises in your exact requested order:
  1. **Portal 01**: The Rewind Capsule (Personalized anniversary video edit, Clue: `REPLAY`)
  2. **Portal 02**: The Multiverse Gateway (This website itself, Clue: `PORTAL`)
  3. **Portal 03**: The Silver Arrow Bricks (Mercedes F1 LEGO set, Clue: `MERCEDES`)
  4. **Portal 04**: The Handcrafted Cassette (Handmade cassette card — a surprise hasn't arrived yet, so be surprised or beware!, Clue: `CASSETTE`)
  5. **Portal 05**: The Chronicles of Two (Personalized love-story comic, Clue: `STORY`)
  6. **Portal 06**: The Card in a Frame (A card inside a frame with glass, no couple photo — extra surprise hasn't arrived yet, so be surprised or beware!, Clue: `FRAME`)
  7. **Portal 07**: The Paper Ring (Taylor Swift inspired paper ring — a surprise hasn't arrived yet, so be surprised or beware!, Clue: `PAPER RING`)
  8. **Portal 08**: The Collector's Archive (Pokémon cards binder, Clue: `TRAINER`)
  9. **Portal 09**: The Melancholic Chords (The Smiths handmade song card, Clue: `SMITHS`)
  10. **Portal 10**: The Everlasting Garden (Handmade crochet bouquet, Clue: `BLOOM`)
  11. **Portal 11**: The Little Glass Vessel (A jar filled with reasons why I love him, Clue: `REASONS`)
  12. **Portal 12**: The Sealed Constellation (The final handwritten anniversary letter, Clue: `WORDS`)
- **Hourly Scheduled Unlocking**:
  - Starts at **9:00 AM** on the scheduled date.
  - A new portal unlocks **every 1 hour** (9 AM, 10 AM, 11 AM, 12 PM, 1 PM, 2 PM, 3 PM, 4 PM, 5 PM, 6 PM, 7 PM, 8 PM).
  - Portals display a live countdown timer until their unlock hour arrives.
  - A portal unlocks when **both** conditions are satisfied: its scheduled time has arrived AND the previous portal has been solved!
  - *Testing Mode*: In Developer Mode (`Ctrl + Shift + D` or footer link), you can toggle **"Bypass Time Locks"** on or off at any moment so you can test all portals right away!
- **Interactive Riddle Flow**:
  - Clicking an unlocked portal opens an elegant riddle modal with the exact clue question.
  - Submitting the correct clue word triggers a joyful celebration with confetti, a melodic chime, and reveals the gift details and your heartfelt message.
  - An incorrect answer gently shakes and displays an encouraging hint.
  - A subtle **"Need a gentle hint?"** accordion is available if he gets stuck.
- **Persistent Progress**: All solved portals are automatically saved in browser `localStorage`. Refreshing, closing, or reopening the page preserves his progress. Solved portals can be revisited anytime to re-read the messages.
- **The Grand Finale (Portal 12)**:
  - Unlocks once all 11 previous portals are solved and its scheduled time arrives.
  - Once solved with `WORDS`, the screen transitions to an intimate twilight scene.
  - Features an interactive **3D wax-sealed envelope**. Clicking the wax seal opens the flap with a gentle chime, and the letter unfolds into an authentic romantic parchment letter celebrating your first 365 days together.
  - Includes a **"Review All 12 Surprises"** treasure box summary gallery.

---

## 📂 Project Structure

```
.
├── index.html              # Main HTML5 structure with semantic modals, login gate, and views
├── style.css               # Romantic pastel theme, responsive grid, 3D envelope, animations
├── script.js               # Central portal data, schedule config, audio synthesizer & logic
├── README.md               # Beginner-friendly customization and deployment guide
└── assets/
    └── images/             # Optional custom photos for each gift (portal01.jpg, etc.)
        └── README.txt      # Guide for custom photos and naming conventions
```

---

## 🚀 How to Run the Website Locally

You can view this website right now on your computer in multiple easy ways:

### Option A: Double-Click (Simplest)
1. Open the folder `a week` on your Desktop.
2. Double-click `index.html`.
3. It will open immediately in your web browser (Chrome, Edge, Safari, Firefox)!

### Option B: Using VS Code Live Server (Recommended for Live Editing)
1. Open the folder in **Visual Studio Code**.
2. Install the **Live Server** extension if you haven't already.
3. Right-click `index.html` and choose **"Open with Live Server"**.
4. The website will launch at `http://127.0.0.1:5500/` and auto-reload whenever you save edits.

---

## ⏰ How to Configure the Hourly Schedule

At the very top of `script.js` (around line 15), you'll find the `SCHEDULE_CONFIG` settings:

```javascript
const SCHEDULE_CONFIG = {
  // Configurable anniversary start date (YYYY-MM-DD in local time).
  // Defaults to today's date so you can test it immediately!
  // To schedule for your anniversary, simply set your date: e.g. "2026-11-20"
  startDate: todayFormatted,
  startHour: 9, // First portal unlocks at 9:00 AM local time
  intervalHours: 1, // Subsequent portal unlocks every 1 hour (9 AM, 10 AM, 11 AM... 8 PM)
  bypassTimeLocks: false // Set true to bypass all timers for testing!
};
```

- When you are ready for the actual anniversary day, just change `startDate` to your anniversary date string (e.g., `"2026-11-20"`).
- Portal 01 will unlock at 9:00 AM, Portal 02 at 10:00 AM, Portal 03 at 11:00 AM, etc.

---

## 🛠️ Testing & Developer Mode

To let you test everything before sending the link to your boyfriend, a discrete **Developer & Testing Mode** is built in.

### How to Open Developer Mode:
- **Keyboard Shortcut**: Press `Ctrl + Shift + D` (or `Alt + D`).
- **Footer Button**: Scroll to the very bottom of the page and click the subtle `⚙️ Testing Mode` button.

### What You Can Do in Developer Mode:
1. **`⏱️ Bypass Time Locks: ON/OFF`**: Instantly toggle off the hourly time restrictions so you can test all riddles right away without waiting!
2. **`🔓 Unlock All Portals (01–11)`**: Instantly completes portals 1 through 11 with one click, so you can test how Portal 12 unlocks.
3. **`🎉 Solve All 12 Portals & Open Letter`**: Instantly solves all 12 portals and triggers the grand finale envelope sequence.
4. **`🔒 Relock Website (Show Login Screen)`**: Re-locks the website to test the Cookie and "animini" login gate again.
5. **`🔄 Reset All Progress`**: Clears `localStorage` and returns the website to a clean, fresh state (0% completed) ready for your boyfriend.
6. **Jump to Any Portal**: Click any portal button in the picker to immediately open that portal's riddle or reveal.
7. **Riddle Reference Table**: Displays all 12 riddles, their canonical answers, and their current status.

> 💡 *Note: This panel is hidden from normal visitors unless triggered via the shortcut or footer link.*

---

## 🎨 How to Customize Messages, Letter, or Photos

All data, messages, riddles, hints, and the final letter are located in one clean file: **`script.js`**.

### 1. Editing the Final Anniversary Letter (Portal 12)
Inside `script.js`, locate `LETTER_CONFIG` (around line 280):

```javascript
const LETTER_CONFIG = {
  salutation: "To My Dearest Love,",
  paragraphs: [
    "Your first paragraph celebrating your 365 days...",
    "Your second paragraph about your favorite memories...",
    "Your third paragraph about what he means to you...",
    "Your final paragraph looking forward to the future..."
  ],
  closing: "Forever & always with all my heart,",
  signature: "Your Girlfriend ❤️",
  date: "365 Days Down, A Lifetime to Go"
};
```
You can add or edit paragraphs—each line in the array will be formatted on the vintage parchment background!

### 2. Adding Custom Photos (Optional)
By default, the website includes **12 custom-designed SVG illustrations** tailored to each specific gift (such as the Mercedes F1 LEGO car, the cassette card, the comic, the framed card with calligraphy, the paper ring, and the crochet bouquet).

If you want to replace any illustration with a real photograph:
1. Place your image inside the `assets/images/` folder.
2. Name it according to the portal number (e.g., `portal01.jpg`, `portal03.jpg`, `portal06.jpg`).
3. The website will automatically detect and display the image! If no image file is found, it automatically displays the built-in SVG artwork.

---

## 🌐 Deploying to GitHub Pages (Free Hosting)

You can easily host this website for free on GitHub Pages:

1. **Create a GitHub Account**: Sign up at [github.com](https://github.com) if you do not have one.
2. **Create a New Repository**:
   - Name it something cute, like `365-days-of-us`.
   - Set it to **Public**.
3. **Upload the Files**:
   - Drag and drop: `index.html`, `style.css`, `script.js`, `README.md`, and the `assets` folder.
   - Click **"Commit changes"**.
4. **Enable GitHub Pages**:
   - Go to your repository's **Settings > Pages**.
   - Under **Build and deployment > Source**, select **"Deploy from a branch"**.
   - Branch: `main` / `(root)`, then click **Save**.
5. **Send Him the Link**:
   - In 1–2 minutes, your website link is live (e.g., `https://yourusername.github.io/365-days-of-us/`).
   - Copy this link and send it to your boyfriend!
