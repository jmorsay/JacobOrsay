const languageButtons = document.querySelectorAll("[data-set-language]");
const englishNodes = document.querySelectorAll(".lang-en");
const spanishNodes = document.querySelectorAll(".lang-es");
const storageKey = "jacob-orsay-site-language";

function getStoredLanguage() {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function storeLanguage(language) {
  try {
    localStorage.setItem(storageKey, language);
  } catch {
    // Local files can be opened in browsers that block storage. The toggle should still work for the session.
  }
}

function setLanguage(language) {
  const useSpanish = language === "es";
  document.documentElement.dataset.language = useSpanish ? "es" : "en";
  document.documentElement.lang = useSpanish ? "es" : "en";

  englishNodes.forEach((node) => {
    node.hidden = useSpanish;
  });

  spanishNodes.forEach((node) => {
    node.hidden = !useSpanish;
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.setLanguage === document.documentElement.dataset.language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  storeLanguage(document.documentElement.dataset.language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.setLanguage));
});

const storedLanguage = getStoredLanguage();
if (storedLanguage === "es") {
  setLanguage("es");
}
