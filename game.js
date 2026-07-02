// Sound Effects System using Web Audio API
class AudioSystem {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playJump() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'triangle';
        // Frequency sweep from 150Hz to 450Hz
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }

    playSpring() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        // Quick futuristic sweep
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.35);
    }

    playBreak() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        // Quick buzz sliding down to simulate cracking
        osc.frequency.setValueAtTime(120, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(40, this.ctx.currentTime + 0.12);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
    }

    playCollect() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Double tone (C5 then E5)
        const playTone = (freq, start, duration) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);
            
            gain.gain.setValueAtTime(0.15, start);
            gain.gain.linearRampToValueAtTime(0.01, start + duration);
            
            osc.start(start);
            osc.stop(start + duration);
        };

        playTone(523.25, now, 0.08); // C5
        playTone(659.25, now + 0.08, 0.12); // E5
    }

    playGameOver() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        // Downward sad pitch bend
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.6);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.6);
    }

    playClick() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }
}

const audio = new AudioSystem();

// Character Skins Definition
const SKINS = [
    {
        id: 'astro_classic',
        name: 'Astro Clássico',
        color: '#8a2be2', // Purple main
        accent: '#00e5ff', // Neon Cyan
        draw: (ctx, x, y, width, height, facingLeft, squashX, squashY) => {
            ctx.save();
            ctx.translate(x + width/2, y + height/2);
            ctx.scale(squashX, squashY);

            // Antenna
            ctx.beginPath();
            ctx.moveTo(0, -height/2);
            ctx.lineTo(0, -height/2 - 12);
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, -height/2 - 12, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#00e5ff';
            ctx.fill();
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Body (Alien Blob)
            ctx.beginPath();
            ctx.arc(0, 5, width/2 - 2, Math.PI, 0, false);
            ctx.lineTo(width/2 - 2, height/2);
            ctx.quadraticCurveTo(0, height/2 + 8, -(width/2 - 2), height/2);
            ctx.closePath();
            
            let grad = ctx.createRadialGradient(-5, -5, 5, 0, 0, width/2);
            grad.addColorStop(0, '#a954ff');
            grad.addColorStop(1, '#6210b3');
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.strokeStyle = '#2b0654';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Eyes Panel
            ctx.beginPath();
            let panelOffset = facingLeft ? -4 : 4;
            ctx.ellipse(panelOffset, -2, 14, 8, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#100720';
            ctx.fill();

            // Eyes (Cute Glowing Orbs)
            let eyeScale = facingLeft ? -1 : 1;
            ctx.beginPath();
            ctx.arc(panelOffset - 4 * eyeScale, -2, 4, 0, Math.PI * 2);
            ctx.arc(panelOffset + 4 * eyeScale, -2, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#00e5ff';
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Eye shines
            ctx.beginPath();
            ctx.arc(panelOffset - 5 * eyeScale, -3, 1.5, 0, Math.PI * 2);
            ctx.arc(panelOffset + 3 * eyeScale, -3, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            // Rosy cheeks
            ctx.beginPath();
            ctx.arc(panelOffset - 9 * eyeScale, 2, 2.5, 0, Math.PI * 2);
            ctx.arc(panelOffset + 9 * eyeScale, 2, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 51, 153, 0.5)';
            ctx.fill();

            ctx.restore();
        }
    },
    {
        id: 'astro_robo',
        name: 'Cybersphera 9000',
        color: '#00e5ff', // cyan
        accent: '#ff007f', // pink
        draw: (ctx, x, y, width, height, facingLeft, squashX, squashY) => {
            ctx.save();
            ctx.translate(x + width/2, y + height/2);
            ctx.scale(squashX, squashY);

            // Metal Side Pods
            ctx.beginPath();
            ctx.arc(-width/2 + 2, 2, 6, 0, Math.PI * 2);
            ctx.arc(width/2 - 2, 2, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#3a4454';
            ctx.fill();
            ctx.strokeStyle = '#1e2430';
            ctx.stroke();

            // Robo Sphere Body
            ctx.beginPath();
            ctx.arc(0, 0, width/2 - 2, 0, Math.PI * 2);
            let grad = ctx.createRadialGradient(-6, -6, 4, 0, 0, width/2);
            grad.addColorStop(0, '#e0e6ed');
            grad.addColorStop(0.7, '#8f9fb3');
            grad.addColorStop(1, '#536173');
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.strokeStyle = '#27313d';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Glass Visor
            ctx.beginPath();
            let visorOffset = facingLeft ? -6 : 6;
            ctx.ellipse(visorOffset, -2, 14, 9, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#0f172a';
            ctx.fill();
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // LED Eye (horizontal neon slit)
            ctx.beginPath();
            ctx.roundRect(visorOffset - 8, -4, 16, 4, 2);
            ctx.fillStyle = '#00e5ff';
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Chest Light
            ctx.beginPath();
            ctx.arc(0, height/2 - 8, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ff007f';
            ctx.shadowColor = '#ff007f';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.restore();
        }
    },
    {
        id: 'astro_neko',
        name: 'Miau-stronauta',
        color: '#ff9ebb', // Light pink
        accent: '#ffe57f', // Gold/Yellow
        draw: (ctx, x, y, width, height, facingLeft, squashX, squashY) => {
            ctx.save();
            ctx.translate(x + width/2, y + height/2);
            ctx.scale(squashX, squashY);

            // Bubble Helmet (Drawn back first)
            ctx.beginPath();
            ctx.arc(0, 0, width/2 + 2, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(100, 200, 255, 0.15)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Cat Ears
            ctx.beginPath();
            // Left Ear
            ctx.moveTo(-16, -12);
            ctx.lineTo(-24, -28);
            ctx.lineTo(-6, -18);
            // Right Ear
            ctx.moveTo(16, -12);
            ctx.lineTo(24, -28);
            ctx.lineTo(6, -18);
            ctx.closePath();
            ctx.fillStyle = '#ff9ebb';
            ctx.fill();
            ctx.strokeStyle = '#d66887';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Inner Ear (Pink)
            ctx.beginPath();
            ctx.moveTo(-14, -13);
            ctx.lineTo(-20, -23);
            ctx.lineTo(-8, -17);
            ctx.moveTo(14, -13);
            ctx.lineTo(20, -23);
            ctx.lineTo(8, -17);
            ctx.closePath();
            ctx.fillStyle = '#ffcbd9';
            ctx.fill();

            // Face (Cat Head)
            ctx.beginPath();
            ctx.arc(0, 2, width/2 - 4, 0, Math.PI * 2);
            ctx.fillStyle = '#fff0f3';
            ctx.fill();
            ctx.strokeStyle = '#c7b3b7';
            ctx.stroke();

            // Eyes
            let eyeScale = facingLeft ? -1 : 1;
            let lookOffset = facingLeft ? -2 : 2;
            ctx.beginPath();
            ctx.arc(-6 + lookOffset, 0, 3, 0, Math.PI * 2);
            ctx.arc(6 + lookOffset, 0, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#3d2529';
            ctx.fill();

            // Whiskers
            ctx.strokeStyle = '#a89498';
            ctx.lineWidth = 1;
            // Left whiskers
            ctx.beginPath();
            ctx.moveTo(-10 + lookOffset, 4); ctx.lineTo(-18 + lookOffset, 2);
            ctx.moveTo(-10 + lookOffset, 6); ctx.lineTo(-19 + lookOffset, 6);
            // Right whiskers
            ctx.moveTo(10 + lookOffset, 4); ctx.lineTo(18 + lookOffset, 2);
            ctx.moveTo(10 + lookOffset, 6); ctx.lineTo(19 + lookOffset, 6);
            ctx.stroke();

            // Nose & Mouth (cute cat mouth)
            ctx.beginPath();
            ctx.moveTo(0 + lookOffset, 2);
            ctx.lineTo(-1.5 + lookOffset, 4);
            ctx.quadraticCurveTo(-3 + lookOffset, 6, -4.5 + lookOffset, 4);
            ctx.moveTo(0 + lookOffset, 2);
            ctx.lineTo(1.5 + lookOffset, 4);
            ctx.quadraticCurveTo(3 + lookOffset, 6, 4.5 + lookOffset, 4);
            ctx.strokeStyle = '#3d2529';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Helmet Highlight Reflection
            ctx.beginPath();
            ctx.arc(-8, -10, 4, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fill();

            ctx.restore();
        }
    },
    {
        id: 'astro_fire',
        name: 'Meteoro Flamejante',
        color: '#ff4500', // orange-red
        accent: '#ffd700', // gold
        draw: (ctx, x, y, width, height, facingLeft, squashX, squashY) => {
            ctx.save();
            ctx.translate(x + width/2, y + height/2);
            ctx.scale(squashX, squashY);

            // Flame trails behind (opposite of jump direction or speed)
            ctx.beginPath();
            ctx.moveTo(-width/2 + 4, 8);
            ctx.quadraticCurveTo(-6, height/2 + 20, 0, height/2 + 10);
            ctx.quadraticCurveTo(6, height/2 + 20, width/2 - 4, 8);
            ctx.quadraticCurveTo(0, height/2, -width/2 + 4, 8);
            let flameGrad = ctx.createLinearGradient(0, 0, 0, height/2 + 15);
            flameGrad.addColorStop(0, '#ff4500');
            flameGrad.addColorStop(0.5, '#ff8c00');
            flameGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = flameGrad;
            ctx.fill();

            // Fiery Meteor body
            ctx.beginPath();
            ctx.arc(0, 0, width/2 - 2, 0, Math.PI * 2);
            let bodyGrad = ctx.createRadialGradient(-5, -5, 2, 0, 0, width/2);
            bodyGrad.addColorStop(0, '#ffd700');
            bodyGrad.addColorStop(0.3, '#ff8c00');
            bodyGrad.addColorStop(0.8, '#ff3300');
            bodyGrad.addColorStop(1, '#b30000');
            ctx.fillStyle = bodyGrad;
            ctx.fill();
            ctx.strokeStyle = '#4d0000';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Cracks/Flame Texture on body
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-8, -10);
            ctx.lineTo(-4, -6);
            ctx.lineTo(-8, -2);
            ctx.moveTo(8, -8);
            ctx.lineTo(6, -2);
            ctx.stroke();

            // Angry Glowing Eyes
            let lookDir = facingLeft ? -1 : 1;
            ctx.beginPath();
            // Left eye
            ctx.moveTo(-10 + lookDir * 2, -6);
            ctx.lineTo(-2 + lookDir * 2, -2);
            ctx.lineTo(-8 + lookDir * 2, 2);
            ctx.closePath();
            // Right eye
            ctx.moveTo(2 + lookDir * 2, -2);
            ctx.lineTo(10 + lookDir * 2, -6);
            ctx.lineTo(8 + lookDir * 2, 2);
            ctx.closePath();
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#ffff00';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.restore();
        }
    }
];

// Game Constants and Settings
const CANVAS_WIDTH = 450;
let CANVAS_HEIGHT = 700;
const GRAVITY = 0.35;
const JUMP_POWER = -11.5;
const SPRING_POWER = -19.5;
const PLAYER_SPEED = 8;
const ACCEL = 0.7;
const FRICTION = 0.85;

// Game State Variables
let currentSkinIdx = 0;
let canvas, ctx;
let keys = {};
let player;
let platforms = [];
let particles = [];
let score = 0;
let maxReachedHeight = 0;
let highScore = 0;
let cameraY = 0;
let targetCameraY = 0;
let gameState = 'START'; // START, PLAYING, PAUSED, GAMEOVER
let isNewRecord = false;
let platformIdCounter = 0;

// Pointer input state for Mobile/Mouse
let isPointerDown = false;
let pointerX = 0;

// Supabase Configuration - Substitua com as credenciais do seu projeto Supabase!
const SUPABASE_URL = "https://ojfugymcxpdigbwwxsjh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZnVneW1jeHBkaWdid3d4c2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5OTYyNTYsImV4cCI6MjA5ODU3MjI1Nn0.mLOnwcp0z65WIUeSEjIqd28i3zfghCZJQFydxe_0HO0";

let supabase = null;
if (SUPABASE_URL && SUPABASE_URL !== "SEU_SUPABASE_URL" && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== "SUA_SUPABASE_ANON_KEY") {
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
        console.error("Erro ao conectar com o Supabase:", e);
    }
}

let scoreSubmitted = false;
let randomGenerator = Math.random;
let loggedInPlayer = null;

// Restaura sessão salva
if (localStorage.getItem('astrojump_player')) {
    try {
        loggedInPlayer = JSON.parse(localStorage.getItem('astrojump_player'));
    } catch (e) {
        console.error("Erro ao restaurar sessão:", e);
    }
}

// Get Highscore from localStorage
if (localStorage.getItem('astrojump_highscore')) {
    highScore = parseInt(localStorage.getItem('astrojump_highscore'), 10);
}

// Particle Class
class Particle {
    constructor(x, y, color, size, vx, vy, life, gravity = 0.1, fadeSpeed = 0.02) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.vx = vx;
        this.vy = vy;
        this.life = life; // starts at 1
        this.gravity = gravity;
        this.fadeSpeed = fadeSpeed;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life -= this.fadeSpeed;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.beginPath();
        ctx.arc(this.x, this.y - cameraY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // Glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }
}

// Initialize DOM elements
window.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');

    // DOM Overlays & UI
    const startScreen = document.getElementById('start-screen');
    const pauseScreen = document.getElementById('pause-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const hud = document.getElementById('hud');

    const scoreVal = document.getElementById('score-val');
    const finalScore = document.getElementById('final-score');
    const bestScoreMenu = document.getElementById('best-score-menu');
    const bestScoreOver = document.getElementById('best-score-over');
    const badgeNewRecord = document.getElementById('badge-new-record');
    const gameOverMsg = document.getElementById('game-over-msg');

    const btnStart = document.getElementById('btn-start');
    const btnResume = document.getElementById('btn-resume');
    const btnRestartPause = document.getElementById('btn-restart-pause');
    const btnRetry = document.getElementById('btn-retry');
    const btnHome = document.getElementById('btn-home');
    const btnPause = document.getElementById('btn-pause');
    const btnMute = document.getElementById('btn-mute');

    const prevSkinBtn = document.querySelector('.prev-skin');
    const nextSkinBtn = document.querySelector('.next-skin');
    const skinNameLabel = document.getElementById('skin-name-label');

    // Display Highscore
    bestScoreMenu.textContent = highScore;

    // Responsive Canvas Resizing
    function resizeGame() {
        const wrapper = document.getElementById('game-wrapper');
        const width = wrapper.clientWidth;
        const height = wrapper.clientHeight;
        
        if (width > 0 && height > 0) {
            // Keep logical width at 450
            // Set logical height dynamically to match display aspect ratio (avoiding distortion)
            CANVAS_HEIGHT = Math.round(CANVAS_WIDTH * (height / width));
        }
        
        // Match canvas logical size to styling aspect ratio
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
    }
    window.addEventListener('resize', resizeGame);
    resizeGame();

    // Custom Web Preview Renderer for Skins
    function renderSkinPreview() {
        const previewContainer = document.getElementById('skin-avatar-preview');
        previewContainer.innerHTML = ''; // Clear
        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = 70;
        previewCanvas.height = 70;
        previewContainer.appendChild(previewCanvas);
        
        const pCtx = previewCanvas.getContext('2d');
        const skin = SKINS[currentSkinIdx];
        skin.draw(pCtx, 15, 10, 40, 40, false, 1.0, 1.0);
        skinNameLabel.textContent = skin.name;
    }
    renderSkinPreview();

    // Skin Carousel controls
    prevSkinBtn.addEventListener('click', () => {
        audio.playClick();
        currentSkinIdx = (currentSkinIdx - 1 + SKINS.length) % SKINS.length;
        renderSkinPreview();
    });

    nextSkinBtn.addEventListener('click', () => {
        audio.playClick();
        currentSkinIdx = (currentSkinIdx + 1) % SKINS.length;
        renderSkinPreview();
    });

    // Mute/Unmute
    btnMute.addEventListener('click', () => {
        audio.muted = !audio.muted;
        audio.init();
        document.getElementById('sound-on-icon').classList.toggle('hidden', audio.muted);
        document.getElementById('sound-off-icon').classList.toggle('hidden', !audio.muted);
        audio.playClick();
    });

    // Control buttons
    btnStart.addEventListener('click', () => {
        audio.init();
        audio.playClick();
        startGame();
    });

    btnPause.addEventListener('click', () => {
        if (gameState === 'PLAYING') {
            pauseGame();
        }
    });

    btnResume.addEventListener('click', () => {
        audio.playClick();
        resumeGame();
    });

    btnRestartPause.addEventListener('click', () => {
        audio.playClick();
        startGame();
    });

    btnRetry.addEventListener('click', () => {
        audio.playClick();
        startGame();
    });

    btnHome.addEventListener('click', () => {
        audio.playClick();
        showMenu();
    });

    // Keyboard Events
    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (e.key === ' ' || e.key === 'Spacebar') {
            if (gameState === 'PLAYING') {
                pauseGame();
            } else if (gameState === 'PAUSED') {
                resumeGame();
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    // Touch/Mouse Controls (Move character to cursor X)
    const handlePointerMove = (e) => {
        if (gameState !== 'PLAYING') return;
        const rect = canvas.getBoundingClientRect();
        let clientX = 0;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        
        // Translate client position to canvas coords
        const relativeX = ((clientX - rect.left) / rect.width) * CANVAS_WIDTH;
        pointerX = relativeX;
    };

    canvas.addEventListener('mousedown', (e) => {
        isPointerDown = true;
        handlePointerMove(e);
    });

    window.addEventListener('mousemove', (e) => {
        if (isPointerDown) {
            handlePointerMove(e);
        }
    });

    window.addEventListener('mouseup', () => {
        isPointerDown = false;
    });

    canvas.addEventListener('touchstart', (e) => {
        isPointerDown = true;
        handlePointerMove(e);
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (isPointerDown) {
            handlePointerMove(e);
        }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
        isPointerDown = false;
    });

    // Start Game Loop
    requestAnimationFrame(gameLoop);
    
    // Initialize Leaderboard listeners
    initLeaderboardListeners();
    // Initialize Auth and Profile listeners
    initAuthProfileListeners();
    // Update Auth Bar with current session
    updateAuthSessionUI();
});

// Setup and Start Game logic
function startGame() {
    // Hide screens
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('pause-screen').classList.add('hidden');
    document.getElementById('pause-screen').classList.remove('active');
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('active');
    document.getElementById('leaderboard-screen').classList.add('hidden');
    document.getElementById('leaderboard-screen').classList.remove('active');
    document.getElementById('rank-submit-box').classList.add('hidden');
    
    document.getElementById('hud').classList.remove('hidden');
    randomGenerator = Math.random;
    scoreSubmitted = false;

    // Init Physics & Entities
    player = {
        x: CANVAS_WIDTH / 2 - 20,
        y: CANVAS_HEIGHT - 150,
        vx: 0,
        vy: 0,
        width: 40,
        height: 40,
        facingLeft: false,
        squashX: 1.0,
        squashY: 1.0,
        skin: currentSkinIdx
    };

    platforms = [];
    particles = [];
    score = 0;
    maxReachedHeight = 0;
    cameraY = 0;
    targetCameraY = 0;
    isNewRecord = false;
    platformIdCounter = 0;

    // Create Initial Platforms
    // Ground platform directly below player to start safely
    platforms.push({
        id: platformIdCounter++,
        x: CANVAS_WIDTH / 2 - 50,
        y: CANVAS_HEIGHT - 80,
        width: 100,
        height: 15,
        type: 'normal',
        broken: false,
        fade: 1.0
    });

    // Generate starter stack of platforms
    for (let i = 0; i < 9; i++) {
        generatePlatform(CANVAS_HEIGHT - 170 - (i * 70));
    }

    gameState = 'PLAYING';
    
    document.getElementById('score-val').textContent = score;
}

function pauseGame() {
    if (gameState !== 'PLAYING') return;
    gameState = 'PAUSED';
    document.getElementById('pause-screen').classList.remove('hidden');
    document.getElementById('pause-screen').classList.add('active');
}

function resumeGame() {
    if (gameState !== 'PAUSED') return;
    gameState = 'PLAYING';
    document.getElementById('pause-screen').classList.remove('active');
    document.getElementById('pause-screen').classList.add('hidden');
}

function showMenu() {
    gameState = 'START';
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('pause-screen').classList.add('hidden');
    document.getElementById('pause-screen').classList.remove('active');
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('active');
    document.getElementById('leaderboard-screen').classList.add('hidden');
    document.getElementById('leaderboard-screen').classList.remove('active');
    
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('start-screen').classList.add('active');
    
    // Update menu best score
    document.getElementById('best-score-menu').textContent = highScore;
}

function gameOver() {
    gameState = 'GAMEOVER';
    audio.playGameOver();

    // Check highscore
    isNewRecord = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('astrojump_highscore', highScore);
        isNewRecord = true;
    }

    // Set UI Texts
    document.getElementById('final-score').textContent = score;
    document.getElementById('best-score-over').textContent = highScore;
    
    const badge = document.getElementById('badge-new-record');
    if (isNewRecord) {
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }

    const msgs = [
        "A gravidade é uma força cruel!",
        "Um pequeno deslize cósmico.",
        "Que subida estelar! Continue tentando.",
        "Seu Astro cansou de subir hoje.",
        "Você quase tocou as estrelas!",
        "Pou ficaria orgulhoso desse salto."
    ];
    let msg = msgs[Math.floor(Math.random() * msgs.length)];
    if (isNewRecord) msg = "INCRÍVEL! Novo Recorde Espacial! 🚀";
    document.getElementById('game-over-msg').textContent = msg;

    // Show score submission box if supabase is available and score > 0
    const submitBox = document.getElementById('rank-submit-box');
    if (supabase && score > 0 && !scoreSubmitted) {
        updateGameOverSubmitStatus();
        submitBox.classList.remove('hidden');
    } else {
        submitBox.classList.add('hidden');
    }

    // Show game over overlay
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('game-over-screen').classList.add('active');
}


// Platform Generator
function generatePlatform(yPosition) {
    const width = 72;
    const height = 15;
    
    const rand = () => randomGenerator();
    const x = rand() * (CANVAS_WIDTH - width);
    
    // Weighted probabilities based on height (score)
    // As score increases, spawn fewer normal platforms and more moving/fragile ones
    let r = rand();
    let type = 'normal';
    let item = null;

    let pNormal = 0.6;
    let pMoving = 0.2;
    let pFragile = 0.12;
    let pSpring = 0.08;

    if (score > 1500) {
        pNormal = 0.4;
        pMoving = 0.35;
        pFragile = 0.15;
        pSpring = 0.1;
    }
    if (score > 4000) {
        pNormal = 0.25;
        pMoving = 0.45;
        pFragile = 0.22;
        pSpring = 0.08;
    }

    // Select type
    if (r < pNormal) {
        type = 'normal';
        // Add random coins/stars on normal platforms
        if (rand() < 0.25) {
            item = 'star';
        }
    } else if (r < pNormal + pMoving) {
        type = 'moving';
    } else if (r < pNormal + pMoving + pFragile) {
        type = 'fragile';
    } else {
        type = 'spring';
    }

    // Velocity for moving platforms
    const speedScale = 1 + Math.min(score / 5000, 2.5); // move faster at higher scores
    const vx = type === 'moving' ? (rand() > 0.5 ? 1 : -1) * (0.8 + rand() * 1.2) * speedScale : 0;

    platforms.push({
        id: platformIdCounter++,
        x: x,
        y: yPosition,
        width: width,
        height: height,
        type: type,
        vx: vx,
        hasItem: item,
        itemCollected: false,
        broken: false,
        fade: 1.0
    });
}

// Particle Exploder
function createPlatformExplosion(x, y, color) {
    for (let i = 0; i < 12; i++) {
        const vx = (Math.random() - 0.5) * 5;
        const vy = -Math.random() * 4 - 1;
        const size = Math.random() * 4 + 2;
        const life = 1.0;
        const p = new Particle(x, y, color, size, vx, vy, life, 0.15, 0.035);
        particles.push(p);
    }
}

function createStarsTrail(x, y, color) {
    const vx = (Math.random() - 0.5) * 2;
    const vy = Math.random() * 1.5;
    const size = Math.random() * 3 + 1;
    const p = new Particle(x, y, color, size, vx, vy, 0.8, 0.02, 0.04);
    particles.push(p);
}

// Main Game Loop (Updates and Draws everything)
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    if (gameState !== 'PLAYING') {
        // Simple star update when not playing
        particles.forEach(p => p.update());
        particles = particles.filter(p => p.life > 0);
        return;
    }

    // 1. Controls / Horizontal Movement
    if (isPointerDown) {
        // Target follow with smooth dampening
        const dx = pointerX - (player.x + player.width/2);
        player.vx = dx * 0.18; // speed factor
        // Cap speed
        if (Math.abs(player.vx) > PLAYER_SPEED) {
            player.vx = Math.sign(player.vx) * PLAYER_SPEED;
        }
    } else {
        // Keyboard controls
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            player.vx -= ACCEL;
            player.facingLeft = true;
        } else if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            player.vx += ACCEL;
            player.facingLeft = false;
        } else {
            // Slide to a stop
            player.vx *= FRICTION;
        }
    }

    // Apply speed limits
    if (player.vx > PLAYER_SPEED) player.vx = PLAYER_SPEED;
    if (player.vx < -PLAYER_SPEED) player.vx = -PLAYER_SPEED;

    player.x += player.vx;

    // Screen wrapping (Left <-> Right)
    if (player.x + player.width < 0) {
        player.x = CANVAS_WIDTH;
    } else if (player.x > CANVAS_WIDTH) {
        player.x = -player.width;
    }

    // Face direction based on actual movement speed if using mouse/touch
    if (Math.abs(player.vx) > 0.5) {
        player.facingLeft = player.vx < 0;
    }

    // 2. Vertical Movement & Gravity
    player.vy += GRAVITY;
    player.y += player.vy;

    // Dynamic Squash & Stretch scaling factor based on vertical speed
    if (player.vy < 0) {
        // Stretching as we fly up
        player.squashY = 1 + Math.abs(player.vy) * 0.025;
        player.squashX = 1 - Math.abs(player.vy) * 0.015;
    } else {
        // Squashing when returning to normal
        player.squashY = 1;
        player.squashX = 1;
    }

    // Spawn tiny trail sparkles
    if (Math.random() < 0.35) {
        createStarsTrail(player.x + player.width/2, player.y + player.height, SKINS[player.skin].accent);
    }

    // 3. Platform Collision (Only when falling down)
    if (player.vy > 0) {
        for (let i = 0; i < platforms.length; i++) {
            const p = platforms[i];
            
            const playerBottom = player.y + player.height;
            // Check if player's bottom overlaps platform top
            if (!p.broken &&
                player.x + player.width - 8 > p.x &&
                player.x + 8 < p.x + p.width &&
                playerBottom >= p.y &&
                playerBottom <= p.y + Math.max(15, player.vy)
            ) {
                // Collided! Action depends on platform type
                if (p.type === 'fragile') {
                    // Crack sound and trigger breaking
                    audio.playBreak();
                    p.broken = true;
                    createPlatformExplosion(p.x + p.width/2, p.y + p.height/2, '#ff6b6b');
                    // Give a tiny bounce before falling
                    player.vy = JUMP_POWER * 0.6;
                } else if (p.type === 'spring') {
                    // SUPER BOOST
                    audio.playSpring();
                    player.vy = SPRING_POWER;
                    player.y = p.y - player.height;
                    
                    // Shockwave sparkles
                    for (let s = 0; s < 15; s++) {
                        const vx = (Math.random() - 0.5) * 8;
                        const vy = -Math.random() * 5 - 2;
                        particles.push(new Particle(p.x + p.width/2, p.y, '#ffd700', 4, vx, vy, 1.0, 0.1, 0.02));
                    }
                } else {
                    // Standard jump
                    audio.playJump();
                    player.vy = JUMP_POWER;
                    player.y = p.y - player.height;
                    
                    // Platform impact squash visual logic
                    player.squashY = 0.7;
                    player.squashX = 1.3;
                    
                    // Small impact dust
                    for (let s = 0; s < 5; s++) {
                        particles.push(new Particle(player.x + player.width/2, p.y, '#fff', 2, (Math.random()-0.5)*3, -Math.random()*2, 0.8, 0.05, 0.05));
                    }
                }
                break;
            }
        }
    }

    // 4. Item / Collectibles collision
    for (let i = 0; i < platforms.length; i++) {
        const p = platforms[i];
        if (p.hasItem === 'star' && !p.itemCollected && !p.broken) {
            const starX = p.x + p.width / 2;
            const starY = p.y - 18;
            
            // Core distance check
            const dist = Math.hypot((player.x + player.width/2) - starX, (player.y + player.height/2) - starY);
            if (dist < 32) {
                p.itemCollected = true;
                audio.playCollect();
                score += 250; // extra bonus points!
                
                // Explode star particles
                for (let s = 0; s < 12; s++) {
                    const vx = (Math.random() - 0.5) * 6;
                    const vy = (Math.random() - 0.5) * 6;
                    particles.push(new Particle(starX, starY, '#ffff00', 4, vx, vy, 1.0, 0.02, 0.03));
                }
            }
        }
    }

    // 5. Camera follow (Scroll screen upwards when player is in upper half)
    const midPoint = CANVAS_HEIGHT / 2.3;
    const targetCameraYVal = player.y - midPoint;
    if (targetCameraYVal < targetCameraY) {
        targetCameraY = targetCameraYVal;
    }
    
    // Smooth camera scroll
    cameraY += (targetCameraY - cameraY) * 0.15;

    // 6. Score updating (Based on max altitude reached)
    const currentAltitude = Math.floor((CANVAS_HEIGHT - 150 - player.y) / 5);
    if (currentAltitude > maxReachedHeight) {
        maxReachedHeight = currentAltitude;
        score = maxReachedHeight;
        document.getElementById('score-val').textContent = score;
    }

    // 7. Platforms clean up & Infinite generation
    // Remove off-screen platforms below the camera
    platforms = platforms.filter(p => {
        // If a platform is below the screen, discard it
        return p.y - cameraY < CANVAS_HEIGHT + 50;
    });

    // Make sure we have enough platforms ahead in height
    // Find the highest platform currently spawned (lowest Y coordinate)
    let highestY = CANVAS_HEIGHT;
    platforms.forEach(p => {
        if (p.y < highestY) highestY = p.y;
    });

    // If highest platform is within screen, generate more
    while (highestY > cameraY - 150) {
        highestY -= 70 + Math.random() * 20; // vertical gap between platforms
        generatePlatform(highestY);
    }

    // 8. Update Platforms (moving platforms vx, fragile fade out)
    platforms.forEach(p => {
        if (p.type === 'moving') {
            p.x += p.vx;
            // Bounce on canvas walls
            if (p.x <= 0) {
                p.x = 0;
                p.vx = -p.vx;
            } else if (p.x + p.width >= CANVAS_WIDTH) {
                p.x = CANVAS_WIDTH - p.width;
                p.vx = -p.vx;
            }
        } else if (p.type === 'fragile' && p.broken) {
            p.fade -= 0.1; // quickly fade
        }
    });

    // Filter out completely faded/broken platforms
    platforms = platforms.filter(p => p.fade > 0);

    // 9. Update Particles
    particles.forEach(p => p.update());
    particles = particles.filter(p => p.life > 0);

    // 10. Check Fall Game Over
    if (player.y - cameraY > CANVAS_HEIGHT + 50) {
        gameOver();
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 1. Dynamic Space Gradient Background (Draw directly to canvas to layer underneath objects)
    // Gradient shifts color depending on score to give a real altitude feeling!
    let grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    if (score < 1000) {
        grad.addColorStop(0, '#1c103a'); // Twilight purple
        grad.addColorStop(1, '#0b0616');
    } else if (score < 3000) {
        let percent = (score - 1000) / 2000;
        let c1 = interpolateColor('#1c103a', '#0d183d', percent); // To deep space blue
        let c2 = interpolateColor('#0b0616', '#050a1c', percent);
        grad.addColorStop(0, c1);
        grad.addColorStop(1, c2);
    } else if (score < 7000) {
        let percent = (score - 3000) / 4000;
        let c1 = interpolateColor('#0d183d', '#050814', percent); // To stellar black
        let c2 = interpolateColor('#050a1c', '#020308', percent);
        grad.addColorStop(0, c1);
        grad.addColorStop(1, c2);
    } else {
        grad.addColorStop(0, '#04050a'); // Absolute deep space
        grad.addColorStop(1, '#000000');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw some static background cosmic nebulas for premium touch
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    let nebulaY = (cameraY * 0.1) % CANVAS_HEIGHT;
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH * 0.3, CANVAS_HEIGHT - nebulaY, 150, 0, Math.PI * 2);
    let nebGrad = ctx.createRadialGradient(CANVAS_WIDTH * 0.3, CANVAS_HEIGHT - nebulaY, 10, CANVAS_WIDTH * 0.3, CANVAS_HEIGHT - nebulaY, 150);
    nebGrad.addColorStop(0, 'rgba(138, 43, 226, 0.08)');
    nebGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = nebGrad;
    ctx.fill();
    ctx.restore();

    // 2. Draw Platforms
    platforms.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.fade;

        // Platform Styling based on Type
        let mainColor = '#4caf50'; // Default Green
        let shadowColor = 'rgba(76, 175, 80, 0.4)';
        let strokeColor = '#2e7d32';

        if (p.type === 'moving') {
            mainColor = '#2196f3'; // Cyan-Blue
            shadowColor = 'rgba(33, 150, 243, 0.4)';
            strokeColor = '#0b3c5d';
        } else if (p.type === 'fragile') {
            mainColor = '#ff5722'; // Orange/Wood
            shadowColor = 'rgba(255, 87, 34, 0.3)';
            strokeColor = '#b33610';
        } else if (p.type === 'spring') {
            mainColor = '#e91e63'; // Bright neon pink
            shadowColor = 'rgba(233, 30, 99, 0.4)';
            strokeColor = '#880e4f';
        }

        // Draw Platform Shadow/Glow
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 10;

        // Rounded platform body
        ctx.beginPath();
        ctx.roundRect(p.x, p.y - cameraY, p.width, p.height, 8);
        
        let pGrad = ctx.createLinearGradient(p.x, p.y - cameraY, p.x, p.y - cameraY + p.height);
        pGrad.addColorStop(0, mainColor);
        pGrad.addColorStop(1, strokeColor);
        ctx.fillStyle = pGrad;
        ctx.fill();

        ctx.shadowBlur = 0; // reset
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Platform design accents
        if (p.type === 'spring') {
            // Draw a coil spring on top of the platform
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            const sx = p.x + p.width/2;
            const sy = p.y - cameraY;
            ctx.moveTo(sx - 10, sy);
            ctx.quadraticCurveTo(sx - 5, sy - 8, sx, sy);
            ctx.quadraticCurveTo(sx + 5, sy - 8, sx + 10, sy);
            ctx.stroke();
            // Tiny glowing cap
            ctx.fillStyle = '#ffeb3b';
            ctx.beginPath();
            ctx.arc(sx, sy - 7, 3.5, 0, Math.PI*2);
            ctx.fill();
        } else if (p.type === 'fragile') {
            // Draw cracks in wood/glass
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p.x + 15, p.y - cameraY + 2);
            ctx.lineTo(p.x + 25, p.y - cameraY + 12);
            ctx.moveTo(p.x + p.width - 20, p.y - cameraY + 1);
            ctx.lineTo(p.x + p.width - 30, p.y - cameraY + 13);
            ctx.stroke();
        } else if (p.type === 'moving') {
            // Neon direction arrows in middle
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.moveTo(p.x + p.width/2 - 12, p.y - cameraY + 7.5);
            ctx.lineTo(p.x + p.width/2 - 8, p.y - cameraY + 4);
            ctx.lineTo(p.x + p.width/2 - 8, p.y - cameraY + 11);
            ctx.moveTo(p.x + p.width/2 + 12, p.y - cameraY + 7.5);
            ctx.lineTo(p.x + p.width/2 + 8, p.y - cameraY + 4);
            ctx.lineTo(p.x + p.width/2 + 8, p.y - cameraY + 11);
            ctx.fill();
        }

        // Draw Collectible Star/Coin on Platform
        if (p.hasItem === 'star' && !p.itemCollected) {
            drawFloatingStar(ctx, p.x + p.width/2, p.y - 18 - cameraY);
        }

        ctx.restore();
    });

    // 3. Draw Particles
    particles.forEach(p => p.draw(ctx));

    // 4. Draw Player (Astro Mascot)
    if (gameState === 'PLAYING') {
        const currentSkin = SKINS[player.skin];
        currentSkin.draw(
            ctx, 
            player.x, 
            player.y - cameraY, 
            player.width, 
            player.height, 
            player.facingLeft, 
            player.squashX, 
            player.squashY
        );
    }
}

// Draw a beautiful star vector shape
function drawFloatingStar(ctx, x, y) {
    ctx.save();
    // Floating animation offset (sine wave)
    const floatOffset = Math.sin(Date.now() * 0.007) * 4;
    ctx.translate(x, y + floatOffset);
    ctx.rotate(Date.now() * 0.001);

    // Glow
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 12;

    ctx.beginPath();
    const spikes = 5;
    const outerRadius = 8;
    const innerRadius = 3.5;
    let rot = Math.PI / 2 * 3;
    let cx = 0;
    let cy = 0;
    let step = Math.PI / spikes;

    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
        cx = Math.cos(rot) * outerRadius;
        cy = Math.sin(rot) * outerRadius;
        ctx.lineTo(cx, cy);
        rot += step;

        cx = Math.cos(rot) * innerRadius;
        cy = Math.sin(rot) * innerRadius;
        ctx.lineTo(cx, cy);
        rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();

    let starGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, outerRadius);
    starGrad.addColorStop(0, '#ffffff');
    starGrad.addColorStop(0.3, '#ffeb3b');
    starGrad.addColorStop(1, '#ff9800');
    ctx.fillStyle = starGrad;
    ctx.fill();

    ctx.restore();
}

// Utility: Color interpolation for background height transitions
function interpolateColor(color1, color2, factor) {
    if (factor < 0) factor = 0;
    if (factor > 1) factor = 1;

    // Convert hex to rgb
    const hex = (x) => {
        let val = x.replace('#', '');
        return {
            r: parseInt(val.substring(0, 2), 16),
            g: parseInt(val.substring(2, 4), 16),
            b: parseInt(val.substring(4, 6), 16)
        };
    };

    const c1 = hex(color1);
    const c2 = hex(color2);

    const r = Math.round(c1.r + factor * (c2.r - c1.r));
    const g = Math.round(c1.g + factor * (c2.g - c1.g));
    const b = Math.round(c1.b + factor * (c2.b - c1.b));

    // Pad hex values
    const pad = (n) => n.toString(16).padStart(2, '0');

    return `#${pad(r)}${pad(g)}${pad(b)}`;
}

// ==================== RANKING ONLINE & CONTAS (SUPABASE) ====================

// Hashing helper for secure passwords
async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Update the user session bar UI on the start screen
function updateAuthSessionUI() {
    const sessionText = document.getElementById('user-session-text');
    const btnShowAuth = document.getElementById('btn-show-auth');
    const btnMyProfile = document.getElementById('btn-show-my-profile');
    const btnLogout = document.getElementById('btn-logout');

    if (loggedInPlayer) {
        sessionText.innerHTML = `Olá, <strong class="username-highlight">${escapeHTML(loggedInPlayer.username)}</strong>!`;
        btnShowAuth.classList.add('hidden');
        btnMyProfile.classList.remove('hidden');
        btnLogout.classList.remove('hidden');
    } else {
        sessionText.textContent = 'Não conectado';
        btnShowAuth.classList.remove('hidden');
        btnMyProfile.classList.add('hidden');
        btnLogout.classList.add('hidden');
    }
}

// Update the submit box container dynamically on Game Over
function updateGameOverSubmitStatus() {
    const statusEl = document.getElementById('rank-submit-status');
    if (!statusEl) return;

    if (loggedInPlayer) {
        statusEl.innerHTML = `
            <span>Conectado como <strong class="username-highlight">${escapeHTML(loggedInPlayer.username)}</strong></span>
            <button id="btn-submit-score" class="btn-primary" style="margin-top: 8px; width: 100%;">
                <span>ENVIAR PONTUAÇÃO</span>
            </button>
        `;
        document.getElementById('btn-submit-score').addEventListener('click', () => {
            audio.playClick();
            submitScore();
        });
    } else {
        statusEl.innerHTML = `
            <span>Conecte-se para registrar seu recorde online!</span>
            <button id="btn-submit-login-redirect" class="btn-primary" style="margin-top: 8px; width: 100%;">
                <span>FAZER LOGIN / CADASTRO</span>
            </button>
        `;
        document.getElementById('btn-submit-login-redirect').addEventListener('click', () => {
            audio.playClick();
            openAuthScreen();
        });
    }
}

// Fetch ranking from database
async function fetchLeaderboard() {
    const loadingEl = document.getElementById('leaderboard-loading');
    const listEl = document.getElementById('leaderboard-list');

    loadingEl.classList.remove('hidden');
    listEl.classList.add('hidden');
    listEl.innerHTML = '';

    if (!supabase) {
        loadingEl.innerHTML = '<span style="color: #ff4a4a;">Erro: Supabase não configurado. Por favor, adicione as credenciais no topo de game.js.</span>';
        return;
    }

    try {
        const { data, error } = await supabase
            .from('leaderboard')
            .select(`
                score,
                skin,
                created_at,
                players (
                    id,
                    username,
                    bio,
                    best_score,
                    created_at
                )
            `)
            .order('score', { ascending: false })
            .limit(10);

        if (error) throw error;

        loadingEl.classList.add('hidden');
        listEl.classList.remove('hidden');

        if (data && data.length > 0) {
            data.forEach((entry, idx) => {
                const rank = idx + 1;
                const item = document.createElement('div');
                item.className = `leaderboard-item top-${rank <= 3 ? rank : 'other'}`;
                item.style.cursor = 'pointer';
                
                const playerData = entry.players;
                const username = playerData ? playerData.username : 'Desconhecido';
                const skinName = SKINS[entry.skin]?.name || 'Classic';

                item.innerHTML = `
                    <div class="leaderboard-left">
                        <span class="leaderboard-rank">${rank}</span>
                        <div>
                            <span class="leaderboard-name">${escapeHTML(username)}</span>
                            <div style="font-size: 9px; color: var(--text-muted); margin-top: 2px;">Skin: ${skinName}</div>
                        </div>
                    </div>
                    <span class="leaderboard-score">${entry.score}</span>
                `;

                // Clique para inspecionar perfil
                item.addEventListener('click', () => {
                    if (playerData) {
                        audio.playClick();
                        openProfileScreen(playerData, entry.skin);
                    }
                });

                listEl.appendChild(item);
            });
        } else {
            listEl.innerHTML = '<div style="color: var(--text-muted); padding: 20px;">Nenhum recorde registrado ainda. Seja o primeiro!</div>';
        }
    } catch (err) {
        console.error('Erro ao buscar ranking:', err);
        loadingEl.innerHTML = `<span style="color: #ff4a4a;">Erro ao carregar ranking: ${err.message}</span>`;
    }
}

// Send score to ranking online
async function submitScore() {
    if (!supabase || !loggedInPlayer) return;

    const btnSubmit = document.getElementById('btn-submit-score');
    const submitText = btnSubmit ? btnSubmit.querySelector('span') : null;

    if (btnSubmit && submitText) {
        btnSubmit.disabled = true;
        submitText.textContent = 'ENVIANDO...';
    }

    try {
        const { error } = await supabase
            .from('leaderboard')
            .insert([
                { player_id: loggedInPlayer.id, score: score, skin: currentSkinIdx }
            ]);

        if (error) throw error;

        // Se a pontuação for maior que a melhor registrada, atualiza o perfil do jogador
        if (score > (loggedInPlayer.best_score || 0)) {
            loggedInPlayer.best_score = score;
            localStorage.setItem('astrojump_player', JSON.stringify(loggedInPlayer));
            
            await supabase
                .from('players')
                .update({ best_score: score })
                .eq('id', loggedInPlayer.id);
        }

        scoreSubmitted = true;
        document.getElementById('rank-submit-box').classList.add('hidden');
        openLeaderboardScreen();
    } catch (err) {
        console.error('Erro ao enviar score:', err);
        alert('Erro ao enviar score: ' + err.message);
        if (btnSubmit && submitText) {
            btnSubmit.disabled = false;
            submitText.textContent = 'TENTAR DE NOVO';
        }
    }
}

// Screen controls
function openLeaderboardScreen() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('active');
    
    const screen = document.getElementById('leaderboard-screen');
    screen.classList.remove('hidden');
    screen.classList.add('active');
    fetchLeaderboard();
}

function closeLeaderboardScreen() {
    const screen = document.getElementById('leaderboard-screen');
    screen.classList.add('hidden');
    screen.classList.remove('active');
    
    if (gameState === 'GAMEOVER') {
        document.getElementById('game-over-screen').classList.remove('hidden');
        document.getElementById('game-over-screen').classList.add('active');
    } else {
        document.getElementById('start-screen').classList.remove('hidden');
        document.getElementById('start-screen').classList.add('active');
    }
}

function openAuthScreen() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('active');

    const screen = document.getElementById('auth-screen');
    screen.classList.remove('hidden');
    screen.classList.add('active');

    // Reset fields
    document.getElementById('input-auth-username').value = '';
    document.getElementById('input-auth-password').value = '';
    document.getElementById('input-auth-confirm-password').value = '';
    document.getElementById('auth-error-msg').classList.add('hidden');
}

