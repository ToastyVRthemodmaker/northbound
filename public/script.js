const tools = [
    { name: "menu", desc: "Advanced navigation and utility hub.", img: "https://picsum.photos/600/400?random=1", label: "trusted", tags: ["Free", "Source"] },
    { name: "deobfuscator", desc: "Automated analysis for hardened scripts.", img: "https://picsum.photos/600/400?random=2", label: "overpowered", tags: ["Paid", "API"] },
    { name: "obfuscator", desc: "Multi-layered string and flow encryption.", img: "https://picsum.photos/600/400?random=3", label: "secure", tags: ["Free", "Web"] },
    { name: "pc checker", desc: "Instant hardware ID and spec diagnostics.", img: "https://picsum.photos/600/400?random=4", label: "fast", tags: ["Internal"] }
];

const container = document.getElementById('card-container');
const glow = document.getElementById('cursor-glow');
const canvas = document.getElementById('canvas-stars');
const ctx = canvas.getContext('2d');

let mouse = { x: 0, y: 0 };
let particles = [];

tools.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'card reveal';
    card.innerHTML = `
        <div class="card-label">${tool.label}</div>
        <img src="${tool.img}">
        <h2>${tool.name}</h2>
        <p>${tool.desc}</p>
        <div class="card-tags">${tool.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    `;
    container.appendChild(card);
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

window.addEventListener('mousedown', () => glow.style.opacity = '1');
window.addEventListener('mouseup', () => glow.style.opacity = '0.5');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const revealVal = Math.min(scrolled / 400 * 100, 100);
    document.documentElement.style.setProperty('--reveal-scale', revealVal + '%');

    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 0.6 - 0.3;
        this.vy = Math.random() * 0.6 - 0.3;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const opacity = dist < 200 ? 0.1 : 0.6;
        ctx.fillStyle = `rgba(58, 134, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        for (let j = i + 1; j < particles.length; j++) {
            const dx = p.x - particles[j].x;
            const dy = p.y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const mouseDist = Math.sqrt(Math.pow(mouse.x - p.x, 2) + Math.pow(mouse.y - p.y, 2));
                const lineOpacity = (1 - dist / 120) * (mouseDist < 200 ? 0.1 : 0.4);
                ctx.strokeStyle = `rgba(58, 134, 255, ${lineOpacity})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}
animate();
window.dispatchEvent(new Event('scroll'));
