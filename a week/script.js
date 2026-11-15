/**
 * ========================================================
 * 365 DAYS OF US — INTERACTIVE ANNIVERSARY WEBSITE
 * Logic, State Management, Particle Canvas, Audio FX & Dev Tools
 * ========================================================
 */

// ========================================================
// 1. CENTRAL SCHEDULE & DATA CONFIGURATION
// Everything here can be easily customized!
// ========================================================

const todayFormatted = (() => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
})();

const SCHEDULE_CONFIG = {
  // Configurable anniversary start date (YYYY-MM-DD in local time).
  // Defaults to today's date so you can test it immediately!
  // To schedule for your anniversary, you can change this to e.g. "2026-11-20"
  startDate: todayFormatted,
  startHour: 9, // First portal unlocks at 9:00 AM local time
  intervalHours: 1, // Subsequent portal unlocks every 1 hour (9 AM, 10 AM, 11 AM... 8 PM)
  bypassTimeLocks: false // Set true to bypass all hourly timers for testing!
};

function getPortalScheduledDate(portalIndex) {
  const [year, month, day] = SCHEDULE_CONFIG.startDate.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day, SCHEDULE_CONFIG.startHour + portalIndex * SCHEDULE_CONFIG.intervalHours, 0, 0);
  return targetDate;
}

function isPortalTimeUnlocked(portalIndex) {
  if (SCHEDULE_CONFIG.bypassTimeLocks) return true;
  const now = new Date();
  const unlockDate = getPortalScheduledDate(portalIndex);
  return now >= unlockDate;
}

function getPortalUnlockFormatted(portalIndex) {
  const date = getPortalScheduledDate(portalIndex);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function getPortalTimeRemaining(portalIndex) {
  const now = new Date();
  const target = getPortalScheduledDate(portalIndex);
  const diffMs = target - now;
  if (diffMs <= 0) return null;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}

const PORTALS_DATA = [
  {
    id: 1,
    portalNumber: "01",
    portalTitle: "The Rewind Capsule",
    teaser: "A montage of our laughs, adventures, and candid seconds.",
    category: "Non-materialistic",
    isPhysical: false,
    svgType: "reel",
    giftName: "A personalised anniversary video edit",
    riddle: "Time moves forward, but some moments deserve another look. A familiar smile, a silly memory, a hundred little seconds stitched together. What would you press to experience them again?",
    answer: "REPLAY",
    acceptedAnswers: ["REPLAY", "REPLAYS", "PLAY"],
    hint: "The button you press to watch a favorite video clip once more.",
    icon: "🎬",
    imagePath: "assets/images/portal01.jpg",
    revealMessage: "I stitched together our favorite clips, candid videos, goofy voice notes, and quiet moments into a special anniversary reel. Put on your headphones and let's relive this year all over again.",
  },
  {
    id: 2,
    portalNumber: "02",
    portalTitle: "The Multiverse Gateway",
    teaser: "Twelve little worlds crafted especially for you.",
    category: "Non-materialistic / Digital",
    isPhysical: false,
    svgType: "portal",
    giftName: "This website itself — a little digital universe made especially for him",
    riddle: "Not quite a door, yet I lead you somewhere new. Twelve little worlds are waiting behind me, each hiding something made just for you. What am I?",
    answer: "PORTAL",
    acceptedAnswers: ["PORTAL", "PORTALS", "A PORTAL"],
    hint: "You are standing right before one right now! What is each gateway called?",
    icon: "🌌",
    imagePath: "assets/images/portal02.jpg",
    revealMessage: "Surprise! This entire website was designed and built from scratch as a personal universe for our first anniversary. Every screen, every riddle, and every detail here was created just for you to celebrate our 365 days together.",
  },
  {
    id: 3,
    portalNumber: "03",
    portalTitle: "The Silver Arrow Bricks",
    teaser: "Built brick by brick in legendary silver, black, and teal.",
    category: "Materialistic",
    isPhysical: true,
    svgType: "lego",
    giftName: "Mercedes F1 LEGO set",
    riddle: "Brick by brick, a legend takes form. Clothed in iconic silver and teal, without a single drop of scarlet red. Six world titles made this team his true home on the track. Which championship team are you building?",
    answer: "MERCEDES",
    acceptedAnswers: ["MERCEDES", "MERC", "MERCEDES F1", "MERCEDES-AMG", "MERCEDES AMG", "MERCEDES BENZ", "LEGO", "SILVER ARROW", "SILVER ARROWS", "FORTYFOUR", "44"],
    hint: "The legendary Silver Arrows where Lewis dominated and won six world championships (and definitely NOT Ferrari!).",
    icon: "🏎️",
    imagePath: "assets/images/portal03.jpg",
    revealMessage: "For my favorite F1 fan! A Mercedes F1 LEGO set so you can build the legendary Silver Arrow brick by brick. His greatest championship era was in silver, black, and teal—the true home of greatness (absolutely no Ferrari red allowed in this household!). I can't wait to see you assemble every piece.",
  },
  {
    id: 4,
    portalNumber: "04",
    portalTitle: "The Handcrafted Cassette",
    teaser: "A vintage tape filled with our love, while your special surprise is on the way.",
    category: "Materialistic",
    isPhysical: true,
    isArrivingSoon: true,
    svgType: "cassette",
    arrivingSoonText: "<strong>📦 Secret Note:</strong> A little surprise hasn't arrived in the mail yet... so be surprised or beware! 👀✨ But until it gets here, I made this special cassette card for you to have right now. The rest is coming very soon! 🥰",
    giftName: "A handmade cassette card",
    riddle: "Two little spools and a ribbon of memories. You can press play to feel close, or rewind to our favorite days. What retro music keepsake am I?",
    answer: "CASSETTE",
    acceptedAnswers: ["CASSETTE", "TAPE", "MIXTAPE", "CASSETTE CARD", "CARD", "CASSETTE TAPE"],
    hint: "A vintage retro music tape with two wheels and magnetic ribbon.",
    icon: "📼",
    imagePath: "assets/images/portal04.jpg",
    revealMessage: "A handmade vintage cassette card crafted with all my love! Pull the tape ribbon to reveal our inside jokes and memories. (P.S. A little something hasn't arrived yet, so be surprised or beware! It will be handed to you the moment it gets here! 👀🥰)",
  },
  {
    id: 5,
    portalNumber: "05",
    portalTitle: "The Chronicles of Two",
    teaser: "An illustrated saga where you and I are the main characters.",
    category: "Non-materialistic",
    isPhysical: false,
    svgType: "comic",
    giftName: "A personalised comic based on our love story",
    riddle: "Every universe has its heroes, every adventure has its twists. But this one has two characters who somehow became each other's favourite plot. What is this?",
    answer: "STORY",
    acceptedAnswers: ["STORY", "STORIES", "OUR STORY", "LOVE STORY"],
    hint: "What do you call a narrative of adventures and cherished moments shared together?",
    icon: "📖",
    imagePath: "assets/images/portal05.jpg",
    revealMessage: "A custom illustrated comic strip capturing the hilarious, sweet, and unforgettable moments from our past 365 days. Out of all the stories in the world, ours will always be my absolute favorite.",
  },
  {
    id: 6,
    portalNumber: "06",
    portalTitle: "The Card in a Frame",
    teaser: "A heartfelt card preserved behind glass to keep forever on your desk.",
    category: "Materialistic",
    isPhysical: true,
    isArrivingSoon: true,
    svgType: "framed_card",
    arrivingSoonText: "<strong>📦 Secret Note:</strong> A little something hasn't arrived yet, so get ready to be surprised (or beware! 😏💖). But until it arrives, I framed this special card for you! The rest will be given to you as soon as it arrives! 🖼️✨",
    giftName: "A card inside a frame",
    riddle: "Words from the heart, preserved behind glass. Not an ordinary letter tucked away in a drawer, but displayed to remind you of my love every single day. What keepsake am I?",
    answer: "FRAME",
    acceptedAnswers: ["FRAME", "CARD", "FRAMED CARD", "PICTURE FRAME", "PHOTO FRAME", "FRAMED"],
    hint: "A special written card displayed inside a frame with glass.",
    icon: "🖼️",
    imagePath: "assets/images/portal06.jpg",
    revealMessage: "A heartfelt card carefully preserved inside a beautiful frame so you can keep it on your desk or bedside table forever. (P.S. A little something extra hasn't arrived yet, so be surprised or beware! The rest will be given to you as soon as it arrives! 💖)",
  },
  {
    id: 7,
    portalNumber: "07",
    portalTitle: "The Paper Ring",
    teaser: "Because I like shiny things, but I'd marry you with paper rings.",
    category: "Materialistic",
    isPhysical: true,
    isArrivingSoon: true,
    svgType: "paper_ring",
    arrivingSoonText: "<strong>📦 Secret Note:</strong> A little surprise hasn't arrived in the mail yet, so be surprised or beware... 😏✨ But until it arrives, I made you this paper ring as a promise that you're my favorite person in the entire universe! 💍🥰",
    giftName: "A paper ring (Taylor Swift inspired)",
    riddle: "I like shiny things, but as Taylor Swift sang, with the person you truly love, you don't need diamonds or gold to promise forever. What humble folded keepsake would I marry you with?",
    answer: "PAPER RING",
    acceptedAnswers: ["PAPER RING", "PAPER RINGS", "PAPERRING", "PAPERRINGS", "RING", "RINGS"],
    hint: "Think of Taylor Swift's hit song: 'I like shiny things, but I'd marry you with ______!'",
    icon: "💍",
    imagePath: "assets/images/portal07.jpg",
    revealMessage: "A delicate handcrafted paper ring, inspired by Taylor Swift! 'I like shiny things, but I'd marry you with paper rings, uh-huh, that's right, darling, you're the one I want!' (P.S. A little something hasn't arrived yet, so be surprised or beware! It will be handed to you the second it arrives! 💍✨)",
  },
  {
    id: 8,
    portalNumber: "08",
    portalTitle: "The Collector's Archive",
    teaser: "A special sanctuary for your prized cards.",
    category: "Materialistic",
    isPhysical: true,
    svgType: "pokemon_binder",
    giftName: "Pokémon cards binder",
    riddle: "Some collect badges, some chase rare cards, and some dream of becoming the very best. But every adventure begins with someone who catches them all. Who is that?",
    answer: "TRAINER",
    acceptedAnswers: ["TRAINER", "TRAINERS", "POKEMON TRAINER"],
    hint: "What is a Pokémon master called when raising and training their team?",
    icon: "⚡",
    imagePath: "assets/images/portal08.jpg",
    revealMessage: "A protective, high-grade card binder to organize and treasure your Pokémon card collection. Because every great Pokémon Trainer deserves a vault worthy of their rarest holographic pulls!",
  },
  {
    id: 9,
    portalNumber: "09",
    portalTitle: "The Melancholic Chords",
    teaser: "A nostalgic melody from an iconic English band.",
    category: "Non-materialistic",
    isPhysical: false,
    svgType: "smiths_card",
    giftName: "A handmade card inspired by The Smiths",
    riddle: "A band whose name is also a very ordinary surname. Their songs can say things that are difficult to put into our own words. Which band am I thinking of?",
    answer: "SMITHS",
    acceptedAnswers: ["SMITHS", "THE SMITHS", "THESMITHS"],
    hint: "English rock band fronted by Morrissey and Johnny Marr ('There Is a Light That Never Goes Out').",
    icon: "🎸",
    imagePath: "assets/images/portal09.jpg",
    revealMessage: "A custom handcrafted tribute card themed around The Smiths. 'To die by your side is such a heavenly way to die'—their poetic melancholy captured so many feelings we share when listening to music together.",
  },
  {
    id: 10,
    portalNumber: "10",
    portalTitle: "The Everlasting Garden",
    teaser: "A bloom that will never fade with time.",
    category: "Materialistic",
    isPhysical: true,
    svgType: "crochet",
    giftName: "Crochet bouquet",
    riddle: "I look like something picked from a garden, yet I'll never wilt or ask for sunlight. Made stitch by stitch, I carry a little colour that will last. What am I here to represent?",
    answer: "BLOOM",
    acceptedAnswers: ["BLOOM", "BLOOMS", "BLOOMING"],
    hint: "Think of what a flower does in springtime, or the state of flourishing.",
    icon: "🌸",
    imagePath: "assets/images/portal10.jpg",
    revealMessage: "Just like real flowers, these are vibrant and delicate—but unlike cut flowers, these will never wilt. Each little petal was crafted stitch by stitch so you can keep this bouquet forever on your desk or bedside table to remind you of our love that keeps blooming every day.",
  },
  {
    id: 11,
    portalNumber: "11",
    portalTitle: "The Little Glass Vessel",
    teaser: "Dozens of small folded notes of pure love.",
    category: "Non-materialistic",
    isPhysical: true,
    svgType: "reasons_jar",
    giftName: "A jar filled with reasons why I love him",
    riddle: "I am filled with little pieces of something you cannot buy. Each one begins with a thought, each one has a meaning, and together they tell you why you're loved. What am I filled with?",
    answer: "REASONS",
    acceptedAnswers: ["REASONS", "REASON", "REASONS JAR"],
    hint: "Plural noun: What do you give when explaining 'why' you adore someone?",
    icon: "🫙",
    imagePath: "assets/images/portal11.jpg",
    revealMessage: "A handmade jar packed with handwritten little notes—each with a reason why I love you, from your adorable quirks to how safe you make me feel. Pull one out whenever you need a reminder of how cherished you are.",
  },
  {
    id: 12,
    portalNumber: "12",
    portalTitle: "The Sealed Constellation",
    teaser: "The heartfelt finale waiting at the end of the multiverse.",
    category: "Non-materialistic",
    isPhysical: false,
    svgType: "letter",
    giftName: "The final handwritten anniversary letter",
    riddle: "No photographs can capture it, no song can fully express it, and no little gift can contain it. I've kept it all inside until now. What am I finally giving you?",
    answer: "WORDS",
    acceptedAnswers: ["WORDS", "WORD"],
    hint: "The building blocks of letters, confessions, and heartfelt feelings.",
    icon: "💌",
    imagePath: "assets/images/portal12.jpg",
    revealMessage: "My raw, honest thoughts put onto parchment. A full handwritten letter celebrating our first whole year together and looking ahead to everything still to come.",
  }
];

// ========================================================
// 2. FINAL ANNIVERSARY LETTER CONTENT
// Customize your heartfelt letter here!
// ========================================================
const LETTER_CONFIG = {
  salutation: "To My Dearest Cookie,",
  paragraphs: [
    "Exactly 365 days ago, our paths crossed in a way that changed my world forever. If someone had told me back then how much laughter, comfort, and silly happiness we would pack into a single year, I probably would have smiled and thought it was too good to be true. But here we are, celebrating our very first anniversary, and every single day with you has been a gift.",
    "Thank you for being my constant teammate. For comforting me when I'm tired, for laughing at my amazing jokes, for holding my hand when the world gets loud, and for turning even the most ordinary quiet evenings into adventures I wouldn't trade for anything.",
    "Every portal you opened today holds a small token of the love I carry for you—some are little physical things to make you smile, some are memories we've lived, and some are inside jokes only the two of us will ever truly understand. But behind every single one is the exact same truth: I am so endlessly grateful that it's you.",
    "Here is to 365 days of us—to the inside jokes, the late-night talks, the songs we've sung at the top of our lungs, and the million little moments that make you my favorite person in the entire universe. I can't wait for year two, year ten, and every chapter yet to come."
  ],
  closing: "Forever & always with all my heart,",
  signature: "Your Mochu ❤️",
  date: "365 Days Down, A Lifetime to Go"
};

// ========================================================
// 3. PERSISTENT STATE MANAGEMENT (localStorage)
// ========================================================
const STORAGE_KEY = "anniversary_365_progress";
const AUTH_KEY = "anniversary_365_auth";

let appState = {
  completedPortals: [], // array of portal IDs (1..12)
  currentFilter: "all",
  soundEnabled: true,
  currentOpenPortalId: null,
  isAuthenticated: false
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.completedPortals)) {
        appState.completedPortals = parsed.completedPortals;
      }
      if (typeof parsed.soundEnabled === "boolean") {
        appState.soundEnabled = parsed.soundEnabled;
      }
    }
    const authRaw = localStorage.getItem(AUTH_KEY);
    appState.isAuthenticated = authRaw === "true";
    const bypassRaw = localStorage.getItem("anniversary_bypass_timelocks");
    if (bypassRaw !== null) {
      SCHEDULE_CONFIG.bypassTimeLocks = bypassRaw === "true";
    }
  } catch (err) {
    console.warn("Could not load from localStorage, starting fresh.", err);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedPortals: appState.completedPortals,
      soundEnabled: appState.soundEnabled
    }));
    if (appState.isAuthenticated) {
      localStorage.setItem(AUTH_KEY, "true");
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (err) {
    console.warn("Could not save to localStorage.", err);
  }
}

