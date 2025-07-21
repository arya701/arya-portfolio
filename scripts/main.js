const text = "Hi, I'm Arya.";
const speed = 100; // typing speed in ms
let i = 0;

const typedText = document.getElementById("typed-text");

// Sound setup
const audio = new Audio("sounds/type.mp3");
audio.load()

function typeWriter() {
  if (i < text.length) {
    typedText.innerHTML += text.charAt(i);
    audio.currentTime = 0; // rewind
    audio.play();          // play sound
    i++;
    setTimeout(typeWriter, speed);
  } else {
    // stop the sound if it's still playing
    audio.pause();
    audio.volume = 1
    audio.currentTime = 0;
  }
}

window.onload = typeWriter;

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


const jiji = document.getElementById("jiji");
const meowSound = document.getElementById("meow-sound");

jiji.addEventListener("mouseenter", () => {
  meowSound.currentTime = 0;
  meowSound.play();
});

jiji.addEventListener("mouseleave", () => {
  meowSound.pause();
  meowSound.currentTime = 0;
});

const sootZone = document.getElementById("soot-sprite-zone");

const sootImages = [
  "images/soot1.png",
  "images/soot2.png",
  "images/soot3.png",
  "images/soot4.png",
  "images/soot5.png" // or whatever you got
];

function createSootSprite() {
  const sprite = document.createElement("img");

  // Pick a random soot sprite image
  const randomIndex = Math.floor(Math.random() * sootImages.length);
  sprite.src = sootImages[randomIndex];

  sprite.classList.add("soot-sprite");

  // Random start position
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;

  sprite.style.left = `${startX}px`;
  sprite.style.top = `${startY}px`;

  // Random end movement
  const moveX = (Math.random() - 0.5) * 600 + "px";
  const moveY = (Math.random() - 0.5) * 600 + "px";
  sprite.style.setProperty('--x', moveX);
  sprite.style.setProperty('--y', moveY);
  sprite.style.animation = `scuttle 1.8s forwards`;

  sootZone.appendChild(sprite);

  // Remove the sprite after animation
  setTimeout(() => {
  sprite.classList.add("poof-out");

  // wait for poof animation to finish before removing
  setTimeout(() => {
    sprite.remove();
  }, 400); // match the poof duration
}, 1800); // after the scuttle finishes

}

let lastScrollY = 0;
let lastSpawn = 0;

window.addEventListener("scroll", () => {
  const now = window.scrollY;
  const currentTime = Date.now();

  // Only spawn if 300ms have passed since the last one
  if (Math.abs(now - lastScrollY) > 30 && currentTime - lastSpawn > 1200) {
    createSootSprite();
    lastScrollY = now;
    lastSpawn = currentTime;
  }
});
