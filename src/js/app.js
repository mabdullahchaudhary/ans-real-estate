document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverTargets = document.querySelectorAll('a, button, .hover-target, .cursor-hover-active');

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0, ease: "none" });
        });

        gsap.ticker.add(() => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            gsap.set(cursorOutline, { x: outlineX, y: outlineY });
        });

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
            target.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
        });
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (document.querySelector(".hero-img")) {
        tl.to(".hero-img", { scale: 1, duration: 2.5, ease: "power3.inOut" }, 0)
            .to(".hero-text", { y: "0%", opacity: 1, duration: 1.2, stagger: 0.15 }, 0.5)
            .to(".hero-sub", { y: 0, opacity: 1, duration: 1 }, 1);
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    if (filterBtns.length > 0 && propertyCards.length > 0) {
        gsap.from(propertyCards, {
            y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-slate', 'text-white');
                    b.classList.add('border-slate/20', 'text-slate');
                });
                btn.classList.remove('border-slate/20', 'text-slate');
                btn.classList.add('bg-slate', 'text-white');

                const filterValue = btn.getAttribute('data-filter');

                gsap.to(propertyCards, {
                    scale: 0.95, opacity: 0, duration: 0.3, ease: "power2.inOut",
                    onComplete: () => {
                        propertyCards.forEach(card => {
                            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                        gsap.to(propertyCards, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" });
                    }
                });
            });
        });
    }

    const detailHeroImg = document.querySelector('.detail-hero-img');
    const detailFadeElements = document.querySelectorAll('.detail-fade-up');
    const detailGalleryImgs = document.querySelectorAll('.detail-gallery img');

    if (detailHeroImg) {
        gsap.to(detailHeroImg, {
            yPercent: 20, ease: "none",
            scrollTrigger: { trigger: detailHeroImg.parentElement, start: "top top", end: "bottom top", scrub: true }
        });

        gsap.from(detailFadeElements, { y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 });

        if (detailGalleryImgs.length > 0) {
            detailGalleryImgs.forEach(img => {
                gsap.from(img, {
                    y: 50, opacity: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: img, start: "top 85%", toggleActions: "play none none reverse" }
                });
            });
        }
    }

    const agencyFades = document.querySelectorAll('.agency-fade');
    const agencyImg = document.querySelector('.agency-image-reveal');
    const teamCards = document.querySelectorAll('.agency-team-card');

    if (agencyFades.length > 0) {
        gsap.from(agencyFades, { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 });
        if (agencyImg) {
            gsap.from(agencyImg, { scale: 0.9, opacity: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: agencyImg, start: "top 80%" } });
        }
        if (teamCards.length > 0) {
            gsap.from(teamCards, { y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: teamCards[0], start: "top 85%" } });
        }
    }

    const contactStaggers = document.querySelectorAll('.contact-stagger');
    if (contactStaggers.length > 0) {
        gsap.from(contactStaggers, { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 });
    }

    const galleryImgs = document.querySelectorAll('.gallery-img');
    const reviewCard = document.querySelector('.review-card');

    if (galleryImgs.length > 0) {
        gsap.from(galleryImgs, {
            y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: "#visual-gallery", start: "top 70%" }
        });
    }

    if (reviewCard) {
        gsap.from(reviewCard, {
            x: 50, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: "#reviews", start: "top 75%" }
        });
    }

    const preloader = document.getElementById('preloader');
    if (preloader) {
        lenis.stop();

        const tlPreload = gsap.timeline({
            onComplete: () => {
                preloader.style.display = 'none';
                lenis.start();
            }
        });

        tlPreload.to(".loader-text", { y: "0%", opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 })
            .to(".loader-text", { y: "-100%", opacity: 0, duration: 0.8, ease: "power3.in", delay: 0.8 })
            .to(preloader, { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, "-=0.2");
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const line1 = document.querySelector('.menu-line-1');
    const line2 = document.querySelector('.menu-line-2');
    let isMenuOpen = false;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                if (line1 && line2) {
                    line1.style.transform = 'rotate(45deg)';
                    line2.style.transform = 'rotate(-45deg)';
                }
                lenis.stop();
            } else {
                mobileMenu.classList.add('translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
                if (line1 && line2) {
                    line1.style.transform = 'none';
                    line2.style.transform = 'none';
                }
                lenis.start();
            }
        });
    }
});