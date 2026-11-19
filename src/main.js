import { landingConfig } from "./config.js";

const translations = {
  es: {
    languageLabel: "Idioma",
    pageTitle: "LIFT — Entrena. Registra. Progresa.",
    pageDescription: "Entrena a tu manera con LIFT. Organiza tus rutinas, registra cada sesión y sigue tu evolución.",
    previewsLabel: "Vistas de LIFT",
    featuresLabel: "Características de LIFT",
    eyebrow: "Entrena a tu manera",
    headlineFirst: "Entrena. Registra.",
    headlineSecond: "Progresa.",
    description: "Organiza tus rutinas, registra cada sesión y sigue tu evolución.",
    webCta: "Abrir Lift Web",
    iosCta: "Descargar para iOS",
    androidNote: "En Android, puedes instalar Lift Web desde el navegador.",
    routineScreenTitle: "Rutina - Día A",
    exerciseOne: "Press inclinado",
    exerciseTwo: "Apertura de hombro en máquina",
    exerciseThree: "Aperturas con mancuernas",
    setsEight: "3 series × 8 repeticiones",
    setsTwelve: "3 series × 12 repeticiones",
    startRoutine: "▶ Iniciar rutina",
    workoutScreenTitle: "Rutina A",
    exerciseCount: "2 de 5",
    setCaption: "Serie 2 de 3",
    rest: "Descanso",
    statsScreenTitle: "Estadísticas",
    fourWeeks: "4 sem",
    twelveWeeks: "12 sem",
    oneYear: "1 año",
    volumeTitle: "Volumen de entrenamiento",
    strengthTitle: "Evolución de fuerza",
    featureRoutinesTitle: "Rutinas flexibles",
    featureRoutinesBody: "Organiza tus entrenamientos como mejor te encaje.",
    featureLogTitle: "Registro a tu ritmo",
    featureLogBody: "Anota series, peso y repeticiones de forma clara.",
    featureProgressTitle: "Sigue tu progreso",
    featureProgressBody: "Observa tu evolución y mantén la constancia.",
    iosPending: "Añade el enlace de App Store en src/config.js",
  },
  en: {
    languageLabel: "Language",
    pageTitle: "LIFT — Train. Track. Progress.",
    pageDescription: "Train your way with LIFT. Organize your routines, log every session, and follow your progress.",
    previewsLabel: "LIFT app previews",
    featuresLabel: "LIFT features",
    eyebrow: "Train your way",
    headlineFirst: "Train. Track.",
    headlineSecond: "Progress.",
    description: "Organize your routines, log every session, and follow your progress.",
    webCta: "Open Lift Web",
    iosCta: "Download for iOS",
    androidNote: "On Android, install Lift Web from your browser.",
    routineScreenTitle: "Routine - Day A",
    exerciseOne: "Incline press",
    exerciseTwo: "Machine shoulder fly",
    exerciseThree: "Dumbbell flyes",
    setsEight: "3 sets × 8 reps",
    setsTwelve: "3 sets × 12 reps",
    startRoutine: "▶ Start routine",
    workoutScreenTitle: "Routine A",
    exerciseCount: "2 of 5",
    setCaption: "Set 2 of 3",
    rest: "Rest",
    statsScreenTitle: "Statistics",
    fourWeeks: "4 wk",
    twelveWeeks: "12 wk",
    oneYear: "1 yr",
    volumeTitle: "Training volume",
    strengthTitle: "Strength progress",
    featureRoutinesTitle: "Flexible routines",
    featureRoutinesBody: "Organize your workouts to fit the way you train.",
    featureLogTitle: "Log at your pace",
    featureLogBody: "Track sets, weight, and reps clearly.",
    featureProgressTitle: "Follow your progress",
    featureProgressBody: "See your progress and stay consistent.",
    iosPending: "Add the App Store link in src/config.js",
  },
};

const logo = document.querySelector(".brand__logo");
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

for (const [name, source] of Object.entries(landingConfig.previews)) {
  if (!source) continue;
  const screen = document.querySelector(`[data-preview="${name}"] .phone__screen`);
  if (!screen) continue;

  const image = new Image();
  image.className = "phone__image";
  image.alt = "";
  image.addEventListener("load", () => screen.replaceChildren(image), { once: true });
  image.src = source;
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

  if (iosLink && !landingConfig.links.iosAppStore.trim()) {
    iosLink.title = copy.iosPending;
  }
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.language;
    if (language === "en" || language === "es") setLanguage(language);
  });
});

setLanguage("es");
