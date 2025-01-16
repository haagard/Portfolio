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
    // Affiche ou cache la flèche en fonction du défilement
    function toggleScrollArrow() {
        const halfPageHeight = document.documentElement.scrollHeight / 2; // 50% de la hauteur totale de la page

        if (window.scrollY >= halfPageHeight) { // La flèche apparaît à 50% de la hauteur de la page
            scrollArrow.classList.remove('hidden');
            scrollArrow.style.opacity = 1;
        } else {
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
} else {
    console.error('L\'élément #scroll-arrow n\'a pas été trouvé.');
}
// Modal script
function setupModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    document.querySelectorAll(".clickable-image").forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    closeBtn.onclick = () => modal.style.display = "none";

    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
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
        moveSlide(-1, carouselId, slides, totalSlides);
    });

    nextButton.addEventListener('click', function() {
        moveSlide(1, carouselId, slides, totalSlides);
    });
}

function moveSlide(direction, carouselId, slides, totalSlides) {
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



