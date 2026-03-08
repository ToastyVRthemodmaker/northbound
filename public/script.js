// 1. Easy Card Creator
const tools = [
    { name: "Menu", desc: "Main control interface.", img: "https://picsum.photos/400/200?random=1" },
    { name: "Deobfuscator", desc: "Reverse engineer complex code.", img: "https://picsum.photos/400/200?random=2" },
    { name: "Obfuscator", desc: "Secure your scripts.", img: "https://picsum.photos/400/200?random=3" },
    { name: "PC Checker", desc: "System diagnostics and hardware ID.", img: "https://picsum.photos/400/200?random=4" }
];

const container = document.getElementById('card-container');

tools.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${tool.img}" alt="${tool.name}">
        <h3>${tool.name}</h3>
        <p>${tool.desc}</p>
    `;
    container.appendChild(card);
});

// 2. Mouse Glow Effect
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => glow.style.opacity = '1');
document.addEventListener('mouseup', () => glow.style.opacity = '0.6');

// 3. Connecting Stars Animation
const canvas = document.getElementById('canvas-stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(58, 134, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        // Connect dots
        for (let j = index; j < particles.length; j++) {
            const dx = p.x - particles[j].x;
            const dy = p.y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.strokeStyle = `rgba(58, 134, 255, ${1 - distance/100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}
init();
animate();
