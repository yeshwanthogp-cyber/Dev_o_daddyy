/* ==========================================================================
   DEV DADDYY - INTERACTIVE JAVASCRIPT CONTROLLER (MOBILE OPTIMIZED)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. Sticky Navbar & Mobile Navigation
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinksContainer.classList.contains('mobile-active');
            
            if (isOpen) {
                navLinksContainer.classList.remove('mobile-active');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            } else {
                navLinksContainer.classList.add('mobile-active');
                mobileToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            }
        });

        // Close mobile menu when clicking any link inside
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('mobile-active');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinksContainer.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinksContainer.classList.remove('mobile-active');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    }

    /* ----------------------------------------------------------------------
       2. Live Project Preview Modal & Device Switcher
       ---------------------------------------------------------------------- */
    const modal = document.getElementById('preview-modal');
    const modalTitle = document.getElementById('modal-project-title');
    const modalExternalLink = document.getElementById('modal-external-link');
    const iframe = document.getElementById('project-preview-iframe');
    const iframeWrapper = document.getElementById('iframe-wrapper');
    const closeBtn = document.getElementById('modal-close-btn');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const deviceBtns = document.querySelectorAll('.device-btn');

    if (modal && iframe) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectUrl = btn.getAttribute('data-url');
                const projectTitle = btn.getAttribute('data-title');

                if (projectUrl) {
                    iframe.src = projectUrl;
                    if (modalExternalLink) {
                        let vercelUrl = projectUrl;
                        if (projectUrl.includes('bajaj')) {
                            vercelUrl = 'https://dev-o-daddyy.vercel.app/';
                        } else if (projectUrl.includes('rcbb')) {
                            vercelUrl = 'https://rcbbb.vercel.app/';
                        }
                        modalExternalLink.href = vercelUrl;
                        modalExternalLink.style.display = 'inline-flex';
                    }
                    if (modalTitle) {
                        modalTitle.innerText = projectTitle || 'Project Preview';
                    }
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            modal.classList.remove('active');
            iframe.src = 'about:blank';
            document.body.style.overflow = 'auto';
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Device Switcher
    if (iframeWrapper) {
        deviceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                deviceBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const device = btn.getAttribute('data-device');
                iframeWrapper.className = `iframe-frame-wrapper device-${device}`;
            });
        });
    }
});