function isPortalCompleted(id) {
  return appState.completedPortals.includes(id);
}

function areFirst11PortalsCompleted() {
  for (let i = 1; i <= 11; i++) {
    if (!appState.completedPortals.includes(i)) {
      return false;
    }
  }
  return true;
}

function isPortal12Unlocked() {
  return areFirst11PortalsCompleted() && isPortalTimeUnlocked(11);
}

function isPreviousPortalCompleted(portalId) {
  if (portalId === 1) return true;
  return isPortalCompleted(portalId - 1);
}

function getPortalLockStatus(portal) {
  const isCompleted = isPortalCompleted(portal.id);
  if (isCompleted) {
    return { isLocked: false, isCompleted: true };
  }

  const portalIndex = portal.id - 1;
  const prevCompleted = portal.id === 12 ? areFirst11PortalsCompleted() : isPreviousPortalCompleted(portal.id);
  const timeUnlocked = isPortalTimeUnlocked(portalIndex);

  if (portal.id === 12) {
    if (!prevCompleted) {
      return { 
        isLocked: true, 
        reason: "prev_unsolved", 
        message: "Complete Portals 01–11 first",
        toast: "🔒 This final portal holds our anniversary letter! Please solve Portals 01–11 first! ✨"
      };
    }
    if (!timeUnlocked) {
      const timeStr = getPortalUnlockFormatted(portalIndex);
      const remaining = getPortalTimeRemaining(portalIndex) || "a moment";
      return { 
        isLocked: true, 
        reason: "time_locked", 
        message: `Unlocks at ${timeStr}`,
        countdown: remaining,
        timeStr: timeStr,
        toast: `⏳ Portal 12 unlocks at ${timeStr}! Hang tight, Cookie 💕 (${remaining} remaining)`
      };
    }
    return { isLocked: false, isCompleted: false };
  }

  // Portals 1 to 11
  if (!prevCompleted && !timeUnlocked) {
    const prevNum = String(portal.id - 1).padStart(2, "0");
    const timeStr = getPortalUnlockFormatted(portalIndex);
    return { 
      isLocked: true, 
      reason: "both", 
      message: `Solve Portal ${prevNum} first`,
      timeStr: timeStr,
      toast: `🔒 Solve Portal ${prevNum} first! This portal also unlocks at ${timeStr}. ✨`
    };
  }

  if (!prevCompleted) {
    const prevNum = String(portal.id - 1).padStart(2, "0");
    return { 
      isLocked: true, 
      reason: "prev_unsolved", 
      message: `Solve Portal ${prevNum} first`,
      toast: `🔒 Solve Portal ${prevNum} first to unlock this gateway! ✨`
    };
  }

  if (!timeUnlocked) {
    const timeStr = getPortalUnlockFormatted(portalIndex);
    const remaining = getPortalTimeRemaining(portalIndex) || "a moment";
    return { 
      isLocked: true, 
      reason: "time_locked", 
      message: `Unlocks at ${timeStr}`,
      countdown: remaining,
      timeStr: timeStr,
      toast: `⏳ Portal ${portal.portalNumber} unlocks at ${timeStr}! Hang tight, Cookie 💕 (${remaining} remaining)`
    };
  }

  return { isLocked: false, isCompleted: false };
}

