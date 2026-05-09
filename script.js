const tlacitkoNahoru = document.querySelector(".nahoru");
const menu = document.querySelector(".menu");
const menuOdkazy = document.querySelectorAll(".menu a");
const sekce = document.querySelectorAll("section");

window.addEventListener("scroll", function () {
  tlacitkoNahoru.classList.toggle("zobrazit", window.scrollY > 250);
  menu.classList.toggle("scrolled", window.scrollY > 60);
  nastavAktivniMenu();
});

tlacitkoNahoru.addEventListener("click", function (event) {
  event.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

function nastavAktivniMenu() {
  let aktualniSekce = "";

  const jeKonecStranky =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

  if (jeKonecStranky) {
    aktualniSekce = "kontakt";
  } else {
    sekce.forEach(function (section) {
      const sectionTop = section.offsetTop - 140;

      if (window.scrollY >= sectionTop) {
        aktualniSekce = section.getAttribute("id");
      }
    });
  }

  menuOdkazy.forEach(function (odkaz) {
    odkaz.classList.remove("active-menu");

    if (odkaz.getAttribute("href") === "#" + aktualniSekce) {
      odkaz.classList.add("active-menu");
    }
  });
}

/* HORNÍ SLIDESHOW */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

let aktualniSlide = 0;
let slideshowTimer;

function zobrazSlide(index) {
  slides.forEach(function (slide) {
    slide.classList.remove("active");
  });

  dots.forEach(function (dot) {
    dot.classList.remove("active-dot");
  });

  aktualniSlide = index;
  slides[aktualniSlide].classList.add("active");
  dots[aktualniSlide].classList.add("active-dot");
}

function dalsiSlide() {
  let novyIndex = aktualniSlide + 1;

  if (novyIndex >= slides.length) {
    novyIndex = 0;
  }

  zobrazSlide(novyIndex);
}

function predchoziSlide() {
  let novyIndex = aktualniSlide - 1;

  if (novyIndex < 0) {
    novyIndex = slides.length - 1;
  }

  zobrazSlide(novyIndex);
}

function spustCasovac() {
  slideshowTimer = setInterval(dalsiSlide, 5000);
}

function restartujCasovac() {
  clearInterval(slideshowTimer);
  spustCasovac();
}

rightArrow.addEventListener("click", function () {
  dalsiSlide();
  restartujCasovac();
});

leftArrow.addEventListener("click", function () {
  predchoziSlide();
  restartujCasovac();
});

dots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    zobrazSlide(index);
    restartujCasovac();
  });
});

spustCasovac();

/* DVĚ SAMOSTATNÉ GALERIE */

const heroGallery = Array.from(document.querySelectorAll('[data-gallery="hero"]'));
const workGallery = Array.from(document.querySelectorAll('[data-gallery="work"]'));

const galleries = {
  hero: heroGallery,
  work: workGallery
};

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxLeft = document.querySelector(".lightbox-left");
const lightboxRight = document.querySelector(".lightbox-right");
const lightboxCounter = document.querySelector(".lightbox-counter");

let otevrenaGalerie = [];
let aktualniLightbox = 0;

function otevriLightbox(nazevGalerie, index) {
  otevrenaGalerie = galleries[nazevGalerie];
  aktualniLightbox = index;

  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";

  zobrazLightboxFotku();
}

function zavriLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function zobrazLightboxFotku() {
  const fotka = otevrenaGalerie[aktualniLightbox];

  lightboxImg.src = fotka.src;
  lightboxCounter.textContent =
    aktualniLightbox + 1 + " / " + otevrenaGalerie.length;
}

function dalsiLightboxFotka() {
  aktualniLightbox++;

  if (aktualniLightbox >= otevrenaGalerie.length) {
    aktualniLightbox = 0;
  }

  zobrazLightboxFotku();
}

function predchoziLightboxFotka() {
  aktualniLightbox--;

  if (aktualniLightbox < 0) {
    aktualniLightbox = otevrenaGalerie.length - 1;
  }

  zobrazLightboxFotku();
}

heroGallery.forEach(function (fotka, index) {
  fotka.addEventListener("click", function () {
    otevriLightbox("hero", index);
  });
});

workGallery.forEach(function (fotka, index) {
  fotka.addEventListener("click", function () {
    otevriLightbox("work", index);
  });
});

lightboxClose.addEventListener("click", zavriLightbox);
lightboxRight.addEventListener("click", dalsiLightboxFotka);
lightboxLeft.addEventListener("click", predchoziLightboxFotka);

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    zavriLightbox();
  }
});

document.addEventListener("keydown", function (event) {
  if (!lightbox.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    zavriLightbox();
  }

  if (event.key === "ArrowRight") {
    dalsiLightboxFotka();
  }

  if (event.key === "ArrowLeft") {
    predchoziLightboxFotka();
  }
});

nastavAktivniMenu();