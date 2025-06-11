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

});
