document.addEventListener('DOMContentLoaded', function() {

    // -------------------- MENU HAMBURGUESA --------------------
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    const toggleMenu = (state) => {
        const isActive = state === 'toggle' ? !navMenu.classList.contains('active') : state;
        navMenu.classList.toggle('active', isActive);
        hamburger.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    };

    // Botón hamburguesa
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => toggleMenu('toggle'));

        // Cerrar menú si se hace click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.matches('.nav-menu, .nav-menu *') && !e.target.matches('.hamburger, .hamburger *')) {
                toggleMenu(false);
            }
        });

        // Cerrar menú al clickear en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));

        // Cerrar menú si se agranda la pantalla
        window.addEventListener('resize', (() => {
            let resizeTimeout;
            return () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (window.innerWidth > 768) toggleMenu(false);
                }, 100);
            };
        })());
    }

    // -------------------- CAROUSEL --------------------
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    let intervalId = null;
    let interactionTimeout = null;

    if (images.length > 0 && prevBtn && nextBtn) {
        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            if (index >= images.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = images.length - 1;
            } else {
                currentIndex = index;
            }
            images[currentIndex].classList.add('active');
            console.log('Cambiando a imagen:', currentIndex);
        }

        function nextImage() {
            showImage(currentIndex + 1);
        }

        function prevImage() {
            showImage(currentIndex - 1);
        }

        function startInterval() {
            stopInterval();
            intervalId = setInterval(nextImage, 3000);
        }

        function stopInterval() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        function resetInteractionTimeout() {
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(startInterval, 5000);
        }

        nextBtn.addEventListener('click', function() {
            nextImage();
            resetInteractionTimeout();
        });

        prevBtn.addEventListener('click', function() {
            prevImage();
            resetInteractionTimeout();
        });

        [prevBtn, nextBtn].forEach(button => {
            button.addEventListener('mouseenter', stopInterval);
            button.addEventListener('mouseleave', resetInteractionTimeout);
        });

        // Inicialización
        showImage(0);
        startInterval();
        resetInteractionTimeout();

        console.log('Carrusel inicializado');
        console.log('Número de imágenes:', images.length);
    }

    // -------------------- FILTROS Y LINKS DE PROYECTOS --------------------
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const proyectoCards = document.querySelectorAll('.proyecto-card');

    if (filtroBtns.length > 0 && proyectoCards.length > 0) {
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filtroBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const categoria = this.textContent.toLowerCase();

                proyectoCards.forEach(card => {
                    if (categoria === 'todos') {
                        card.style.display = 'block';
                    } else {
                        if (card.dataset.categoria === categoria) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });

    }


    // --- EmailJS: inicialización y envío del formulario ---
    document.addEventListener('DOMContentLoaded', () => {
    // 1) Inicializar EmailJS con tu Public Key
    emailjs.init('YOUR_PUBLIC_KEY'); // <-- poné tu Public Key

    const form = document.getElementById('contactForm');
    if (!form) return; // por si este JS carga en páginas sin el form

    const btn = document.getElementById('sendBtn');
    const statusEl = document.getElementById('formStatus');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 2) Honeypot anti-bots (si lo completan, no enviamos)
        const gotcha = document.getElementById('gotcha');
        if (gotcha && gotcha.value.trim() !== '') return;

        // 3) Armar los datos a enviar (los "name" del HTML deben coincidir)
        const templateParams = {
            from_name: form.from_name.value.trim(),
            from_email: form.from_email.value.trim(),
            phone: form.phone.value.trim(),
            city: form.city.value.trim(),
            square_meters: form.square_meters.value.trim(),
            message: form.message.value.trim(),
            page_url: window.location.href,
            timestamp: new Date().toLocaleString(),
        };

        // 4) UI: estado cargando
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Enviando…';
        }
        if (statusEl) {
            statusEl.textContent = '';
            statusEl.style.color = '';
        }

        try {
            // 5) Enviar por EmailJS
            await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
            if (statusEl) {
                statusEl.textContent = '¡Gracias! Tu mensaje fue enviado correctamente.';
                statusEl.style.color = '#2e7d32';
            }
            form.reset();
        } catch (err) {
            console.error(err);
            if (statusEl) {
                statusEl.textContent =
                'Hubo un problema al enviar. Intentá nuevamente o escribinos por Instagram/email.';
                statusEl.style.color = '#c62828';
            }
        } finally {
            // 6) Restaurar botón
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Enviar';
            }
        }
    });
    });


});
