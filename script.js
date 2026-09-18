  // Custom Cursor Logic
        const cursor = document.getElementById('cursor');
        const interactables = document.querySelectorAll('a, button, .magnetic, .glass-panel');

        if (window.matchMedia("(pointer: fine)").matches) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            interactables.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
                
                // Magnetic effect
                if(el.classList.contains('magnetic')) {
                    el.addEventListener('mousemove', (e) => {
                        const rect = el.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                    });
                    el.addEventListener('mouseleave', () => {
                        el.style.transform = `translate(0px, 0px)`;
                    });
                }
            });
        }
        
        // Intersection Observer for Scroll Effects
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            observer.observe(el);
        });
        
        // Navigation Active State Update on Scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const sideNavLinks = document.querySelectorAll('aside a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active', 'text-primary');
                link.classList.add('text-on-surface-variant');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active', 'text-primary');
                    link.classList.remove('text-on-surface-variant');
                }
            });
            
             sideNavLinks.forEach(link => {
                link.classList.remove('bg-secondary-container', 'text-on-secondary-container');
                link.classList.add('text-on-surface-variant');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('bg-secondary-container', 'text-on-secondary-container');
                    link.classList.remove('text-on-surface-variant');
                }
            });
        });
        
        // Typewriter Effect
        const textToType = "SYS.INIT // HELLO WORLD";
        const typewriterElement = document.getElementById('typewriter');
        let i = 0;
        
        function typeWriter() {
            if (i < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);

        // Terminal Typing Effect
        const terminalText = "tail -f server.log";
        const terminalTypingElement = document.getElementById('terminal-typing');
        let j = 0;

        function terminalTypeWriter() {
            if (j < terminalText.length) {
                terminalTypingElement.innerHTML += terminalText.charAt(j);
                j++;
                setTimeout(terminalTypeWriter, 150);
            }
        }

        // Use IntersectionObserver to start terminal typing when in view
        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(terminalTypeWriter, 500);
                    terminalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        terminalObserver.observe(document.getElementById('terminal'));
 document.getElementsByClassName("sendButton")[0].addEventListener("click", () => {
    const subject = document.getElementsByClassName("subject")[0].value;
    const email = document.getElementsByClassName("email")[0].value;
    const message = document.getElementById("message").value;

    const body = `From: ${email}\n\n${message}`;

    window.location.href =
      `mailto:ayushagrawalfzd4321@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 });
  