function markPortalCompleted(id) {
  if (!appState.completedPortals.includes(id)) {
    appState.completedPortals.push(id);
    saveState();
  }
}

// ========================================================
// 4. WEB AUDIO SYNTHESIZER (NO EXTERNAL AUDIO FILES NEEDED)
// ========================================================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playTone(freq, type = "sine", duration = 0.2, gainVal = 0.15, delay = 0) {
  if (!appState.soundEnabled || !audioCtx) return;
  
  setTimeout(() => {
    try {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio playback fails silently if user has not interacted
    }
  }, delay * 1000);
}

function playSuccessChime() {
  initAudio();
  // Sweet upward chime
  playTone(523.25, "sine", 0.25, 0.2, 0.0);   // C5
  playTone(659.25, "sine", 0.25, 0.2, 0.08);  // E5
  playTone(783.99, "sine", 0.3, 0.2, 0.16);   // G5
  playTone(1046.50, "sine", 0.45, 0.25, 0.24); // C6
}

function playIncorrectTone() {
  initAudio();
  // Gentle soft error tone
  playTone(330, "triangle", 0.2, 0.15, 0);
  playTone(293, "triangle", 0.25, 0.15, 0.12);
}

function playEnvelopeOpenChime() {
  initAudio();
  playTone(440, "sine", 0.3, 0.2, 0);
  playTone(554.37, "sine", 0.3, 0.2, 0.1);
  playTone(659.25, "sine", 0.4, 0.2, 0.2);
  playTone(880, "sine", 0.6, 0.25, 0.3);
}

function playClickSound() {
  initAudio();
  playTone(800, "sine", 0.06, 0.08, 0);
}

// ========================================================
// 5. AMBIENT PARTICLES CANVAS (SOFT STARS & FLOATING PETALS)
// ========================================================
const ambientCanvas = document.getElementById("ambient-canvas");
const actx = ambientCanvas.getContext("2d");
let particles = [];
let animFrameId = null;

function resizeAmbientCanvas() {
  ambientCanvas.width = window.innerWidth;
  ambientCanvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * ambientCanvas.width;
    this.y = initial ? Math.random() * ambientCanvas.height : -10;
    this.size = Math.random() * 2.5 + 0.8;
    this.speedY = Math.random() * 0.45 + 0.15;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.55 + 0.2;
    this.pulseSpeed = Math.random() * 0.02 + 0.008;
    this.pulse = Math.random() * Math.PI * 2;
    this.colorType = Math.random(); // Rose, Lavender, or Gold
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.pulse += this.pulseSpeed;

    if (this.y > ambientCanvas.height + 15 || this.x < -15 || this.x > ambientCanvas.width + 15) {
      this.reset();
    }
  }

  draw() {
    actx.save();
    const currentAlpha = Math.max(0.1, this.opacity + Math.sin(this.pulse) * 0.25);
    actx.globalAlpha = currentAlpha;

    if (this.colorType < 0.4) {
      actx.fillStyle = "#F472B6"; // soft rose
    } else if (this.colorType < 0.8) {
      actx.fillStyle = "#A78BFA"; // soft lavender
    } else {
      actx.fillStyle = "#FBBF24"; // starlight gold
    }

    actx.beginPath();
    actx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    actx.fill();
    actx.restore();
  }
}

function initParticles() {
  resizeAmbientCanvas();
  window.addEventListener("resize", resizeAmbientCanvas);
  particles = [];
  const count = Math.min(Math.floor(window.innerWidth / 20), 65);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  actx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
  for (let p of particles) {
    p.update();
    p.draw();
  }
  animFrameId = requestAnimationFrame(animateParticles);
}

// Pause animation when tab is inactive to save battery/resources
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (animFrameId) cancelAnimationFrame(animFrameId);
  } else {
    animFrameId = requestAnimationFrame(animateParticles);
  }
});

// ========================================================
// 6. CONFETTI BURST ENGINE
// ========================================================
const confettiCanvas = document.getElementById("confetti-canvas");
const cctx = confettiCanvas.getContext("2d");
let confettiPieces = [];
let confettiAnimId = null;

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeConfettiCanvas);

class ConfettiPiece {
  constructor(x, y) {
    this.x = x || confettiCanvas.width / 2;
    this.y = y || confettiCanvas.height / 2;
    this.size = Math.random() * 8 + 5;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 3;
    this.gravity = 0.22;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 12;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.01;
    
    const palette = ["#D9466F", "#F472B6", "#8B5CF6", "#C084FC", "#F59E0B", "#FDE68A", "#10B981"];
    this.color = palette[Math.floor(Math.random() * palette.length)];
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    this.alpha -= this.decay;
  }

  draw() {
    cctx.save();
    cctx.globalAlpha = Math.max(0, this.alpha);
    cctx.translate(this.x, this.y);
    cctx.rotate((this.rotation * Math.PI) / 180);
    cctx.fillStyle = this.color;
    cctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.7);
    cctx.restore();
  }
}

function triggerConfettiBurst(originX, originY) {
  resizeConfettiCanvas();
  const count = 75;
  for (let i = 0; i < count; i++) {
    confettiPieces.push(new ConfettiPiece(originX, originY));
  }
  if (!confettiAnimId) {
    animateConfetti();
  }
}

