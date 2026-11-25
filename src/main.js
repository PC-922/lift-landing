import { landingConfig } from "./config.js";

const translations = {
  es: {
    languageLabel: "Idioma",
    pageTitle: "LIFT — Entrena. Registra. Progresa.",
    pageDescription: "Entrena a tu manera con LIFT. Organiza tus rutinas, registra cada sesión y sigue tu evolución.",
    carouselLabel: "Capturas de la app LIFT",
    carouselControlsLabel: "Controles de las capturas",
    carouselRoleDescription: "carrusel",
    slideRoleDescription: "diapositiva",
    eyebrow: "Entrena a tu manera",
    headlineFirst: "Entrena. Registra.",
    headlineSecond: "Progresa.",
    description: "Organiza tus rutinas, registra cada sesión y sigue tu evolución.",
    webCta: "Abrir Lift Web",
    iosCta: "Descargar para iOS",
    androidNote: "En Android, puedes instalar Lift Web desde el navegador.",
    previousImage: "Captura anterior",
    nextImage: "Siguiente captura",
    chooseImage: "Elegir captura",
    slidePosition: "Captura {index} de {count}",
    routineImageAlt: "Detalle de una rutina de entrenamiento con ejercicios organizados.",
    workoutImageAlt: "Entrenamiento en curso con series y temporizador de descanso.",
    trendsImageAlt: "Estadísticas con tendencias de peso y repeticiones.",
    progressImageAlt: "Resumen de progreso con cambios recientes y mejores pesos.",
    featuresLabel: "Características de LIFT",
    featureRoutinesTitle: "Rutinas flexibles",
    featureRoutinesBody: "Organiza tus entrenamientos como mejor te encaje.",
    featureLogTitle: "Registro a tu ritmo",
    featureLogBody: "Anota series, peso y repeticiones de forma clara.",
    featureProgressTitle: "Sigue tu progreso",
    featureProgressBody: "Observa tu evolución y mantén la constancia.",
    resourcesLabel: "Recursos de LIFT",
    webPrivacy: "Privacidad de LIFT Web",
    iosPrivacy: "Privacidad de iOS",
    iosSupport: "Soporte de iOS",
    iosPending: "Añade el enlace de App Store en src/config.js",
  },
  en: {
    languageLabel: "Language",
    pageTitle: "LIFT — Train. Track. Progress.",
    pageDescription: "Train your way with LIFT. Organize your routines, log every session, and follow your progress.",
    carouselLabel: "LIFT app screenshots",
    carouselControlsLabel: "Screenshot controls",
    carouselRoleDescription: "carousel",
    slideRoleDescription: "slide",
    eyebrow: "Train your way",
    headlineFirst: "Train. Track.",
    headlineSecond: "Progress.",
    description: "Organize your routines, log every session, and follow your progress.",
    webCta: "Open Lift Web",
    iosCta: "Download for iOS",
    androidNote: "On Android, install Lift Web from your browser.",
    previousImage: "Previous screenshot",
    nextImage: "Next screenshot",
    chooseImage: "Choose screenshot",
    slidePosition: "Screenshot {index} of {count}",
    routineImageAlt: "A workout routine with its exercises organized.",
    workoutImageAlt: "An active workout showing sets and a rest timer.",
    trendsImageAlt: "Statistics showing weight and repetition trends.",
    progressImageAlt: "Progress summary with recent changes and recent bests.",
    featuresLabel: "LIFT features",
    featureRoutinesTitle: "Flexible routines",
    featureRoutinesBody: "Organize your workouts to fit the way you train.",
    featureLogTitle: "Log at your pace",
    featureLogBody: "Track sets, weight, and reps clearly.",
    featureProgressTitle: "Follow your progress",
    featureProgressBody: "See your progress and stay consistent.",
    resourcesLabel: "LIFT resources",
    webPrivacy: "LIFT Web privacy",
    iosPrivacy: "iOS privacy",
    iosSupport: "iOS support",
    iosPending: "Add the App Store link in src/config.js",
  },
};

const logo = document.querySelector(".brand__mark");
if (logo) logo.src = landingConfig.logo;

const webLink = document.querySelector('[data-link="web"]');
if (webLink) webLink.href = landingConfig.links.web;

const iosLink = document.querySelector('[data-link="ios"]');
if (iosLink) {
  const storeUrl = landingConfig.links.iosAppStore.trim();
  const language = document.documentElement.lang === "en" ? "en" : "es";
  iosLink.href = storeUrl || "#ios-link-pending";
  iosLink.setAttribute("aria-disabled", String(!storeUrl));
  iosLink.title = storeUrl ? "" : translations[language].iosPending;
  if (!storeUrl) iosLink.addEventListener("click", (event) => event.preventDefault());
}