function closeAuthScreen() {
    const screen = document.getElementById('auth-screen');
    screen.classList.add('hidden');
    screen.classList.remove('active');

    if (gameState === 'GAMEOVER') {
        document.getElementById('game-over-screen').classList.remove('hidden');
        document.getElementById('game-over-screen').classList.add('active');
        updateGameOverSubmitStatus();
    } else {
        document.getElementById('start-screen').classList.remove('hidden');
        document.getElementById('start-screen').classList.add('active');
    }
}

// Profile Modal Controller (Inspecting players)
let profileTargetPlayer = null; // holds player being inspected
let profileOriginScreen = 'leaderboard'; // origin screen ('leaderboard' or 'start')

function renderProfileAvatar(skinIdx) {
    const container = document.getElementById('profile-avatar-display');
    if (!container) return;
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = 60;
    canvas.height = 60;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const skin = SKINS[skinIdx] || SKINS[0];
    skin.draw(ctx, 10, 10, 40, 40, false, 1.0, 1.0);
}

function openProfileScreen(playerData, skinIdx, origin = 'leaderboard') {
    profileTargetPlayer = playerData;
    profileOriginScreen = origin;

    // Hide other screens
    document.getElementById('leaderboard-screen').classList.add('hidden');
    document.getElementById('leaderboard-screen').classList.remove('active');
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('active');

    const screen = document.getElementById('profile-screen');
    screen.classList.remove('hidden');
    screen.classList.add('active');

    // Populate data
    document.getElementById('profile-username').textContent = playerData.username;
    
    const dateFormatted = new Date(playerData.created_at).toLocaleDateString('pt-BR');
    document.getElementById('profile-date').textContent = `Membro desde: ${dateFormatted}`;
    document.getElementById('profile-record').textContent = playerData.best_score || 0;
    
    const bioText = document.getElementById('profile-bio-text');
    const bioInput = document.getElementById('profile-bio-input');
    const btnEditSave = document.getElementById('btn-profile-edit-save');

    bioText.textContent = playerData.bio || 'Astro Saltador!';
    bioText.classList.remove('hidden');
    bioInput.classList.add('hidden');

    // Render Avatar
    let displaySkin = skinIdx;
    if (displaySkin === undefined) {
        displaySkin = (loggedInPlayer && loggedInPlayer.id === playerData.id) ? currentSkinIdx : 0;
    }
    renderProfileAvatar(displaySkin);

    // Check if the viewed player is the logged in player
    if (loggedInPlayer && loggedInPlayer.id === playerData.id) {
        btnEditSave.classList.remove('hidden');
        btnEditSave.querySelector('span').textContent = 'EDITAR BIO';
    } else {
        btnEditSave.classList.add('hidden');
    }
}

