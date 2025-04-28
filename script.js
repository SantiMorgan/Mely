// -------------------- MENU HAMBURGUESA (MEJORADO) --------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

const toggleMenu = (state) => {
    const isActive = state === 'toggle' ? !navMenu.classList.contains('active') : state;
    navMenu.classList.toggle('active', isActive);
    hamburger.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
};

hamburger.addEventListener('click', () => toggleMenu('toggle'));

document.addEventListener('click', (e) => {
    if (!e.target.matches('.nav-menu, .nav-menu *') && !e.target.matches('.hamburger, .hamburger *')) {
        toggleMenu(false);
    }
});

document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));

window.addEventListener('resize', (() => {
    let resizeTimeout;
    return () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768) toggleMenu(false);
        }, 100);
    };
})());


// -------------------- CAROUSEL (VERSIÓN OPTIMIZADA) --------------------
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    let intervalId = null;
    let interactionTimeout = null; // Nuevo timeout para la interacción

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
        interactionTimeout = setTimeout(startInterval, 5000); // Reiniciar después de 5 segundos de inactividad
    }

    nextBtn.addEventListener('click', function() {
        nextImage();
        resetInteractionTimeout(); // Reiniciar el timeout
    });

    prevBtn.addEventListener('click', function() {
        prevImage();
        resetInteractionTimeout(); // Reiniciar el timeout
    });

    [prevBtn, nextBtn].forEach(button => {
        button.addEventListener('mouseenter', stopInterval);
        button.addEventListener('mouseleave', resetInteractionTimeout); // Usar el timeout aquí
    });

    showImage(0);
    startInterval();
    resetInteractionTimeout(); // Iniciar el timeout al cargar la página

    console.log('Carrusel inicializado');
    console.log('Número de imágenes:', images.length);
});

// Script específico para la página de proyectos
document.addEventListener('DOMContentLoaded', function() {
    // Activar menú hamburguesa (para mantener consistencia con el script principal)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Filtros de proyectos
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filtroBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener categoría a filtrar
            const categoria = this.textContent.toLowerCase();
            
            // Mostrar/ocultar proyectos según la categoría
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
    
    // Enlaces de proyectos
    const proyectoLinks = document.querySelectorAll('.proyecto-link');
    proyectoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const nombreProyecto = this.closest('.proyecto-card').querySelector('.proyecto-titulo').textContent;
            console.log('Proyecto seleccionado:', nombreProyecto);
            // Aquí podría ir el código para navegar a una página detallada del proyecto
            // window.location.href = 'proyecto-detalle.html?proyecto=' + encodeURIComponent(nombreProyecto);
        });
    });
});