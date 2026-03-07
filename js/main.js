/** * PROJECT DATA 
 */
const projects = [
    {
        title: "AI Smart Assistant",
        tag: "COMPUTER ENGINEERING (2YP)",
        desc: "Integrated OCR and local Mistral LLMs for automated workflow optimization. Featured custom shading UI for OCR selection.",
        tech: ["Python", "Mistral", "Tkinter", "OCR"]
    },
    {
        title: "Recipe Framework",
        tag: "SOFTWARE DESIGN",
        desc: "A full-stack recipe management system emphasizing clean data structures and intuitive UI hierarchy.",
        tech: ["HTML/CSS", "JavaScript", "SQL"]
    },
    {
        title: "Cyber Security Scanner",
        tag: "NETWORK ENGINEERING",
        desc: "Automated vulnerability scanner for local networks. Handled 10k+ concurrent port scans asynchronously.",
        tech: ["C++", "Boost.Asio", "Bash"]
    },
    {
        title: "Hardware Telemetry UI",
        tag: "SYSTEMS PROGRAMMING",
        desc: "Real-time dashboard interfacing with Raspberry Pi GPIO to display live hardware statistics.",
        tech: ["React", "Node.js", "WebSockets"]
    }
];

/** * TYPEWRITER ENGINE 
 */
function typeWriter(text, i, targetId, speed, callback) {
    const element = document.getElementById(targetId);
    if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1) + '<span class="text-cyan-400 animate-pulse">|</span>';
        setTimeout(() => typeWriter(text, i + 1, targetId, speed, callback), speed);
    } else {
        element.innerHTML = text; // Remove cursor when done
        if (callback) callback();
    }
}

/** * CORE INITIALIZATION 
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Projects
    const grid = document.getElementById('project-grid');
    grid.innerHTML = projects.map((p, idx) => `
        <div class="reveal project-card bg-[#0a0a0a] border border-white/5 p-8 rounded-xl group transition-all duration-500 hover:border-cyan-400/40" style="transition-delay: ${idx * 150}ms">
            <span class="text-[9px] font-mono text-cyan-500 uppercase tracking-[0.2em] mb-4 block">${p.tag}</span>
            <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">${p.title}</h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-6">${p.desc}</p>
            <div class="flex flex-wrap gap-2">
                ${p.tech.map(t => `<span class="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded font-mono">${t}</span>`).join('')}
            </div>
        </div>
    `).join('');

    // 2. Setup Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Start Typewriter Sequence
    typeWriter("Hi, I am Janith.", 0, "line-1", 70, () => {
        setTimeout(() => {
            typeWriter("A Computer Engineer", 0, "line-2", 50);
        }, 400);
    });

    // 4. Custom Cursor Logic
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    
    if (cursor && cursorDot) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate update for dot
            cursorDot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
        });

        // Smooth follow for outer ring
        const renderCursor = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);
        
        // Add hover effects for links
        document.querySelectorAll('a, button, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('scale-150', 'bg-cyan-500/10'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('scale-150', 'bg-cyan-500/10'));
        });
    }

    // 5. Particle Network Background
    const canvas = document.getElementById('particles-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles = [];

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
                ctx.fill();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles = [];
            const count = Math.min(Math.floor(window.innerWidth / 15), 100);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach((p, index) => {
                p.update();
                p.draw();
                
                // Connect near particles
                for (let j = index + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 - dist/500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animateParticles);
        };

        initParticles();
        animateParticles();
    }
});