function animateConfetti() {
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const p = confettiPieces[i];
    p.update();
    p.draw();
    if (p.alpha <= 0) {
      confettiPieces.splice(i, 1);
    }
  }
  if (confettiPieces.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimId = null;
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

// ========================================================
// 7. BESPOKE SVG ARTWORK ILLUSTRATIONS (ELEGANT FALLBACKS)
// Renders beautiful tailored graphics for all 12 gifts!
// ========================================================
function getGiftSvgIllustration(portal) {
  const type = portal.svgType || String(portal.id);
  switch (type) {
    case "reel": // 1. Video edit / anniversary reel
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Film Reel / Polaroid Player Frame -->
          <rect x="40" y="25" width="120" height="95" fill="#18181B" stroke="#3F3F46" stroke-width="2" rx="8" />
          <!-- Video Screen -->
          <rect x="46" y="31" width="108" height="68" fill="#3B0764" rx="4" />
          <!-- Play Button in screen -->
          <circle cx="100" cy="65" r="16" fill="rgba(255,255,255,0.85)" />
          <polygon points="96,56 108,65 96,74" fill="#9333EA" />
          <!-- Video Scrubber Progress Bar -->
          <rect x="50" y="106" width="100" height="4" fill="#52525B" rx="2" />
          <rect x="50" y="106" width="60" height="4" fill="#F43F5E" rx="2" />
          <circle cx="110" cy="108" r="4" fill="#FDA4AF" />
          <!-- Heart timestamp -->
          <text x="100" y="136" font-family="sans-serif" font-size="10" font-weight="bold" fill="#F43F5E" text-anchor="middle">365 SECONDS OF LOVE ❤</text>
        </svg>
      `;

    case "portal": // 2. Treasure hunt website
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="portalCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="40%" stop-color="#F472B6" />
              <stop offset="80%" stop-color="#8B5CF6" />
              <stop offset="100%" stop-color="#4C1D95" />
            </radialGradient>
          </defs>
          <!-- Cosmic Portal Vortex -->
          <circle cx="100" cy="80" r="60" fill="url(#portalCore)" />
          <ellipse cx="100" cy="80" rx="75" ry="30" fill="none" stroke="#FDE68A" stroke-width="2" stroke-dasharray="6,4" transform="rotate(-25 100 80)" />
          <ellipse cx="100" cy="80" rx="75" ry="30" fill="none" stroke="#C084FC" stroke-width="2" stroke-dasharray="6,4" transform="rotate(35 100 80)" />
          <!-- Stars -->
          <text x="50" y="45" font-size="14" fill="#FDE68A">✦</text>
          <text x="145" y="55" font-size="12" fill="#FDE68A">✨</text>
          <text x="135" y="125" font-size="16" fill="#FDE68A">✦</text>
          <text x="45" y="120" font-size="12" fill="#FDE68A">✨</text>
        </svg>
      `;

    case "lego": // 3. Mercedes F1 LEGO set
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Build Platform / Ground -->
          <rect x="25" y="112" width="150" height="4" fill="#CBD5E1" rx="2" />
          
          <!-- LEGO Studs on top of car spine -->
          <circle cx="85" cy="74" r="3.5" fill="#334155" />
          <circle cx="95" cy="74" r="3.5" fill="#334155" />
          <circle cx="105" cy="74" r="3.5" fill="#334155" />
          <circle cx="115" cy="74" r="3.5" fill="#334155" />
          
          <!-- Mercedes F1 LEGO Speed Champions Body -->
          <path d="M 38 98 L 65 98 L 78 86 L 125 86 L 152 93 L 165 98 L 175 98 L 170 91 L 148 85 L 138 76 L 80 76 L 70 86 L 38 90 Z" fill="#1E293B" stroke="#0F172A" stroke-width="1.5" />
          
          <!-- Iconic Petronas Teal Racing Stripes -->
          <path d="M 68 95 L 142 90 L 138 93 L 68 97 Z" fill="#00A19B" />
          
          <!-- Mercedes Three-Pointed Star Badge -->
          <circle cx="100" cy="85" r="7" fill="#F8FAFC" stroke="#64748B" stroke-width="1" />
          <line x1="100" y1="78" x2="100" y2="85" stroke="#0F172A" stroke-width="1.2" />
          <line x1="100" y1="85" x2="94" y2="90" stroke="#0F172A" stroke-width="1.2" />
          <line x1="100" y1="85" x2="106" y2="90" stroke="#0F172A" stroke-width="1.2" />
          
          <!-- Wheels with Pirelli Red ring / Silver Wheel Covers -->
          <circle cx="65" cy="102" r="14" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="65" cy="102" r="6" fill="#00A19B" />
          <circle cx="145" cy="102" r="14" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="145" cy="102" r="6" fill="#00A19B" />
          
          <!-- Rear Wing with LEGO Braced Mount -->
          <rect x="34" y="74" width="18" height="6" fill="#0F172A" rx="1" />
          <line x1="42" y1="80" x2="42" y2="92" stroke="#00A19B" stroke-width="3" />
          
          <!-- Floating Cute LEGO Brick Accent -->
          <g transform="translate(136, 32)">
            <rect x="0" y="6" width="30" height="18" fill="#00A19B" rx="2" stroke="#0F766E" stroke-width="1.5" />
            <circle cx="8" cy="4" r="3" fill="#00A19B" stroke="#0F766E" stroke-width="1" />
            <circle cx="22" cy="4" r="3" fill="#00A19B" stroke="#0F766E" stroke-width="1" />
            <text x="15" y="19" font-family="sans-serif" font-weight="900" font-size="8" fill="white" text-anchor="middle">LEGO</text>
          </g>
          
          <!-- Tag text -->
          <text x="100" y="138" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="10" fill="#00A19B" text-anchor="middle">SILVER ARROWS • SPEED CHAMPIONS</text>
        </svg>
      `;

    case "cassette": // 4. Handmade Cassette Card
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Card Backdrop -->
          <rect x="35" y="24" width="130" height="96" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="2" rx="6" />
          <!-- Cassette Shell -->
          <rect x="42" y="32" width="116" height="74" fill="#334155" rx="5" stroke="#1E293B" stroke-width="2" />
          <!-- Cassette Label Area -->
          <rect x="52" y="40" width="96" height="42" fill="#FCE7F3" rx="3" />
          <!-- Cassette Label Header -->
          <rect x="52" y="40" width="96" height="12" fill="#F43F5E" />
          <text x="100" y="49" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="7" fill="white" text-anchor="middle">SIDE A • FOR MY COOKIE 🍪</text>
          <!-- Spools -->
          <circle cx="78" cy="62" r="10" fill="#1E293B" stroke="#F43F5E" stroke-width="1.5" />
          <circle cx="78" cy="62" r="4" fill="white" />
          <circle cx="122" cy="62" r="10" fill="#1E293B" stroke="#F43F5E" stroke-width="1.5" />
          <circle cx="122" cy="62" r="4" fill="white" />
          <!-- Center Tape Window -->
          <rect x="92" y="56" width="16" height="12" fill="#0F172A" rx="1" />
          <!-- Magnetic tape ribbon loop coming out bottom -->
          <path d="M 85 106 C 85 125, 115 125, 115 106" fill="none" stroke="#881337" stroke-width="3" stroke-linecap="round" />
          <!-- Cute Bow on the tape loop -->
          <circle cx="100" cy="120" r="4" fill="#F43F5E" />
          <!-- Handwritten Tag -->
          <text x="100" y="142" font-family="'Caveat', cursive" font-size="14" fill="#BE123C" text-anchor="middle">Made with love for you &hearts;</text>
        </svg>
      `;

    case "comic": // 5. Love story comic
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Comic Book Panel -->
          <rect x="40" y="20" width="120" height="120" fill="#FFFBEB" stroke="#1E293B" stroke-width="3" rx="4" />
          <line x1="40" y1="80" x2="160" y2="80" stroke="#1E293B" stroke-width="2" />
          <line x1="100" y1="80" x2="100" y2="140" stroke="#1E293B" stroke-width="2" />
          <!-- Top Panel: Caption & Stars -->
          <rect x="46" y="26" width="60" height="14" fill="#FBBF24" stroke="#1E293B" stroke-width="1" />
          <text x="49" y="36" font-family="sans-serif" font-size="8" font-weight="900" fill="#1E293B">ISSUE #1</text>
          <!-- Speech Bubble -->
          <path d="M 110 35 Q 135 30 145 42 Q 135 55 115 50 L 105 58 L 110 48 Z" fill="white" stroke="#1E293B" stroke-width="1.5" />
          <text x="127" y="44" font-family="sans-serif" font-size="8" font-weight="bold" fill="#E11D48" text-anchor="middle">YOU & ME</text>
          <!-- Bottom Left: Heart Burst -->
          <text x="70" y="120" font-size="28" text-anchor="middle">👩‍❤️‍👨</text>
          <!-- Bottom Right: "TO BE CONTINUED" -->
          <rect x="105" y="118" width="50" height="16" fill="#F43F5E" />
          <text x="130" y="129" font-family="sans-serif" font-size="6" font-weight="bold" fill="white" text-anchor="middle">YEAR TWO...</text>
        </svg>
      `;

    case "framed_card": // 6. A card inside a frame (No couple photo, strictly a framed keepsake card!)
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Soft Shadow -->
          <ellipse cx="100" cy="146" rx="65" ry="7" fill="rgba(0,0,0,0.07)" />
          
          <!-- Modern Desktop Frame Border (Warm Oak / Gold Hue) -->
          <rect x="52" y="16" width="96" height="126" rx="6" fill="#FDFBF7" stroke="#D97706" stroke-width="4" />
          <rect x="56" y="20" width="88" height="118" rx="4" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1.5" />
          <rect x="62" y="26" width="76" height="106" rx="3" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
          
          <!-- Preserved Handwritten Love Card inside the frame -->
          <rect x="68" y="32" width="64" height="94" rx="2" fill="#FFFDF9" stroke="#FDA4AF" stroke-width="1" />
          
          <!-- Card Wax Seal / Stamp Accent -->
          <circle cx="100" cy="48" r="9" fill="#F43F5E" />
          <text x="100" y="52" font-size="9" fill="white" text-anchor="middle">❤</text>
          
          <!-- Handwritten Calligraphy Lines on the Card -->
          <text x="100" y="68" font-family="'Caveat', cursive" font-size="12" font-weight="700" fill="#881337" text-anchor="middle">For My Cookie</text>
          
          <line x1="75" y1="76" x2="125" y2="76" stroke="#FDA4AF" stroke-width="1" stroke-dasharray="2,2" />
          <line x1="75" y1="84" x2="125" y2="84" stroke="#CBD5E1" stroke-width="1" stroke-linecap="round" />
          <line x1="75" y1="92" x2="121" y2="92" stroke="#CBD5E1" stroke-width="1" stroke-linecap="round" />
          <line x1="75" y1="100" x2="115" y2="100" stroke="#CBD5E1" stroke-width="1" stroke-linecap="round" />
          
          <text x="100" y="116" font-family="'Caveat', cursive" font-size="11" fill="#BE123C" text-anchor="middle">Always &amp; Forever</text>
          
          <!-- Diagonal Glass Glare Reflection (shows card is framed under glass) -->
          <path d="M 62 26 L 105 26 L 62 100 Z" fill="rgba(255,255,255,0.4)" />
          <line x1="70" y1="28" x2="134" y2="120" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round" />
          
          <!-- Mini Dried Lavender Sprig accent in frame corner -->
          <path d="M 64 128 Q 60 118 66 112" stroke="#15803D" stroke-width="1.5" fill="none" />
          <circle cx="66" cy="112" r="2.5" fill="#C084FC" />
          <circle cx="63" cy="116" r="2" fill="#E879F9" />
        </svg>
      `;

    case "paper_ring": // 7. A paper ring (Taylor Swift inspired)
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Dreamy Pastel Lover-era Cloud Background -->
          <ellipse cx="60" cy="50" rx="35" ry="18" fill="#FCE7F3" opacity="0.6" />
          <ellipse cx="140" cy="50" rx="35" ry="18" fill="#EDE9FE" opacity="0.6" />
          
          <!-- Taylor Swift Paper Ring Ring Band -->
          <ellipse cx="100" cy="98" rx="42" ry="24" fill="none" stroke="#FDE047" stroke-width="8" stroke-dasharray="8,2" />
          <ellipse cx="100" cy="98" rx="42" ry="24" fill="none" stroke="#F43F5E" stroke-width="3" />
          
          <!-- Origami Folded Diamond Gemstone on Top -->
          <polygon points="100,32 124,54 100,82 76,54" fill="#FDA4AF" stroke="#E11D48" stroke-width="2" />
          <polygon points="100,32 100,82 124,54" fill="#F43F5E" opacity="0.4" />
          <polygon points="100,32 88,54 100,82 112,54" fill="#FFF1F2" opacity="0.8" />
          <circle cx="100" cy="54" r="5" fill="#FFFFFF" />
          
          <!-- Sparkles -->
          <text x="60" y="42" font-size="16" fill="#F59E0B">✨</text>
          <text x="135" y="45" font-size="14" fill="#EC4899">✦</text>
          <text x="50" y="115" font-size="12" fill="#F43F5E">💖</text>
          <text x="145" y="115" font-size="12" fill="#F43F5E">💖</text>
          
          <!-- Taylor Swift Paper Rings Banner -->
          <rect x="35" y="128" width="130" height="20" fill="#FFF1F2" rx="10" stroke="#FDA4AF" stroke-width="1.5" />
          <text x="100" y="142" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="9" fill="#BE123C" text-anchor="middle">"I'D MARRY YOU WITH PAPER RINGS"</text>
        </svg>
      `;

    case "pokemon_binder": // 8. Pokemon cards binder
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Binder Cover -->
          <rect x="55" y="25" width="95" height="110" fill="#2563EB" stroke="#1E40AF" stroke-width="3" rx="6" />
          <!-- Binder Spine -->
          <rect x="50" y="25" width="12" height="110" fill="#1D4ED8" stroke="#1E40AF" stroke-width="2" rx="3" />
          <circle cx="56" cy="45" r="2.5" fill="#E2E8F0" />
          <circle cx="56" cy="80" r="2.5" fill="#E2E8F0" />
          <circle cx="56" cy="115" r="2.5" fill="#E2E8F0" />
          <!-- Pokeball emblem on binder -->
          <circle cx="108" cy="75" r="24" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5" />
          <path d="M 84 75 A 24 24 0 0 1 132 75 Z" fill="#EF4444" stroke="#0F172A" stroke-width="2.5" />
          <line x1="84" y1="75" x2="132" y2="75" stroke="#0F172A" stroke-width="3" />
          <circle cx="108" cy="75" r="8" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5" />
          <circle cx="108" cy="75" r="4" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1" />
          <!-- Shiny Card peaking out -->
          <rect x="115" y="32" width="24" height="34" fill="#FEF08A" stroke="#EAB308" stroke-width="1" rx="2" transform="rotate(15 127 49)" />
        </svg>
      `;

    case "smiths_card": // 9. The Smiths handmade song card
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Card Base -->
          <rect x="45" y="25" width="110" height="110" fill="#FEFCE8" stroke="#CA8A04" stroke-width="2" rx="4" />
          <!-- Vintage Cassette / Vinyl Graphic -->
          <rect x="55" y="40" width="90" height="52" fill="#374151" rx="4" stroke="#1F2937" stroke-width="1.5" />
          <rect x="65" y="48" width="70" height="26" fill="#F3F4F6" rx="2" />
          <!-- Cassette Spools -->
          <circle cx="82" cy="61" r="7" fill="#1F2937" />
          <circle cx="82" cy="61" r="3" fill="#FFFFFF" />
          <circle cx="118" cy="61" r="7" fill="#1F2937" />
          <circle cx="118" cy="61" r="3" fill="#FFFFFF" />
          <!-- The Smiths Band Title -->
          <text x="100" y="112" font-family="serif" font-weight="900" font-size="13" letter-spacing="2" fill="#1F2937" text-anchor="middle">THE SMITHS</text>
          <text x="100" y="125" font-family="'Cormorant Garamond', serif" font-style="italic" font-size="9" fill="#92400E" text-anchor="middle">"There is a light that never goes out"</text>
        </svg>
      `;

    case "crochet": // 10. Crochet bouquet
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="roseG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FDA4AF" />
              <stop offset="100%" stop-color="#E11D48" />
            </linearGradient>
            <linearGradient id="stemG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#86EFAC" />
              <stop offset="100%" stop-color="#15803D" />
            </linearGradient>
          </defs>
          <!-- Kraft paper cone -->
          <polygon points="100,150 70,85 130,85" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
          <path d="M 70 85 Q 100 95 130 85" fill="#FEF3C7" stroke="#D97706" stroke-width="2" />
          <!-- Stems -->
          <path d="M 90 90 L 80 50" stroke="url(#stemG)" stroke-width="3" stroke-linecap="round"/>
          <path d="M 100 90 L 100 40" stroke="url(#stemG)" stroke-width="3" stroke-linecap="round"/>
          <path d="M 110 90 L 120 50" stroke="url(#stemG)" stroke-width="3" stroke-linecap="round"/>
          <!-- Crochet Roses with stitch lines -->
          <circle cx="80" cy="50" r="18" fill="url(#roseG)" stroke="#BE123C" stroke-width="1.5" stroke-dasharray="3,2" />
          <circle cx="80" cy="50" r="10" fill="#FFE4E6" stroke="#E11D48" stroke-width="1.5" />
          <circle cx="120" cy="50" r="18" fill="#F472B6" stroke="#DB2777" stroke-width="1.5" stroke-dasharray="3,2" />
          <circle cx="120" cy="50" r="10" fill="#FDF2F8" stroke="#DB2777" stroke-width="1.5" />
          <circle cx="100" cy="35" r="22" fill="#FB7185" stroke="#E11D48" stroke-width="2" stroke-dasharray="3,2" />
          <circle cx="100" cy="35" r="12" fill="#FFE4E6" stroke="#E11D48" stroke-width="1.5" />
          <!-- Ribbon Bow -->
          <path d="M 95 105 Q 85 95 75 105 Q 90 115 100 110 Q 110 115 125 105 Q 115 95 105 105 Z" fill="#F43F5E" />
          <circle cx="100" cy="107" r="4" fill="#BE123C" />
        </svg>
      `;

    case "reasons_jar": // 11. Reasons jar
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Jar Lid -->
          <rect x="80" y="24" width="40" height="10" fill="#D97706" rx="3" />
          <rect x="75" y="34" width="50" height="6" fill="#F59E0B" rx="2" />
          <!-- Glass Jar Body -->
          <rect x="68" y="40" width="64" height="95" fill="rgba(238, 242, 255, 0.65)" stroke="#A5B4FC" stroke-width="2" rx="14" />
          <!-- Glass highlight -->
          <path d="M 74 48 L 74 125" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.8" />
          <!-- Little Colorful Folded Notes / Reasons Inside -->
          <rect x="78" y="105" width="20" height="15" fill="#FDA4AF" rx="3" transform="rotate(-15 88 112)" />
          <rect x="96" y="110" width="22" height="14" fill="#A78BFA" rx="3" transform="rotate(10 107 117)" />
          <rect x="82" y="85" width="22" height="16" fill="#FEF08A" rx="3" transform="rotate(8 93 93)" />
          <rect x="102" y="88" width="20" height="15" fill="#BAE6FD" rx="3" transform="rotate(-20 112 95)" />
          <rect x="88" y="65" width="22" height="14" fill="#BBF7D0" rx="3" transform="rotate(15 99 72)" />
          <!-- Twine string & Heart Tag -->
          <ellipse cx="100" cy="40" rx="28" ry="4" fill="none" stroke="#D97706" stroke-width="2" />
          <line x1="88" y1="42" x2="72" y2="60" stroke="#D97706" stroke-width="1.5" />
          <circle cx="72" cy="62" r="8" fill="#F43F5E" />
          <text x="72" y="66" font-size="9" fill="white" text-anchor="middle">❤</text>
        </svg>
      `;

    case "letter": // 12. Final Anniversary Letter
      return `
        <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Parchment Envelope & Wax Seal -->
          <rect x="45" y="35" width="110" height="75" fill="#FEF3C7" stroke="#D97706" stroke-width="2" rx="4" />
          <polygon points="45,35 100,75 155,35" fill="#FDE68A" stroke="#D97706" stroke-width="1.5" />
          <!-- Wax Seal -->
          <circle cx="100" cy="75" r="15" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
          <text x="100" y="79" font-family="'Playfair Display', serif" font-size="9" font-weight="bold" fill="#FEE2E2" text-anchor="middle">365</text>
          <!-- Stars & Love Heart Embers -->
          <text x="40" y="30" font-size="14" fill="#F59E0B">✦</text>
          <text x="155" y="30" font-size="14" fill="#F59E0B">✦</text>
          <text x="100" y="135" font-family="'Cormorant Garamond', serif" font-style="italic" font-size="12" fill="#991B1B" text-anchor="middle">The final piece of my heart</text>
        </svg>
      `;

    default:
      return `<div style="font-size:3rem;text-align:center;">✨</div>`;
  }
}

// ========================================================
// 8. PORTALS GRID & CARD RENDERING
// ========================================================
const portalsGrid = document.getElementById("portals-grid");
const trackerCounterText = document.getElementById("tracker-counter-text");
const trackerPercentageText = document.getElementById("tracker-percentage-text");
const trackerBarFill = document.getElementById("tracker-bar-fill");
const trackerStatusMessage = document.getElementById("tracker-status-message");
const headerProgressText = document.getElementById("header-progress-text");

function updateProgressUI() {
  const completedCount = appState.completedPortals.length;
  const percentage = Math.round((completedCount / 12) * 100);

  trackerCounterText.textContent = `${completedCount} of 12 portals unlocked`;
  trackerPercentageText.textContent = `${percentage}%`;
  trackerBarFill.style.width = `${percentage}%`;
  headerProgressText.textContent = `${completedCount} / 12 Unlocked`;

  if (completedCount === 0) {
    trackerStatusMessage.textContent = "✨ Tap any available portal below to read its riddle!";
  } else if (completedCount < 11) {
    trackerStatusMessage.textContent = `🌟 Wonderful! You've unlocked ${completedCount} surprise${completedCount > 1 ? 's' : ''}. Complete all 11 to reveal Portal 12!`;
  } else if (completedCount === 11) {
    trackerStatusMessage.textContent = "💖 Incredible! All 11 portals are complete! Portal 12 is now ready to open!";
  } else {
    trackerStatusMessage.textContent = "🎉 Happy 1st Anniversary! All 12 portals unlocked and our love letter is revealed!";
  }
}

function renderPortalsGrid() {
  portalsGrid.innerHTML = "";
  const filter = appState.currentFilter;

  PORTALS_DATA.forEach((portal) => {
    const lockStatus = getPortalLockStatus(portal);
    const isCompleted = lockStatus.isCompleted;
    const isLocked = lockStatus.isLocked;
    const isPortal12 = portal.id === 12;

    // Apply active filter
    if (filter === "unsolved" && isCompleted) return;
    if (filter === "completed" && !isCompleted) return;

    const card = document.createElement("div");
    card.className = "portal-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("data-portal-id", portal.id);

    let statusPillHtml = "";
    let orbContent = portal.icon;
    let teaserText = portal.teaser;

    if (isCompleted) {
      card.classList.add("completed");
      statusPillHtml = `<span class="portal-status-pill">Completed ✨ Tap to Review</span>`;
    } else if (isLocked) {
      card.classList.add("locked-portal");
      if (lockStatus.reason === "time_locked") {
        card.classList.add("time-locked");
        orbContent = "⏳";
        teaserText = `Unlocks at ${lockStatus.timeStr} on our anniversary schedule.`;
        statusPillHtml = `<span class="portal-status-pill countdown-pill" data-portal-id="${portal.id}">🔒 Unlocks at ${lockStatus.timeStr} <span class="countdown-ticker">(${lockStatus.countdown})</span></span>`;
      } else {
        orbContent = "🔒";
        if (isPortal12) {
          teaserText = "Complete Portals 01–11 to unlock the final emotional secret.";
        } else {
          teaserText = `Solve Portal ${String(portal.id - 1).padStart(2, "0")} to unlock this gateway.`;
        }
        statusPillHtml = `<span class="portal-status-pill">🔒 ${lockStatus.message}</span>`;
      }
    } else {
      card.classList.add("available");
      if (isPortal12) {
        card.classList.add("final-portal-unlocked");
        statusPillHtml = `<span class="portal-status-pill">🌟 Tap to Open Finale! 💌</span>`;
      } else {
        statusPillHtml = `<span class="portal-status-pill">Tap to Unlock 🗝️</span>`;
      }
    }

    card.innerHTML = `
      <div class="portal-card-top">
        <span class="portal-id-tag">PORTAL ${portal.portalNumber}</span>
        <span class="portal-top-sparkle">✦</span>
      </div>

      <div class="portal-gateway-visual">
        <div class="portal-ring-outer"></div>
        <div class="portal-ring-inner"></div>
        <div class="portal-orb">
          ${orbContent}
        </div>
      </div>

      <h3 class="portal-card-title">${portal.portalTitle}</h3>
      <p class="portal-card-teaser">${teaserText}</p>

      ${statusPillHtml}
    `;

    // Click & Keyboard interactions
    const handleCardClick = () => onPortalCardClicked(portal);
    card.addEventListener("click", handleCardClick);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick();
      }
    });

    portalsGrid.appendChild(card);
  });
}

