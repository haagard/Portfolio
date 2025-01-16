var projetText = document.getElementById("projetText");
if(projetText) {
      projetText.addEventListener("click", function () {
            var anchor = document.querySelector("[data-scroll-to='projet']");
            if(anchor) {
                  anchor.scrollIntoView({"block":"start","behavior":"smooth"})
            }
      });
}


var contactText = document.getElementById("contactText");
if(contactText) {
      contactText.addEventListener("click", function () {
            var anchor = document.querySelector("[data-scroll-to='contact']");
            if(anchor) {
                  anchor.scrollIntoView({"block":"start","behavior":"smooth"})
            }
      });
}

// Sélection des éléments
const toggleButton = document.querySelector('.toggle-button');
const contactBubble = document.querySelector('.contact-bubble');

// Fonction d’ouverture d'onglet
function opentab(tabName) {
const contents = document.querySelectorAll('.tab-contents');
const links = document.querySelectorAll('.tab-links');

contents.forEach(content => content.classList.remove('active-tab'));
links.forEach(link => link.classList.remove('active-link'));

document.getElementById(tabName).classList.add('active-tab');
document.querySelector(`.tab-links[onclick="opentab('${tabName}')"]`).classList.add('active-link');
}

// Assure-toi que l'élément existe avant d'essayer de l'utiliser
const scrollArrow = document.getElementById('scroll-arrow');

// Vérifie si l'élément existe
if (scrollArrow) {
    // Fonction pour afficher ou cacher la flèche en fonction du défilement et de la taille de l'écran
    function toggleScrollArrow() {
        // Si la largeur de l'écran est supérieure à 720px, on contrôle l'affichage de la flèche en fonction du défilement
        if (window.innerWidth > 720) {
            const halfPageHeight = document.documentElement.scrollHeight / 2; // 50% de la hauteur totale de la page

            // La flèche apparaît lorsque l'utilisateur a défilé à 50% de la hauteur de la page
            if (window.scrollY >= halfPageHeight) {
                scrollArrow.classList.remove('hidden');
                scrollArrow.style.opacity = 1;
            } else {
                scrollArrow.classList.add('hidden');
                scrollArrow.style.opacity = 0;
            }
        } else {
            // Si la largeur de l'écran est inférieure ou égale à 720px, on cache la flèche
            scrollArrow.classList.add('hidden');
            scrollArrow.style.opacity = 0;
        }
    }

    // Fonction pour faire défiler la page vers le haut en douceur
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Lorsque l'utilisateur clique sur la flèche, on fait défiler la page vers le haut
    scrollArrow.addEventListener('click', scrollToTop);

    // Écouteur d'événements pour le défilement
    window.addEventListener('scroll', toggleScrollArrow);

    // Initialisation pour contrôler l'affichage de la flèche dès le début
    toggleScrollArrow();

    // Réajuster la visibilité de la flèche lorsqu'on redimensionne la fenêtre
    window.addEventListener('resize', toggleScrollArrow);
} else {
    console.error('L\'élément #scroll-arrow n\'a pas été trouvé.');
}

// Modal script avec carrousel
function setupModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    // Récupérer tous les carrousels
    const carousels = document.querySelectorAll('.carousel');

    // Pour chaque carrousel, on met en place le comportement de la modal
    carousels.forEach((carousel, index) => {
        const images = carousel.querySelectorAll('img');
        images.forEach((img, imgIndex) => {
            img.addEventListener("click", function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
                currentCarouselIndex = imgIndex;  // Garder la trace de l'index dans le carrousel
                updateCarousel(carousel, currentCarouselIndex);  // Met à jour le carrousel dans la modal
            });
        });
    });

    closeBtn.onclick = () => modal.style.display = "none";

    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Fonction pour afficher l'image suivante / précédente dans le carrousel dans la modal
    const prevBtn = document.getElementById('prevModal');
    const nextBtn = document.getElementById('nextModal');

    prevBtn.addEventListener('click', function() {
        moveCarousel(-1);
    });

    nextBtn.addEventListener('click', function() {
        moveCarousel(1);
    });

    // Fonction pour mettre à jour le carrousel
    function updateCarousel(carousel, index) {
        const images = carousel.querySelectorAll('img');
        modalImg.src = images[index].src;
        captionText.innerHTML = images[index].alt;
    }

    // Fonction pour déplacer l'image dans le carrousel
    let currentCarouselIndex = 0;
    function moveCarousel(direction) {
        const carousel = document.querySelectorAll('.carousel')[0];  // Choisir un carrousel
        const images = carousel.querySelectorAll('img');
        currentCarouselIndex += direction;

        if (currentCarouselIndex < 0) {
            currentCarouselIndex = images.length - 1;
        } else if (currentCarouselIndex >= images.length) {
            currentCarouselIndex = 0;
        }

        updateCarousel(carousel, currentCarouselIndex);
    }
}
document.addEventListener("DOMContentLoaded", setupModal);

document.addEventListener("DOMContentLoaded", function() {
    // Initialiser les carrousels
    initCarousel('carousel1');
    initCarousel('carousel2');
    initCarousel('carousel3');
});

function initCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll(".carousel img");
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Affiche la première image
    slides[currentIndex].classList.add('active');

    // Gestion des clics sur les boutons de navigation
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    prevButton.addEventListener('click', function() {
        moveSlide(-1, slides, totalSlides);
        resetAutoScroll();  // Réinitialiser le défilement automatique
    });

    nextButton.addEventListener('click', function() {
        moveSlide(1, slides, totalSlides);
        resetAutoScroll();  // Réinitialiser le défilement automatique
    });

    // Défilement automatique
    let autoScrollInterval = setInterval(function() {
        moveSlide(1, slides, totalSlides);
    }, 7000);  // Change l'image toutes les 3 secondes

    // Fonction pour déplacer le carrousel
    function moveSlide(direction, slides, totalSlides) {
        let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains("active"));
        
        // Masquer l'image active
        slides[currentIndex].classList.remove("active");

        // Calculer le nouvel index
        currentIndex += direction;

        // Gérer les bordures (revenir au début ou à la fin)
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }

        // Afficher la nouvelle image
        slides[currentIndex].classList.add("active");
    }

    // Fonction pour réinitialiser le défilement automatique
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);  // Arrêter le défilement automatique
        autoScrollInterval = setInterval(function() {
            moveSlide(1, slides, totalSlides);
        }, 3000);  // Redémarrer le défilement automatique
    }
}





