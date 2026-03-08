const tools = [
    { name: "Menu", desc: "The core interface for everything.", img: "https://picsum.photos/500/300?1", tags: ["Free", "Open Source"], label: "Essential" },
    { name: "Deobfuscator", desc: "Clean up the messiest code instantly.", img: "https://picsum.photos/500/300?2", tags: ["Paid"], label: "Overpowered" },
    { name: "Obfuscator", desc: "Military grade protection.", img: "https://picsum.photos/500/300?3", tags: ["Free"], label: "Trusted" },
    { name: "PC Checker", desc: "Analyze system specs and IDs.", img: "https://picsum.photos/500/300?4", tags: ["Internal"], label: "Fast" }
];

// Easy Card Injection
const container = document.getElementById('card-container');
tools.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'card reveal-text';
    card.innerHTML = `
        <span class="label">${tool.label}</span>
        <img src="${tool.img}" style="border-radius:15px; margin-bottom:15px;">
        <h3>${tool.name}</h3>
        <p>${tool.desc}</p>
        <div>${tool.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    `;
    container.appendChild(card);
});

// Scroll Logic: Paintbrush and Reveal
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Update Paintbrush Reveal (0% to 100% based on scroll)
    const progress = Math.min(scrollPos / (windowHeight / 2), 1) * 100;
    document.documentElement.style.setProperty('--reveal-progress', progress + '%');

    // Reveal items on scroll
    document.querySelectorAll('.reveal-text').forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 50) {
            el.classList.add('visible');
        }
    });
});

// Star Logic with Mouse Proximity
const canvas = document.getElementById('canvas-stars');
const ctx = canvas.getContext('2d');
let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    // Cursor glow update
    const glow = document.getElementById('cursor-glow');
    glow.style.left = e.x + 'px';
    glow.style.top = e.y + 'px';
});

// (Keep the Particle class and Init from previous message, but modify draw:)
class Particle {
    /* ... constructor same as before ... */
    draw() {
        // Calculate distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Stars get more transparent when mouse is near
        let opacity = distance < 150 ? 0.1 : 0.8;
        
        ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`;
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