function onPortalCardClicked(portal) {
  playClickSound();

  const lockStatus = getPortalLockStatus(portal);

  // Case 1: Already completed -> Open Gift Reveal modal directly so he can admire it anytime
  if (lockStatus.isCompleted) {
    if (portal.id === 12) {
      openFinalLetterExperience();
    } else {
      openRevealModal(portal);
    }
    return;
  }

  // Case 2: Locked (either time locked or sequential locked)
  if (lockStatus.isLocked) {
    playIncorrectTone();
    showToastNotification(lockStatus.toast || "🔒 This portal is currently locked!");
    return;
  }

  // Case 3: Available to solve -> Open Riddle Modal!
  openRiddleModal(portal);
}

// Live 1-second countdown ticker for time-locked portals
function tickPortalCountdowns() {
  if (!appState.isAuthenticated) return;

  let needsRerender = false;
  PORTALS_DATA.forEach((portal) => {
    if (isPortalCompleted(portal.id)) return;

    const portalIndex = portal.id - 1;
    const isNowTimeUnlocked = isPortalTimeUnlocked(portalIndex);
    const pill = document.querySelector(`.countdown-pill[data-portal-id="${portal.id}"]`);

    if (pill) {
      if (isNowTimeUnlocked) {
        needsRerender = true;
      } else {
        const remaining = getPortalTimeRemaining(portalIndex);
        const ticker = pill.querySelector(".countdown-ticker");
        if (ticker && remaining) {
          ticker.textContent = `(${remaining})`;
        }
      }
    } else {
      // Check if a portal previously waiting is now available
      const status = getPortalLockStatus(portal);
      if (!status.isLocked) {
        const card = document.querySelector(`.portal-card[data-portal-id="${portal.id}"]`);
        if (card && card.classList.contains("locked-portal")) {
          needsRerender = true;
        }
      }
    }
  });

  if (needsRerender) {
    renderPortalsGrid();
  }
}

