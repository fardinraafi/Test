document.addEventListener('DOMContentLoaded', () => {
    // PRELOADER LOGIC
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => { preloader.classList.add('hide'); }, 600);
        });
        setTimeout(() => { preloader.classList.add('hide'); }, 1500);
    }

    /* =========================================
       0. GLOBAL COMPONENT INJECTOR
    ========================================= */
    const globalNav = document.querySelector('.top-nav');
    const globalFooter = document.querySelector('.site-footer');

    const navHTML = `
    <a href="/index.html" class="nav-brand">FR<span class="gradient-text">KR</span></a>
    <div class="nav-menu">
        <a href="/index.html">Home</a>
        <a href="/gallery.html">Gallery</a>
        <a href="/blog.html">Blog</a>
        <a href="/certificates.html">Certificates</a>
        <a href="/volunteer.html">Leadership</a>
        <a href="/resume.html">Resume</a>
        <a href="/contact.html">Contact</a>
    </div>
    <div class="nav-actions">
        <a href="/contact.html" class="btn btn-primary">Let's Talk</a>
        <button id="themeToggle" class="theme-toggle-track" aria-label="Toggle Dark Mode">
            <span class="theme-text text-dark">Dark</span>
            <span class="theme-text text-light">Light</span>
            <div class="theme-liquid-bubble">
                <svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            </div>
        </button>
    </div>`;

    const footerHTML = `
    <div class="footer-grid">
        <div class="footer-col">
            <h2 style="font-family: 'Syne', sans-serif; font-weight: 900; color: var(--text-main);">Fardin Rahman<br><span class="gradient-text">Khan Raafi</span></h2>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem; max-width: 350px; line-height: 1.6; font-size: 1.1rem;">
                Marketing professional passionate about brand communication, creative strategies, and growth leadership.
            </p>
        </div>
        <div class="footer-col">
            <h4>Quick Links</h4>
            <div class="footer-col-links">
                <a href="/index.html">Home</a>
                <a href="/gallery.html">Gallery</a>
                <a href="/blog.html">Blog</a>
                <a href="/certificates.html">Certificates</a>
                <a href="/volunteer.html">Leadership</a>
                <a href="/resume.html">Resume</a>
            </div>
        </div>
        <div class="footer-col">
            <h4>Contact & Socials</h4>
            <div class="footer-col-links">
                <a href="mailto:fardinraafi@gmail.com">fardinraafi@gmail.com</a>
                <a href="https://www.linkedin.com/in/fardinraafi" target="_blank">LinkedIn Profile</a>
                <a href="https://x.com/fardinraafii" target="_blank">Twitter</a>
                <a href="https://github.com/fardinraafi" target="_blank">GitHub</a>
                <a href="https://www.behance.net/fardinraafi" target="_blank">Behance</a>
                <a href="Fardin_Resume.pdf" download="Fardin_Rahman_Khan_Raafi_Resume.pdf" class="btn btn-outline" style="margin-top: 1rem; border-color: var(--c1);">Download Resume 📥</a>
            </div>
        </div>
    </div>
    <div class="copyright">
        © <span id="current-year"></span> Fardin Rahman Khan Raafi. All rights reserved. Built for Humans & AI.
    </div>`;

    if (globalNav) {
        globalNav.innerHTML = navHTML;
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = globalNav.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '/' + currentPath || link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    if (globalFooter) globalFooter.innerHTML = footerHTML;

    /* =========================================
       1. THEME TOGGLE LOGIC
    ========================================= */
    const themeBtn = document.getElementById('themeToggle');
    if (localStorage.getItem('theme') === 'light') document.body.classList.remove('dark-mode');
    else { document.body.classList.add('dark-mode'); localStorage.setItem('theme', 'dark'); }
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

    /* =========================================
       3. TYPEWRITER EFFECT
    ========================================= */
    const twText = document.getElementById('tw-text');
    if (twText) {
        const words = ['Marketing Executive.', 'Growth Associate.', 'Brand Strategist.', 'B2B Sales Expert.'];
        let i = 0, j = 0, isDeleting = false;
        function type() {
            const currentWord = words[i];
            twText.textContent = currentWord.substring(0, isDeleting ? j - 1 : j + 1); 
            isDeleting ? j-- : j++;
            let typeSpeed = isDeleting ? 40 : 80;
            if (!isDeleting && j === currentWord.length) { typeSpeed = 2500; isDeleting = true; } 
            else if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; typeSpeed = 500; }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    /* =========================================
       5. SCROLL REVEAL ANIMATIONS
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { 
                    entry.target.classList.add('visible'); 
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        revealElements.forEach(el => observer.observe(el));
    }

    /* =========================================
       6. SCROLL TO TOP BUTTON
    ========================================= */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => { scrollTopBtn.classList.toggle('show', window.scrollY > 500); });
        scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    /* =========================================
       10. PLAYBOOK LOGIC
    ========================================= */
    const playbookForm = document.getElementById('playbook-form');
    if (playbookForm) {
        playbookForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const submitBtn = playbookForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Opening...';
            window.open('/B2B_Growth_Playbook.pdf', '_blank');
            
            setTimeout(() => { 
                submitBtn.innerHTML = 'Enjoy!'; 
                setTimeout(() => { submitBtn.innerHTML = originalText; playbookForm.reset(); }, 3000); 
            }, 800);
        });
    }

    /* =========================================
       12. DYNAMIC LIVE STATUS WIDGET
    ========================================= */
    const statusWidget = document.getElementById('liveStatusBtn');
    const statusTextEl = document.getElementById('live-status-text');
    
    if (statusWidget && statusTextEl) {
        const statusMessages = ["Open to new B2B projects", "📍 Based in Dhaka, Bangladesh", "🎧 Listening to: My First Million", "📚 Reading: Hacking Growth", "⚡ Optimizing conversion rates..."];
        let statusIndex = 0, isHovered = false, isClicked = false;

        statusWidget.addEventListener('mouseenter', () => isHovered = true);
        statusWidget.addEventListener('mouseleave', () => isHovered = false);

        setInterval(() => {
            if (!isHovered && !isClicked) {
                statusTextEl.style.opacity = '0'; statusTextEl.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    statusIndex = (statusIndex + 1) % statusMessages.length;
                    statusTextEl.textContent = statusMessages[statusIndex];
                    statusTextEl.style.transform = 'translateY(10px)';
                    requestAnimationFrame(() => { statusTextEl.style.opacity = '1'; statusTextEl.style.transform = 'translateY(0)'; });
                }, 400); 
            }
        }, 4000);

        statusWidget.addEventListener('click', () => {
            isClicked = true;
            navigator.clipboard.writeText("fardinraafi@gmail.com").then(() => {
                statusTextEl.style.opacity = '0';
                setTimeout(() => { statusTextEl.textContent = "Copied email to clipboard! 📋"; statusTextEl.style.color = "#10B981"; statusTextEl.style.opacity = '1'; }, 200);
                setTimeout(() => {
                    statusTextEl.style.opacity = '0';
                    setTimeout(() => { statusTextEl.style.color = "var(--text-main)"; statusTextEl.textContent = statusMessages[statusIndex]; statusTextEl.style.opacity = '1'; isClicked = false; }, 200);
                }, 3000);
            });
        });
    }

    /* =========================================
       15. 🤖 FIFI CHATBOT LOGIC
    ========================================= */
    const openChatBtn = document.getElementById('openChatBtn'), closeChatBtn = document.getElementById('closeChatBtn'), chatModal = document.getElementById('chatModal');
    const chatGreeting = document.getElementById('chatGreeting'), chatOptions = document.getElementById('chatOptions'), chatLog = document.getElementById('chatLog'), resetChatBtn = document.getElementById('resetChatBtn');

    if (openChatBtn && closeChatBtn && chatModal) {
        openChatBtn.addEventListener('click', () => chatModal.classList.toggle('show'));
        closeChatBtn.addEventListener('click', () => chatModal.classList.remove('show'));
        document.addEventListener('click', (e) => { 
            if (chatModal.classList.contains('show') && !chatModal.contains(e.target) && !openChatBtn.contains(e.target)) {
                chatModal.classList.remove('show'); 
            }
        });
    }

    window.sendQuery = function(query) {
        if (chatGreeting) chatGreeting.style.display = 'none';
        if (chatOptions) chatOptions.style.display = 'none';
        if (resetChatBtn) resetChatBtn.style.display = 'block';

        const chatArea = document.getElementById('chatArea');

        const userMsg = document.createElement('div'); 
        userMsg.className = 'chat-bubble user-bubble'; 
        userMsg.textContent = query;
        if(chatLog) chatLog.appendChild(userMsg);
        if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;

        const loadingPhrases = ["Let me check on that...", "Fetching the details...", "Just a moment..."];
        const randomLoadingText = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];

        const aiLoadingMsg = document.createElement('div'); 
        aiLoadingMsg.className = 'chat-bubble ai-bubble';
        aiLoadingMsg.innerHTML = `<span style="opacity: 0.6; font-style: italic; display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 2s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> 
            ${randomLoadingText}
        </span>`;
        
        if (!document.getElementById('spinner-style')) {
            const style = document.createElement('style');
            style.id = 'spinner-style';
            style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
            document.head.appendChild(style);
        }

        if(chatLog) chatLog.appendChild(aiLoadingMsg);
        if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;

        setTimeout(() => {
            if (aiLoadingMsg.parentNode) aiLoadingMsg.parentNode.removeChild(aiLoadingMsg);

            const aiMsg = document.createElement('div'); 
            aiMsg.className = 'chat-bubble ai-bubble';
            
            if (query.includes('skills')) aiMsg.innerHTML = 'Fardin specializes in <strong>Brand Strategy</strong>, CRM management, and B2B Lead Generation.';
            else if (query.includes('B2B')) aiMsg.innerHTML = 'He has professional experience focused on B2B sales and Marketing at Augmex Technologies, enriching 40,000+ CRM records.';
            else if (query.includes('contact')) aiMsg.innerHTML = 'You can reach him directly through his <a href="/contact.html" style="color: var(--c1); font-weight: bold;">Contact Page</a>.';
            else if (query.includes('Resume')) aiMsg.innerHTML = 'You can view and download his full resume on his <a href="/resume.html" style="color: var(--c1); font-weight: bold;">Resume Page</a>.';
            else if (query.includes('academics')) aiMsg.innerHTML = 'Fardin holds a Bachelor of Business Administration (BBA) in Marketing from BUBT, graduating with an excellent CGPA of 3.80.';
            else if (query.includes('extracurriculars')) aiMsg.innerHTML = 'He has extensive leadership experience! Check out his <a href="/volunteer.html" style="color: var(--c1); font-weight: bold;">Leadership page</a> to learn more.';
            else aiMsg.textContent = 'Thanks for asking! Please explore the rest of the portfolio for more details.';
            
            if(chatLog) { 
                chatLog.appendChild(aiMsg); 
                if (chatArea) chatArea.scrollTop = chatArea.scrollHeight; 
            }
        }, 1000); 
    };

    if (resetChatBtn) {
        resetChatBtn.addEventListener('click', () => {
            if(chatLog) chatLog.innerHTML = '';
            if (chatGreeting) chatGreeting.style.display = 'block';
            if (chatOptions) chatOptions.style.display = 'grid';
            resetChatBtn.style.display = 'none';
        });
    }
});