function closeProfileScreen() {
    const screen = document.getElementById('profile-screen');
    screen.classList.add('hidden');
    screen.classList.remove('active');

    if (profileOriginScreen === 'leaderboard') {
        openLeaderboardScreen();
    } else {
        document.getElementById('start-screen').classList.remove('hidden');
        document.getElementById('start-screen').classList.add('active');
    }
}

// Event Listeners for Leaderboard
function initLeaderboardListeners() {
    const btnMenu = document.getElementById('btn-leaderboard-menu');
    const btnBack = document.getElementById('btn-leaderboard-back');

    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            audio.playClick();
            openLeaderboardScreen();
        });
    }

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            audio.playClick();
            closeLeaderboardScreen();
        });
    }
}

// Event Listeners for Login, Register, and Profiles
function initAuthProfileListeners() {
    // Auth Screen Buttons
    const btnShowAuth = document.getElementById('btn-show-auth');
    const btnAuthBack = document.getElementById('btn-auth-back');
    const btnAuthSubmit = document.getElementById('btn-auth-submit');
    const btnLogout = document.getElementById('btn-logout');
    const btnMyProfile = document.getElementById('btn-show-my-profile');

    // Profile Screen Buttons
    const btnProfileBack = document.getElementById('btn-profile-back');
    const btnProfileEditSave = document.getElementById('btn-profile-edit-save');

    // Tabs
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const fieldConfirmPassword = document.getElementById('field-confirm-password');
    let authTab = 'login'; // login or register

    if (btnShowAuth) {
        btnShowAuth.addEventListener('click', () => {
            audio.playClick();
            openAuthScreen();
        });
    }

    if (btnAuthBack) {
        btnAuthBack.addEventListener('click', () => {
            audio.playClick();
            closeAuthScreen();
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            audio.playClick();
            loggedInPlayer = null;
            localStorage.removeItem('astrojump_player');
            updateAuthSessionUI();
        });
    }

    if (btnMyProfile) {
        btnMyProfile.addEventListener('click', () => {
            audio.playClick();
            if (loggedInPlayer) openProfileScreen(loggedInPlayer, undefined, 'start');
        });
    }

    if (btnProfileBack) {
        btnProfileBack.addEventListener('click', () => {
            audio.playClick();
            closeProfileScreen();
        });
    }

    // Toggle Bio Edit & Save
    if (btnProfileEditSave) {
        btnProfileEditSave.addEventListener('click', async () => {
            audio.playClick();
            const bioText = document.getElementById('profile-bio-text');
            const bioInput = document.getElementById('profile-bio-input');
            const btnSpan = btnProfileEditSave.querySelector('span');

            if (btnSpan.textContent === 'EDITAR BIO') {
                // Switch to edit mode
                bioText.classList.add('hidden');
                bioInput.classList.remove('hidden');
                bioInput.value = loggedInPlayer.bio || 'Astro Saltador!';
                bioInput.focus();
                btnSpan.textContent = 'SALVAR';
            } else {
                // Save bio changes
                const newBio = bioInput.value.trim();
                if (!newBio) {
                    alert('Sua descrição não pode ficar vazia.');
                    return;
                }

                btnProfileEditSave.disabled = true;
                btnSpan.textContent = 'SALVANDO...';

                try {
                    const { error } = await supabase
                        .from('players')
                        .update({ bio: newBio })
                        .eq('id', loggedInPlayer.id);

                    if (error) throw error;

                    loggedInPlayer.bio = newBio;
                    localStorage.setItem('astrojump_player', JSON.stringify(loggedInPlayer));

                    bioText.textContent = newBio;
                    bioText.classList.remove('hidden');
                    bioInput.classList.add('hidden');
                    btnSpan.textContent = 'EDITAR BIO';
                } catch (err) {
                    console.error('Erro ao salvar bio:', err);
                    alert('Erro ao salvar bio: ' + err.message);
                    btnSpan.textContent = 'SALVAR';
                } finally {
                    btnProfileEditSave.disabled = false;
                }
            }
        });
    }

    // Auth Modal Tabs Setup
    if (tabLogin) {
        tabLogin.addEventListener('click', () => {
            audio.playClick();
            authTab = 'login';
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            fieldConfirmPassword.classList.add('hidden');
            document.getElementById('auth-title').textContent = 'Acessar Conta';
            document.getElementById('auth-subtitle').textContent = 'Faça login para salvar seus records online';
            btnAuthSubmit.querySelector('span').textContent = 'ENTRAR';
            document.getElementById('auth-error-msg').classList.add('hidden');
        });
    }

    if (tabRegister) {
        tabRegister.addEventListener('click', () => {
            audio.playClick();
            authTab = 'register';
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            fieldConfirmPassword.classList.remove('hidden');
            document.getElementById('auth-title').textContent = 'Criar Conta';
            document.getElementById('auth-subtitle').textContent = 'Registre um login único de explorador';
            btnAuthSubmit.querySelector('span').textContent = 'CRIAR CONTA';
            document.getElementById('auth-error-msg').classList.add('hidden');
        });
    }

    // Submit Logins / Signups
    if (btnAuthSubmit) {
        btnAuthSubmit.addEventListener('click', async () => {
            audio.playClick();
            const usernameInput = document.getElementById('input-auth-username');
            const passwordInput = document.getElementById('input-auth-password');
            const confirmInput = document.getElementById('input-auth-confirm-password');
            const errorMsg = document.getElementById('auth-error-msg');

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            errorMsg.classList.add('hidden');

            if (!username || !password) {
                errorMsg.textContent = 'Por favor, preencha todos os campos.';
                errorMsg.classList.remove('hidden');
                return;
            }

            if (username.length < 3) {
                errorMsg.textContent = 'O nome de usuário deve ter pelo menos 3 caracteres.';
                errorMsg.classList.remove('hidden');
                return;
            }

            // Alpha-numeric usernames check
            if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                errorMsg.textContent = 'Nome de usuário deve conter apenas letras, números e underline.';
                errorMsg.classList.remove('hidden');
                return;
            }

            btnAuthSubmit.disabled = true;
            btnAuthSubmit.querySelector('span').textContent = 'PROCESSANDO...';

            try {
                const passHash = await hashPassword(password);
                const userLower = username.toLowerCase();

                if (authTab === 'login') {
                    // Authenticate Player
                    const { data, error } = await supabase
                        .from('players')
                        .select('*')
                        .eq('username', userLower)
                        .maybeSingle();

                    if (error) throw error;

                    if (!data || data.password_hash !== passHash) {
                        errorMsg.textContent = 'Nome de usuário ou senha inválidos.';
                        errorMsg.classList.remove('hidden');
                        btnAuthSubmit.disabled = false;
                        btnAuthSubmit.querySelector('span').textContent = 'ENTRAR';
                        return;
                    }

                    // Success login
                    loggedInPlayer = data;
                    localStorage.setItem('astrojump_player', JSON.stringify(loggedInPlayer));
                    closeAuthScreen();
                    updateAuthSessionUI();
                } else {
                    // Registration Flow
                    const confirmPass = confirmInput.value.trim();
                    if (password !== confirmPass) {
                        errorMsg.textContent = 'As senhas não coincidem.';
                        errorMsg.classList.remove('hidden');
                        btnAuthSubmit.disabled = false;
                        btnAuthSubmit.querySelector('span').textContent = 'CRIAR CONTA';
                        return;
                    }

                    // Check duplicate user
                    const { data: existing, error: checkError } = await supabase
                        .from('players')
                        .select('id')
                        .eq('username', userLower)
                        .maybeSingle();

                    if (checkError) throw checkError;

                    if (existing) {
                        errorMsg.textContent = 'Nome de usuário já está em uso.';
                        errorMsg.classList.remove('hidden');
                        btnAuthSubmit.disabled = false;
                        btnAuthSubmit.querySelector('span').textContent = 'CRIAR CONTA';
                        return;
                    }

                    // Insert new player
                    const { data: newPlayer, error: registerError } = await supabase
                        .from('players')
                        .insert([
                            { username: userLower, password_hash: passHash, bio: 'Astro Saltador!' }
                        ])
                        .select()
                        .single();

                    if (registerError) throw registerError;

                    // Success registration
                    loggedInPlayer = newPlayer;
                    localStorage.setItem('astrojump_player', JSON.stringify(loggedInPlayer));
                    closeAuthScreen();
                    updateAuthSessionUI();
                }
            } catch (err) {
                console.error('Erro de autenticação:', err);
                errorMsg.textContent = 'Ocorreu um erro no servidor: ' + err.message;
                errorMsg.classList.remove('hidden');
            } finally {
                btnAuthSubmit.disabled = false;
                btnAuthSubmit.querySelector('span').textContent = authTab === 'login' ? 'ENTRAR' : 'CRIAR CONTA';
            }
        });
    }
}

// Utility: Clean HTML escape
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