setInterval(tickPortalCountdowns, 1000);

// Simple romantic toast notification helper
function showToastNotification(message) {
  const existing = document.getElementById("toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast-notification";
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: #2C182E;
    color: #FFF;
    padding: 0.85rem 1.6rem;
    border-radius: 9999px;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: opacity 0.3s ease;
    animation: fadeIn 0.3s ease-out;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ========================================================
// 9. RIDDLE MODAL CONTROLLER & ANSWER VALIDATION
// ========================================================
const riddleModal = document.getElementById("riddle-modal");
const riddleModalClose = document.getElementById("riddle-modal-close");
const riddlePortalBadge = document.getElementById("riddle-portal-badge");
const riddleVisualEmblem = document.getElementById("riddle-visual-emblem");
const riddleText = document.getElementById("riddle-text");
const riddleForm = document.getElementById("riddle-form");
const riddleAnswerInput = document.getElementById("riddle-answer-input");
const riddleFeedback = document.getElementById("riddle-feedback");
const btnToggleHint = document.getElementById("btn-toggle-hint");
const hintDrawer = document.getElementById("hint-drawer");
const hintCaret = document.getElementById("hint-caret");
const hintText = document.getElementById("hint-text");

let currentRiddlePortal = null;

function openRiddleModal(portal) {
  currentRiddlePortal = portal;
  appState.currentOpenPortalId = portal.id;

  riddlePortalBadge.textContent = `PORTAL ${portal.portalNumber}`;
  riddleText.textContent = portal.riddle;
  hintText.textContent = portal.hint;

  // Render visual emblem
  riddleVisualEmblem.innerHTML = getGiftSvgIllustration(portal);

  // Reset form
  riddleAnswerInput.value = "";
  riddleFeedback.textContent = "";
  riddleFeedback.className = "feedback-msg";
  hintDrawer.classList.remove("open");
  hintCaret.classList.remove("open");

  riddleModal.classList.add("active");
  riddleModal.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    riddleAnswerInput.focus();
  }, 200);
}

function closeRiddleModal() {
  riddleModal.classList.remove("active");
  riddleModal.setAttribute("aria-hidden", "true");
  currentRiddlePortal = null;
}

riddleModalClose.addEventListener("click", closeRiddleModal);
riddleModal.addEventListener("click", (e) => {
  if (e.target === riddleModal) closeRiddleModal();
});

// Hint Toggle
btnToggleHint.addEventListener("click", () => {
  const isOpen = hintDrawer.classList.toggle("open");
  hintCaret.classList.toggle("open", isOpen);
  playClickSound();
});

// Answer Validation Logic
function normalizeAnswerString(str) {
  if (!str) return "";
  return str
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, ""); // removes hyphens, spaces, punctuation
}

function checkAnswer() {
  if (!currentRiddlePortal) return;

  const rawInput = riddleAnswerInput.value;
  const normalizedInput = normalizeAnswerString(rawInput);

  if (!normalizedInput) {
    riddleFeedback.textContent = "Please enter an answer to unlock this portal!";
    riddleFeedback.className = "feedback-msg error";
    riddleAnswerInput.focus();
    return;
  }

  // Check against canonical answer and all accepted variations
  const isMatch = currentRiddlePortal.acceptedAnswers.some((variant) => {
    return normalizeAnswerString(variant) === normalizedInput;
  });

  if (isMatch) {
    // CORRECT ANSWER!
    playSuccessChime();
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);

    riddleFeedback.textContent = "✨ Correct! Unlocking portal...";
    riddleFeedback.className = "feedback-msg success";

    const solvedPortal = currentRiddlePortal;
    markPortalCompleted(solvedPortal.id);
    updateProgressUI();
    renderPortalsGrid();

    // Transition smoothly to gift reveal modal or final letter after brief delay
    setTimeout(() => {
      closeRiddleModal();
      if (solvedPortal.id === 12) {
        openFinalLetterExperience();
      } else {
        openRevealModal(solvedPortal);
      }
    }, 900);

  } else {
    // INCORRECT ANSWER
    playIncorrectTone();
    riddleFeedback.textContent = "Not quite, my love! Think a little deeper and try again. 💕";
    riddleFeedback.className = "feedback-msg error";
    riddleAnswerInput.select();
  }
}

riddleForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkAnswer();
});

// ========================================================
// 10. GIFT REVEAL MODAL CONTROLLER
// ========================================================
const revealModal = document.getElementById("reveal-modal");
const revealModalClose = document.getElementById("reveal-modal-close");
const revealPortalId = document.getElementById("reveal-portal-id");
const revealGiftTitle = document.getElementById("reveal-gift-title");
const revealMediaContainer = document.getElementById("reveal-media-container");
const revealMessageText = document.getElementById("reveal-message-text");
const revealPhysicalNote = document.getElementById("reveal-physical-note");
const revealArrivingNote = document.getElementById("reveal-arriving-note");
const revealArrivingText = document.getElementById("reveal-arriving-text");
const btnRevealBack = document.getElementById("btn-reveal-back");
const btnRevealNext = document.getElementById("btn-reveal-next");

let currentRevealPortal = null;

