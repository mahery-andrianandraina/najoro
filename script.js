const card = document.getElementById("card");

const audio = document.getElementById("birthdayAudio");
const soundBtn = document.getElementById("soundBtn");

const bgHearts = document.querySelector(".bg-hearts");
const layer = document.getElementById("falling-layer");

const giftBoxes = document.querySelectorAll(".gift-box");

let playing = false;

/* ✅ Flip card */
card.addEventListener("click", () => {
  card.classList.toggle("open");
});

/* ✅ Music toggle */
soundBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!playing) {
    audio.play();
    soundBtn.textContent = "🔇 Couper la musique";
    playing = true;
  } else {
    audio.pause();
    soundBtn.textContent = "🎶 Activer la musique";
    playing = false;
  }
});

/* ✅ Random helper */
function random(min, max){
  return Math.random() * (max - min) + min;
}

/* ✅ Vibration mobile */
function vibratePhone(ms = 80){
  if (navigator.vibrate) navigator.vibrate(ms);
}

/* ✅ Background floating hearts */
setInterval(() => {
  createHeart();
}, 450);

function createHeart(){
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  heart.style.opacity = (0.5 + Math.random() * 0.5);

  bgHearts.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

/* ✅ Rain mix */
function rainMix(count = 40){
  for(let i = 0; i < count; i++){
    createRandomFall();
  }
}

function createRandomFall(){
  const types = ["confetti", "heart", "star", "petal", "gift"];
  const type = types[Math.floor(Math.random() * types.length)];

  const el = document.createElement("div");
  el.classList.add("fall", type);

  el.style.left = random(0, 100) + "vw";
  el.style.animationDuration = random(3, 7) + "s";
  el.style.animationDelay = random(0, 1.5) + "s";

  if(type === "confetti"){
    const colors = ["#ff146d","#ffcc00","#00c2ff","#00ff6a","#ffffff"];
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = el.style.height = random(6, 10) + "px";
  }

  if(type === "star"){
    el.textContent = "⭐";
    el.style.fontSize = random(16, 22) + "px";
  }

  if(type === "petal"){
    el.textContent = "🌸";
    el.style.fontSize = random(18, 26) + "px";
  }

  if(type === "gift"){
    el.textContent = "🎁";
    el.style.fontSize = random(18, 30) + "px";
  }

  layer.appendChild(el);
  setTimeout(() => el.remove(), 8000);
}

/* ✅ Auto soft rain */
setInterval(() => {
  if(Math.random() > 0.65){
    rainMix(6);
  }
}, 2000);

/* ✅ Firework */
function createFirework(x, y){
  const fw = document.createElement("div");
  fw.className = "firework";
  fw.style.left = x + "px";
  fw.style.top = y + "px";

  const colors = ["#ff146d", "#ffcc00", "#00c2ff", "#00ff6a", "#ffffff", "#8a2be2"];
  fw.style.background = colors[Math.floor(Math.random() * colors.length)];

  document.body.appendChild(fw);
  setTimeout(() => fw.remove(), 900);
}

/* ✅ Shooting Stars */
function shootingStar(){
  const star = document.createElement("div");
  star.className = "shooting-star";
  star.style.left = random(0, 60) + "vw";
  star.style.top = random(0, 40) + "vh";
  star.style.opacity = random(0.6, 1);

  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1000);
}

function shootingRain(count = 8){
  for(let i=0; i<count; i++){
    setTimeout(() => shootingStar(), i * 180);
  }
}

/* 💖 Messages d’amour */
const loveMessages = {
  love: [
    "💖 Najoro Hervé, te connaître est le plus beau cadeau que cette année m’ait offert ✨"
   
  ],
  firework: [
    "🌹 Tu es la plus belle surprise de mon année 💝"
  ],
  stars: [
   "💝 Tu es précieux, et je te souhaite tout le bonheur du monde 🌸",

  ],
  gifts: [
    "🌹 Je suis fier de toi et heureux de te connaître ❤️"
  ]
};


function getRandomLoveMessage(type){
  const list = loveMessages[type] || loveMessages.love;
  return list[Math.floor(Math.random() * list.length)];
}

/* ✅ Popup love message */
function showLoveMessage(text){
  const popup = document.createElement("div");
  popup.className = "love-message";
  popup.innerHTML = text;

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 3200);
}

/* ✅ Gift Boxes actions */
giftBoxes.forEach(box => {
  box.addEventListener("click", (e) => {
    e.stopPropagation();

    if(box.classList.contains("open")) return;
    box.classList.add("open");

    vibratePhone(120);

    const type = box.dataset.type;
    const msg = getRandomLoveMessage(type);
    showLoveMessage(msg);

    // Effets
    if(type === "love") rainMix(30);
    if(type === "firework") {
      for(let i=0;i<7;i++){
        setTimeout(()=>createFirework(random(80, window.innerWidth-80), random(120, window.innerHeight-120)), i*120);
      }
    }
    if(type === "stars") shootingRain(10);
    if(type === "gifts") rainMix(70);

    // ✅ Fermer la boîte après 3 secondes pour pouvoir réouvrir
    setTimeout(() => box.classList.remove("open"), 1000);
  });
});
const openTap = document.getElementById("openTap");

openTap.addEventListener("click", async (e) => {
  e.stopPropagation(); // évite double clic sur la carte

  // ✅ ouvrir la carte
  card.classList.add("open");

  // ✅ lancer la musique
  try {
    await audio.play();
    soundBtn.textContent = "🔇 Couper la musique";
    playing = true;
  } catch (err) {
    console.log("Audio bloqué par navigateur:", err);
  }
});
