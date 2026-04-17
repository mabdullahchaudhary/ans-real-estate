window.initHeroAnimations = function initHeroAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    if (window.lenis && !window.__lenisScrollTriggerBound) {
        window.__lenisScrollTriggerBound = true;
        window.lenis.on("scroll", ScrollTrigger.update);
    }

    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");

    if (dot && outline) {
        const dotX = gsap.quickTo(dot, "x", { duration: 0.01, ease: "none" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.01, ease: "none" });
        const outlineX = gsap.quickTo(outline, "x", { duration: 0.15, ease: "power3.out" });
        const outlineY = gsap.quickTo(outline, "y", { duration: 0.15, ease: "power3.out" });

        window.addEventListener("pointermove", (event) => {
            const x = event.clientX;
            const y = event.clientY;
            dotX(x);
            dotY(y);
            outlineX(x);
            outlineY(y);
        }, { passive: true });

        const hoverSelector = "a, button, .cursor-hover-active";

        document.addEventListener("pointerover", (event) => {
            if (event.target.closest(hoverSelector)) {
                gsap.to(outline, {
                    scale: 1.5,
                    borderColor: "#C5A880",
                    duration: 0.25,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        });

        document.addEventListener("pointerout", (event) => {
            if (event.target.closest(hoverSelector)) {
                gsap.to(outline, {
                    scale: 1,
                    borderColor: "#1A1A1A",
                    duration: 0.25,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        });
    }

    const magneticButtons = document.querySelectorAll(".magnetic-btn");

    magneticButtons.forEach((button) => {
        const moveX = gsap.quickTo(button, "x", { duration: 0.22, ease: "power3.out" });
        const moveY = gsap.quickTo(button, "y", { duration: 0.22, ease: "power3.out" });

        button.addEventListener("mousemove", (event) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width * 0.5;
            const centerY = rect.top + rect.height * 0.5;
            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;
            const radius = Math.max(rect.width, rect.height) * 0.9;
            const distance = Math.hypot(dx, dy);

            if (distance < radius) {
                const strength = (1 - distance / radius) * 20;
                const angle = Math.atan2(dy, dx);
                moveX(Math.cos(angle) * strength);
                moveY(Math.sin(angle) * strength);
            } else {
                moveX(0);
                moveY(0);
            }
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.9,
                ease: "elastic.out(1, 0.3)",
                overwrite: "auto"
            });
        });
    });

    const heroTimeline = gsap.timeline({ defaults: { force3D: true } });

    heroTimeline
        .fromTo("#hero img", { scale: 1.1 }, { scale: 1, duration: 2, ease: "power4.out" }, 0)
        .from("#hero .split-word", {
            y: 50,
            opacity: 0,
            duration: 1.05,
            stagger: 0.08,
            ease: "power4.out"
        }, 0.2);
};