function openRevealModal(portal) {
  currentRevealPortal = portal;

  revealPortalId.textContent = `PORTAL ${portal.portalNumber}`;
  revealGiftTitle.textContent = portal.giftName;
  revealMessageText.textContent = portal.revealMessage;

  // Arriving Soon vs Regular Physical vs Digital footnote
  if (portal.isArrivingSoon) {
    if (revealArrivingNote) revealArrivingNote.style.display = "flex";
    if (revealArrivingText) revealArrivingText.innerHTML = portal.arrivingSoonText;
    if (revealPhysicalNote) revealPhysicalNote.style.display = "none";
  } else if (portal.isPhysical) {
    if (revealArrivingNote) revealArrivingNote.style.display = "none";
    if (revealPhysicalNote) revealPhysicalNote.style.display = "flex";
  } else {
    if (revealArrivingNote) revealArrivingNote.style.display = "none";
    if (revealPhysicalNote) revealPhysicalNote.style.display = "none";
  }

  // Media: Check for custom user image, fallback seamlessly to custom SVG illustration
  revealMediaContainer.innerHTML = "";
  const img = new Image();
  img.src = portal.imagePath;
  img.alt = portal.giftName;

  img.onload = () => {
    revealMediaContainer.innerHTML = "";
    revealMediaContainer.appendChild(img);
  };

  img.onerror = () => {
    // Fallback to custom SVG illustration
    revealMediaContainer.innerHTML = `<div class="reveal-svg-illustration">${getGiftSvgIllustration(portal)}</div>`;
  };

  // Setup Next button
  const nextUnsolved = getNextAvailablePortal(portal.id);
  if (nextUnsolved) {
    btnRevealNext.style.display = "inline-flex";
    btnRevealNext.querySelector("span").textContent = `Portal ${nextUnsolved.portalNumber} →`;
  } else {
    // If all are completed or only portal 12 left
    if (isPortal12Unlocked() && !isPortalCompleted(12)) {
      btnRevealNext.style.display = "inline-flex";
      btnRevealNext.querySelector("span").textContent = "Portal 12 (Final) →";
    } else {
      btnRevealNext.style.display = "none";
    }
  }

  revealModal.classList.add("active");
  revealModal.setAttribute("aria-hidden", "false");
}

function closeRevealModal() {
  revealModal.classList.remove("active");
  revealModal.setAttribute("aria-hidden", "true");
  currentRevealPortal = null;
}

revealModalClose.addEventListener("click", closeRevealModal);
btnRevealBack.addEventListener("click", () => {
  playClickSound();
  closeRevealModal();
});

btnRevealNext.addEventListener("click", () => {
  playClickSound();
  if (!currentRevealPortal) return;

  const currentId = currentRevealPortal.id;
  closeRevealModal();

  setTimeout(() => {
    const nextPortal = getNextAvailablePortal(currentId);
    if (nextPortal) {
      onPortalCardClicked(nextPortal);
    } else if (isPortal12Unlocked() && !isPortalCompleted(12)) {
      onPortalCardClicked(PORTALS_DATA[11]);
    }
  }, 250);
});

revealModal.addEventListener("click", (e) => {
  if (e.target === revealModal) closeRevealModal();
});

function getNextAvailablePortal(currentId) {
  // First search forward
  for (let i = currentId + 1; i <= 11; i++) {
    const p = PORTALS_DATA.find((item) => item.id === i);
    if (p && !isPortalCompleted(p.id)) return p;
  }
  // Then wrap around from 1
  for (let i = 1; i < currentId; i++) {
    const p = PORTALS_DATA.find((item) => item.id === i);
    if (p && !isPortalCompleted(p.id)) return p;
  }
  return null;
}

// ========================================================
// 11. MODAL 3: FINAL ANNIVERSARY LETTER (PORTAL 12 EXPERIENCE)
// ========================================================
const finalLetterOverlay = document.getElementById("final-letter-overlay");
const finalOverlayClose = document.getElementById("final-overlay-close");
const finalIntroView = document.getElementById("final-intro-view");
const unfoldedLetterView = document.getElementById("unfolded-letter-view");
const envelopeBox = document.getElementById("envelope-box");
const waxSeal = document.getElementById("wax-seal");
const letterSalutation = document.getElementById("letter-salutation");
const letterBody = document.getElementById("letter-body");
const letterSignature = document.getElementById("letter-signature");
const letterDate = document.getElementById("letter-date");
const btnViewAllGiftsSummary = document.getElementById("btn-view-all-gifts-summary");
const btnReturnHome = document.getElementById("btn-return-home");

function populateLetterContent() {
  letterSalutation.textContent = LETTER_CONFIG.salutation;
  letterSignature.textContent = LETTER_CONFIG.signature;
  letterDate.textContent = LETTER_CONFIG.date;

  letterBody.innerHTML = "";
  LETTER_CONFIG.paragraphs.forEach((p) => {
    const pEl = document.createElement("p");
    pEl.textContent = p;
    letterBody.appendChild(pEl);
  });
}

function openFinalLetterExperience() {
  populateLetterContent();

  // If already opened previously, jump straight to unfolded letter, or let them open it again
  envelopeBox.classList.remove("opened");
  unfoldedLetterView.classList.add("hidden");
  finalIntroView.style.display = "flex";

  finalLetterOverlay.classList.add("active");
  finalLetterOverlay.setAttribute("aria-hidden", "false");
}

function closeFinalLetterExperience() {
  finalLetterOverlay.classList.remove("active");
  finalLetterOverlay.setAttribute("aria-hidden", "true");
}

finalOverlayClose.addEventListener("click", () => {
  playClickSound();
  closeFinalLetterExperience();
});

// Interactive Wax Seal & Envelope Click
envelopeBox.addEventListener("click", () => {
  if (envelopeBox.classList.contains("opened")) return;

  playEnvelopeOpenChime();
  triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45);

  envelopeBox.classList.add("opened");

  // After 3D unfold animation, show the grand parchment letter
  setTimeout(() => {
    finalIntroView.style.display = "none";
    unfoldedLetterView.classList.remove("hidden");
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.35);
  }, 1100);
});

envelopeBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    envelopeBox.click();
  }
});

btnReturnHome.addEventListener("click", () => {
  playClickSound();
  closeFinalLetterExperience();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

btnViewAllGiftsSummary.addEventListener("click", () => {
  playClickSound();
  openSummaryModal();
});

// ========================================================
// 12. MODAL 4: 12 GIFTS SUMMARY / TREASURE BOX
// ========================================================
const summaryModal = document.getElementById("summary-modal");
const summaryModalClose = document.getElementById("summary-modal-close");
const summaryList = document.getElementById("summary-list");
const btnSummaryDone = document.getElementById("btn-summary-done");

function openSummaryModal() {
  summaryList.innerHTML = "";

  PORTALS_DATA.forEach((portal) => {
    const isCompleted = isPortalCompleted(portal.id);
    const item = document.createElement("div");
    item.className = "summary-item";

    item.innerHTML = `
      <div class="summary-item-left">
        <span class="summary-item-icon">${portal.icon}</span>
        <div>
          <div class="summary-item-title">Portal ${portal.portalNumber}: ${portal.giftName}</div>
          <div class="summary-item-category">${isCompleted ? "Unlocked ✨" : "Not yet unlocked 🔒"}</div>
        </div>
      </div>
      <div>
        ${isCompleted ? '<span style="color:#059669;font-weight:700;">✓</span>' : '<span style="color:#9CA3AF;">🔒</span>'}
      </div>
    `;

    // Click item to view reveal if completed
    if (isCompleted) {
      item.style.cursor = "pointer";
      item.addEventListener("click", () => {
        closeSummaryModal();
        openRevealModal(portal);
      });
    }

    summaryList.appendChild(item);
  });

  summaryModal.classList.add("active");
  summaryModal.setAttribute("aria-hidden", "false");
}

function closeSummaryModal() {
  summaryModal.classList.remove("active");
  summaryModal.setAttribute("aria-hidden", "true");
}

summaryModalClose.addEventListener("click", closeSummaryModal);
btnSummaryDone.addEventListener("click", closeSummaryModal);
summaryModal.addEventListener("click", (e) => {
  if (e.target === summaryModal) closeSummaryModal();
});

// ========================================================
// 13. DEVELOPER & TESTING CONTROLS (HIDDEN / DISCRETE)
// ========================================================
const devModal = document.getElementById("dev-modal");
const devModalClose = document.getElementById("dev-modal-close");
const footerDevBtn = document.getElementById("footer-dev-btn");
const btnDevUnlockAll11 = document.getElementById("btn-dev-unlock-all-11");
const btnDevSolveAll12 = document.getElementById("btn-dev-solve-all-12");
const btnDevResetProgress = document.getElementById("btn-dev-reset-progress");
const devPortalsPicker = document.getElementById("dev-portals-picker");
const devAnswersTbody = document.getElementById("dev-answers-tbody");

function openDevModal() {
  updateDevTimeToggleUI();
  renderDevPortalsPicker();
  renderDevAnswersTable();
  devModal.classList.add("active");
  devModal.setAttribute("aria-hidden", "false");
}

function closeDevModal() {
  devModal.classList.remove("active");
  devModal.setAttribute("aria-hidden", "true");
}

footerDevBtn.addEventListener("click", openDevModal);
devModalClose.addEventListener("click", closeDevModal);
devModal.addEventListener("click", (e) => {
  if (e.target === devModal) closeDevModal();
});

// Keyboard shortcut: Ctrl + Shift + D (or Alt + D) to trigger testing mode
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") || (e.altKey && e.key.toLowerCase() === "d")) {
    e.preventDefault();
    if (devModal.classList.contains("active")) {
      closeDevModal();
    } else {
      openDevModal();
    }
  }
  // Esc key closes any open modal
  if (e.key === "Escape") {
    closeRiddleModal();
    closeRevealModal();
    closeFinalLetterExperience();
    closeSummaryModal();
    closeDevModal();
  }
});