const carousel = document.querySelector(".product-carousel");
const slidesContainer = document.querySelector("[data-carousel-slides]");
const dotsContainer = document.querySelector("[data-carousel-dots]");
const statusMessage = document.querySelector("[data-carousel-status]");
const previousButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const screenshots = landingConfig.screenshots || [];
const slides = [];
const dots = [];
let activeIndex = 0;
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let swipeStart = null;
let autoplayTimer;

function currentCopy() {
  return translations[document.documentElement.lang] || translations.es;
}

function updateCarouselLanguage() {
  if (!carousel) return;
  const copy = currentCopy();
  carousel.setAttribute("aria-label", copy.carouselLabel);
  carousel.setAttribute("aria-roledescription", copy.carouselRoleDescription);
  document.querySelector("[data-carousel-controls]")?.setAttribute("aria-label", copy.carouselControlsLabel);
  previousButton?.setAttribute("aria-label", copy.previousImage);
  nextButton?.setAttribute("aria-label", copy.nextImage);
  dotsContainer?.setAttribute("aria-label", copy.chooseImage);

  slides.forEach((slide, index) => {
    const alt = copy[screenshots[index].altKey] || "";
    slide.setAttribute("aria-roledescription", copy.slideRoleDescription);
    slide.setAttribute("aria-label", copy.slidePosition.replace("{index}", index + 1).replace("{count}", slides.length));
    slide.querySelector("img").alt = alt;
    dots[index].setAttribute("aria-label", `${copy.chooseImage}: ${alt}`);
  });

}

function updateSlides(announce = false) {
  const copy = currentCopy();
  slides.forEach((slide, index) => {
    const active = index === activeIndex;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-hidden", String(!active));
    dots[index].setAttribute("aria-current", String(active));
  });

  if (announce && statusMessage) {
    statusMessage.textContent = copy.slidePosition.replace("{index}", activeIndex + 1).replace("{count}", slides.length);
  }
}

function scheduleAutoplay() {
  window.clearTimeout(autoplayTimer);
  const canAdvance = carousel && screenshots.length > 1 && !motionPreference.matches && !swipeStart && !document.hidden;
  if (!canAdvance) return;
  autoplayTimer = window.setTimeout(() => goToSlide(activeIndex + 1, false), landingConfig.carouselIntervalMs);
}

function goToSlide(index, manual = true) {
  if (!slides.length) return;
  activeIndex = (index + slides.length) % slides.length;
  updateSlides(manual);
  updateCarouselLanguage();
  scheduleAutoplay();
}

if (carousel && slidesContainer && dotsContainer && screenshots.length) {
  screenshots.forEach((screenshot, index) => {
    const slide = document.createElement("figure");
    slide.className = "carousel-slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", translations.es.slideRoleDescription);
    slide.setAttribute("aria-hidden", "true");

    const image = new Image();
    image.src = screenshot.src;
    image.alt = "";
    image.decoding = "async";
    slide.append(image);
    slidesContainer.append(slide);
    slides.push(slide);

    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.append(dot);
    dots.push(dot);
  });

  previousButton?.addEventListener("click", () => goToSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => goToSlide(activeIndex + 1));
  const screen = document.querySelector("[data-carousel-screen]");
  screen?.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.pointerType !== "touch") return;
    swipeStart = { id: event.pointerId, x: event.clientX };
    screen.setPointerCapture(event.pointerId);
    scheduleAutoplay();
  });
  screen?.addEventListener("pointerup", (event) => {
    if (swipeStart?.id !== event.pointerId) return;
    const distance = event.clientX - swipeStart.x;
    swipeStart = null;
    if (Math.abs(distance) > 40) goToSlide(activeIndex + (distance < 0 ? 1 : -1));
    else scheduleAutoplay();
  });
  screen?.addEventListener("lostpointercapture", (event) => {
    if (swipeStart?.id !== event.pointerId) return;
    swipeStart = null;
    scheduleAutoplay();
  });
  document.addEventListener("visibilitychange", scheduleAutoplay);
  motionPreference.addEventListener?.("change", scheduleAutoplay);

  updateSlides();
  updateCarouselLanguage();
  scheduleAutoplay();
}

function setLanguage(language) {
  const copy = translations[language];
  if (!copy) return;
  document.documentElement.lang = language;
  document.title = copy.pageTitle;
  document.querySelector('meta[name="description"]').content = copy.pageDescription;
  document.querySelector(".language-switch").setAttribute("aria-label", copy.languageLabel);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (key && copy[key]) element.textContent = copy[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (key && copy[key]) element.setAttribute("aria-label", copy[key]);
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (iosLink && !landingConfig.links.iosAppStore.trim()) iosLink.title = copy.iosPending;
  updateCarouselLanguage();
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.language;
    if (language === "en" || language === "es") setLanguage(language);
  });
});

setLanguage("es");
