// μLearn GECT — LEGACY WEBSITE
// Main Logic & Animations (GSAP)

document.addEventListener('DOMContentLoaded', () => {

    // Check for touch device (Fix 1)
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // Initialize Lucide Icons
    lucide.createIcons();

    // Member Data
    const members = [
        { name: "Fiero Jain", role: "Campus Lead", quote: "We didn't inherit a stage. We built one.", linkedin: "https://linkedin.com/in/fiero", instagram: "https://instagram.com/fiero", email: "fiero@example.com" },
        { name: "Hemanth Krishna A B", role: "Co-Campus Lead", quote: "Getting council approval was harder than any exam.", linkedin: "#", instagram: "#", email: "#" },
        { name: "Parthan Rajesh", role: "Tech Team", quote: "We built the backend before we had a frontend audience.", linkedin: "#", instagram: "#", email: "#" },
        { name: "Tony James", role: "Tech Team", quote: "Code was easy. Getting people to believe was the real challenge.", linkedin: "#", instagram: "#", email: "#" },
        { name: "Mukhthar Ahmed Yaseen O", role: "Visual & Media Lead", quote: "Every pixel we placed, we placed with intent.", linkedin: "#", instagram: "#", email: "#" },
        { name: "Badusha Pareed", role: "Creative Team", quote: "Ideas are cheap. Execution is everything.", linkedin: "#", instagram: "#", email: "#" },
        { name: "Abhijith K V", role: "Management Team", quote: "Operations is the invisible engine.", linkedin: "#", instagram: "#", email: "#" },
        { name: "Akshay Saju", role: "Management Team", quote: "Community happens when you listen first.", linkedin: "#", instagram: "#", email: "#" },
        { name: "Anirudh P", role: "Management Team", quote: "We turned 'no' into 'how'.", linkedin: "#", instagram: "#", email: "#" },
        { name: "Hridya Sivarajan", role: "Management Team", quote: "Organising chaos is an art form.", linkedin: "#", instagram: "#", email: "#" },
        { name: "Sreeram P", role: "Management Team", quote: "I kept the wheels turning while everyone else steered.", linkedin: "#", instagram: "#", email: "#" }
    ];

    // Render Members
    const membersGrid = document.querySelector('.members-grid');
    members.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';

        // Build image filename: exact name with spaces, plus .png
        // Example: "Fiero Jain" -> "Fiero Jain.png" (spaces become %20 in URL)
        const imageName = member.name + '.png';
        const imagePath = `assets/members/${encodeURIComponent(imageName)}`;

        card.innerHTML = `
            <div class="member-photo">
                <img src="${imagePath}" alt="${member.name}">
            </div>
            <h3 class="member-name serif">${member.name}</h3>
            <p class="gold-caps">${member.role}</p>
            <div class="divider"></div>
            <p class="member-quote">"${member.quote}"</p>
            <div class="member-contact">
                <a href="${member.linkedin}" target="_blank"><i data-lucide="linkedin"></i></a>
                <a href="${member.instagram}" target="_blank"><i data-lucide="instagram"></i></a>
                <a href="mailto:${member.email}"><i data-lucide="mail"></i></a>
            </div>
        `;

        // Mobile tap flip
        card.addEventListener('click', () => {
            if (document.body.classList.contains('touch-device')) {
                card.classList.toggle('flipped');
            }
        });

        membersGrid.appendChild(card);
    });
    lucide.createIcons(); // Re-init icons for new cards

    // --- GSAP ANIMATIONS ---

    // Set global default — animations reverse when scrolling back up (Fix 5)
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
        toggleActions: 'play none none reverse'
    });

    // 1. Page Intro Sequence
    const intro = gsap.timeline();

    intro
        .set('body', { overflow: 'hidden' })
        .set('#intro-screen', { opacity: 1 })
        .set('#intro-text', { opacity: 0, letterSpacing: '0.8em' })
        .to('#intro-text', {
            opacity: 1,
            letterSpacing: '0.4em',
            duration: 1.8,
            ease: 'power2.out'
        })
        .to('#intro-text', {
            opacity: 0,
            duration: 0.8,
            delay: 0.8,
            ease: 'power2.in'
        })
        .to('#intro-screen', {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
        })
        .set('#intro-screen', { display: 'none' })
        .set('body', { overflow: 'auto' })
        .from('#hero-content', {
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: 'power3.out'
        })
        .from('.hero-logo', { opacity: 0, x: -20, duration: 1 }, "-=1")
        .from('.hero-watermark', { opacity: 0, duration: 2 }, "-=1")
        .to('#sound-prompt', { display: 'block', opacity: 1, duration: 0.5 });

    // 2. Custom Gold Cursor (Fix 2)
    const cursor = document.querySelector('#cursor');
    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: 'power2.out'
            });
        });
    }

    // 3. Staggered Text Reveal
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
            },
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // 4. Origin Block Reveal
    gsap.utils.toArray('.reveal-block').forEach(block => {
        gsap.from(block.children, {
            scrollTrigger: {
                trigger: block,
                start: 'top 80%',
            },
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    // 5. Timeline Line Drawing
    gsap.from('#origin-line', {
        scrollTrigger: {
            trigger: '.origin-timeline',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top center",
        ease: 'none'
    });

    // 6. Member Cards Staggered Entrance
    gsap.from('.member-card', {
        scrollTrigger: {
            trigger: '#eleven',
            start: 'top 70%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
    });

    // 7. Event Cards Timeline v2
    gsap.utils.toArray('.event-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // 8. Gallery Color Bleed Tap Handler (Fix 3)
    document.querySelectorAll('.gallery-photo').forEach(photo => {
        photo.addEventListener('click', () => {
            photo.classList.toggle('colourised');
        });
    });

    // 9. Chapter Vault Row Parallax/Scroll
    gsap.from('.chapter-vault-card', {
        scrollTrigger: {
            trigger: '#chapters',
            start: 'top 80%',
        },
        opacity: 0,
        x: 100,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
    });

    // Audio Handling (Fix 4)
    const unmuteBtn = document.getElementById('unmute-btn');
    const audio = document.getElementById('ambient');
    if (unmuteBtn && audio) {
        unmuteBtn.addEventListener('click', () => {
            audio.volume = 0.15;
            audio.play().then(() => {
                unmuteBtn.innerText = "♪ SOUND ACTIVE";
                gsap.to('#sound-prompt', {
                    opacity: 0, delay: 1, duration: 0.5, onComplete: () => {
                        document.getElementById('sound-prompt').style.display = 'none';
                    }
                });
            }).catch(e => {
                console.log("Audio play blocked", e);
                unmuteBtn.innerText = "♪ PLAYBACK BLOCKED";
            });
        });
    }

    // Scroll to Top for Chapter 01
    const viewBtn = document.querySelector('.view-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});