function renderDevPortalsPicker() {
  devPortalsPicker.innerHTML = "";
  PORTALS_DATA.forEach((portal) => {
    const isCompleted = isPortalCompleted(portal.id);
    const btn = document.createElement("button");
    btn.className = `dev-portal-btn ${isCompleted ? "completed" : ""}`;
    btn.textContent = `Portal ${portal.portalNumber} (${portal.answer})`;
    btn.title = `Jump to Portal ${portal.portalNumber}`;

    btn.addEventListener("click", () => {
      closeDevModal();
      onPortalCardClicked(portal);
    });

    devPortalsPicker.appendChild(btn);
  });
}

function renderDevAnswersTable() {
  devAnswersTbody.innerHTML = "";
  PORTALS_DATA.forEach((portal) => {
    const isCompleted = isPortalCompleted(portal.id);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${portal.portalNumber}</td>
      <td><strong>${portal.giftName}</strong></td>
      <td><code>${portal.answer}</code></td>
      <td>${isCompleted ? "✅ Completed" : "⏳ Pending"}</td>
    `;
    devAnswersTbody.appendChild(row);
  });
}

// Dev Action: Unlock all 11
btnDevUnlockAll11.addEventListener("click", () => {
  appState.completedPortals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  saveState();
  updateProgressUI();
  renderPortalsGrid();
  renderDevPortalsPicker();
  renderDevAnswersTable();
  showToastNotification("✨ Portals 01–11 unlocked! Portal 12 is now accessible.");
});

// Dev Action: Solve all 12
btnDevSolveAll12.addEventListener("click", () => {
  appState.completedPortals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  saveState();
  updateProgressUI();
  renderPortalsGrid();
  closeDevModal();
  openFinalLetterExperience();
  showToastNotification("🎉 All 12 portals completed! Opening the anniversary letter.");
});

// Dev Action: Reset
btnDevResetProgress.addEventListener("click", () => {
  if (confirm("Reset all progress back to 0? This will lock all portals.")) {
    appState.completedPortals = [];
    saveState();
    updateProgressUI();
    renderPortalsGrid();
    renderDevPortalsPicker();
    renderDevAnswersTable();
    showToastNotification("🔄 Progress reset to 0%.");
  }
});

// Dev Action: Relock
const btnDevRelock = document.getElementById("btn-dev-relock");
if (btnDevRelock) {
  btnDevRelock.addEventListener("click", () => {
    closeDevModal();
    relockWebsite();
  });
}

// Dev Action: Toggle Time Bypass
const btnDevToggleTime = document.getElementById("btn-dev-toggle-time");
const btnDevToggleTimeText = document.getElementById("btn-dev-toggle-time-text");

function updateDevTimeToggleUI() {
  if (btnDevToggleTimeText) {
    btnDevToggleTimeText.textContent = SCHEDULE_CONFIG.bypassTimeLocks
      ? "⏱️ Bypass Time Locks: ON (Click for Hourly)"
      : "⏱️ Bypass Time Locks: OFF (Click to Bypass)";
  }
}

if (btnDevToggleTime) {
  btnDevToggleTime.addEventListener("click", () => {
    SCHEDULE_CONFIG.bypassTimeLocks = !SCHEDULE_CONFIG.bypassTimeLocks;
    localStorage.setItem("anniversary_bypass_timelocks", String(SCHEDULE_CONFIG.bypassTimeLocks));
    updateDevTimeToggleUI();
    renderPortalsGrid();
    updateProgressUI();
    renderDevPortalsPicker();
    renderDevAnswersTable();
    showToastNotification(SCHEDULE_CONFIG.bypassTimeLocks
      ? "⚡ Time locks BYPASSED! All portals unlocked for instant testing."
      : "⏱️ Hourly schedule RESTORED! (Unlocking every hour from 9:00 AM)"
    );
  });
}

// ========================================================
// 14. UI FILTER BUTTONS & SOUND TOGGLE
// ========================================================
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    playClickSound();
    filterButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    appState.currentFilter = btn.getAttribute("data-filter");
    renderPortalsGrid();
  });
});

const audioToggleBtn = document.getElementById("audio-toggle-btn");
const audioIcon = document.getElementById("audio-icon");
const audioLabel = document.getElementById("audio-label");

function updateAudioUI() {
  if (appState.soundEnabled) {
    audioIcon.textContent = "🔔";
    audioLabel.textContent = "Sound On";
    audioToggleBtn.title = "Click to mute sound";
  } else {
    audioIcon.textContent = "🔕";
    audioLabel.textContent = "Sound Off";
    audioToggleBtn.title = "Click to enable sound";
  }
}

audioToggleBtn.addEventListener("click", () => {
  appState.soundEnabled = !appState.soundEnabled;
  saveState();
  updateAudioUI();
  if (appState.soundEnabled) {
    initAudio();
    playSuccessChime();
  }
});

// Hero CTA Button
document.getElementById("btn-start-adventure").addEventListener("click", () => {
  playClickSound();
  const portalsSection = document.getElementById("portals-section");
  portalsSection.scrollIntoView({ behavior: "smooth" });
});

// Header quick pill scrolls to portals
document.getElementById("header-progress-pill").addEventListener("click", () => {
  playClickSound();
  const portalsSection = document.getElementById("portals-section");
  portalsSection.scrollIntoView({ behavior: "smooth" });
});

// ========================================================
// 15. ROMANTIC GATEKEEPER LOGIN CONTROLLER ("Cookie" & "animini")
// ========================================================
const loginOverlay = document.getElementById("login-overlay");
const loginForm = document.getElementById("login-form");
const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");
const loginFeedback = document.getElementById("login-feedback");
const btnTogglePwd = document.getElementById("btn-toggle-pwd");
const btnHintUsername = document.getElementById("btn-hint-username");
const btnHintPassword = document.getElementById("btn-hint-password");
const hintBoxUsername = document.getElementById("hint-box-username");
const hintBoxPassword = document.getElementById("hint-box-password");
const headerUserBtn = document.getElementById("header-user-btn");

function updateAuthUI() {
  if (appState.isAuthenticated) {
    if (loginOverlay) loginOverlay.classList.add("hidden");
    if (headerUserBtn) headerUserBtn.style.display = "inline-flex";
  } else {
    if (loginOverlay) {
      loginOverlay.classList.remove("hidden");
      loginOverlay.classList.remove("fade-out");
    }
    if (headerUserBtn) headerUserBtn.style.display = "none";
  }
}

function handleLoginSubmit() {
  const username = (loginUsernameInput.value || "").trim().toLowerCase();
  const password = (loginPasswordInput.value || "").trim().toLowerCase();

  const isUserCorrect = username === "cookie";
  const isPassCorrect = password === "animini";

  if (isUserCorrect && isPassCorrect) {
    playSuccessChime();
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45);

    loginFeedback.textContent = "✨ animini! Welcome home, my Cookie! Opening our universe...";
    loginFeedback.className = "login-feedback success";

    appState.isAuthenticated = true;
    saveState();

    setTimeout(() => {
      loginOverlay.classList.add("fade-out");
      setTimeout(() => {
        updateAuthUI();
        showToastNotification("💖 Welcome home, Cookie! Happy 1st Anniversary!");
      }, 500);
    }, 600);

  } else {
    playIncorrectTone();
    loginFeedback.className = "login-feedback error";

    if (!isUserCorrect && !isPassCorrect) {
      loginFeedback.textContent = "Almost! Check both hints above, my love... 💕";
    } else if (!isUserCorrect) {
      loginFeedback.textContent = "Almost, my love! What sweet baked treat do I always call you? 🍪";
      hintBoxUsername.classList.remove("hidden");
      loginUsernameInput.focus();
    } else {
      loginFeedback.textContent = "Not quite! What is our special magic word for 'I love you'? (Hint: a-n-i...) 💕";
      hintBoxPassword.classList.remove("hidden");
      loginPasswordInput.focus();
    }
  }
}

function relockWebsite() {
  appState.isAuthenticated = false;
  saveState();
  if (loginUsernameInput) loginUsernameInput.value = "";
  if (loginPasswordInput) loginPasswordInput.value = "";
  if (loginFeedback) {
    loginFeedback.textContent = "";
    loginFeedback.className = "login-feedback";
  }
  if (hintBoxUsername) hintBoxUsername.classList.add("hidden");
  if (hintBoxPassword) hintBoxPassword.classList.add("hidden");
  updateAuthUI();
  showToastNotification("🔒 Website relocked. Returning to Cookie's gatekeeper screen.");
}

// Event Listeners for Login
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleLoginSubmit();
  });
}

if (btnTogglePwd) {
  btnTogglePwd.addEventListener("click", () => {
    playClickSound();
    const type = loginPasswordInput.getAttribute("type") === "password" ? "text" : "password";
    loginPasswordInput.setAttribute("type", type);
    btnTogglePwd.textContent = type === "password" ? "👁️" : "🙈";
  });
}

if (btnHintUsername) {
  btnHintUsername.addEventListener("click", () => {
    playClickSound();
    hintBoxUsername.classList.toggle("hidden");
  });
}

if (btnHintPassword) {
  btnHintPassword.addEventListener("click", () => {
    playClickSound();
    hintBoxPassword.classList.toggle("hidden");
  });
}

if (headerUserBtn) {
  headerUserBtn.addEventListener("click", () => {
    playClickSound();
    if (confirm("Lock the website and return to the login screen?")) {
      relockWebsite();
    }
  });
}

// ========================================================
// 16. INITIALIZATION
// ========================================================
window.addEventListener("DOMContentLoaded", () => {
  loadState();
  initParticles();
  animateParticles();
  updateAudioUI();
  updateAuthUI();
  updateProgressUI();
  renderPortalsGrid();

  // Resume AudioContext on first user interaction anywhere
  const resumeAudioOnFirstClick = () => {
    initAudio();
    document.removeEventListener("pointerdown", resumeAudioOnFirstClick);
  };
  document.addEventListener("pointerdown", resumeAudioOnFirstClick);
});
