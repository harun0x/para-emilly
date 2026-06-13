(() => {
  "use strict";

  const content = window.SITE_CONTENT || SITE_CONTENT;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pagesRoot = $("#pages");
  const experience = $("#experience");
  const soundtrack = $("#soundtrack");
  const audioButton = $("#audioButton");
  const audioText = $("#audioText");
  const progressFill = $("#progressFill");
  const pageCounter = $("#pageCounter");
  const previousButton = $("#previousButton");
  const nextButton = $("#nextButton");
  const chapterMenu = $("#chapterMenu");
  const menuButton = $("#menuButton");
  const chapterList = $("#chapterList");
  const toast = $("#toast");
  const photoViewer = $("#photoViewer");
  let currentIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let wheelAccumulator = 0;
  let wheelLock = false;
  let toastTimer;

  document.title = content.pageTitle;
  document.documentElement.lang = "pt-BR";
  $("meta[name='description']").content = content.description;
  $("#siteMark").textContent = content.siteMark;
  soundtrack.src = content.music.file;
  soundtrack.volume = Math.min(1, Math.max(0, Number(content.music.volume) || .4));

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[char]);
  }

  function paragraphs(items = [], className = "") {
    return items.map(item => `<p${className ? ` class="${className}"` : ""}>${escapeHTML(item)}</p>`).join("");
  }

  function heading(page) {
    return `
      <div class="page__heading">
        ${page.number ? `<p class="page__number">${escapeHTML(page.number)}</p>` : ""}
        ${page.eyebrow ? `<p class="overline">${escapeHTML(page.eyebrow)}</p>` : ""}
        <h2 class="page__title">${escapeHTML(page.title)}</h2>
        ${page.text ? `<p class="page__text">${escapeHTML(page.text)}</p>` : ""}
      </div>`;
  }

  function renderPage(page, index) {
    const common = `class="page page--${page.type}" data-page-index="${index}" aria-label="${escapeHTML(page.nav || `Página ${index + 1}`)}"`;

    if (page.type === "cover") return `
      <section ${common}>
        <div class="cover-bg"><img src="${escapeHTML(page.image)}" alt="${escapeHTML(page.alt || "")}"></div>
        <div class="page__inner page__inner--center">
          <div class="cover-content page-content">
            <p class="overline">${escapeHTML(page.eyebrow)}</p>
            <h2 class="page__title cover-title">${escapeHTML(page.title)}</h2>
            <p class="page__text cover-text">${escapeHTML(page.text)}</p>
          </div>
          <span class="cover-index" aria-hidden="true">00</span>
        </div>
      </section>`;

    if (page.type === "manifesto") return `
      <section ${common}>
        <div class="page__inner page__inner--center">
          <div class="manifesto-layout page-content">
            ${heading(page)}
            <div>
              <div class="manifesto-copy">${paragraphs(page.paragraphs)}</div>
              <div class="manifesto-accent">${escapeHTML(page.accent)}</div>
            </div>
          </div>
        </div>
      </section>`;

    if (page.type === "origin") return `
      <section ${common}>
        <div class="page__inner page__inner--center">
          <div class="origin-layout page-content">
            <figure class="origin-photo"><img src="${escapeHTML(page.image)}" alt="${escapeHTML(page.alt || "")}"></figure>
            <div>
              <span class="origin-date">${escapeHTML(page.date)}</span>
              ${heading(page)}
              <blockquote class="origin-quote">“${escapeHTML(page.quote)}”</blockquote>
            </div>
          </div>
        </div>
      </section>`;

    if (page.type === "messages") return `
      <section ${common}>
        <div class="page__inner page__inner--center">
          <div class="messages-layout page-content">
            <div class="phone" aria-label="Lembranças em forma de mensagens">
              <div class="chat-list">
                ${(page.messages || []).map(message => `
                  <article class="chat ${message.side === "right" ? "chat--right" : ""}">
                    <span>${escapeHTML(message.label)}</span>
                    <p>${escapeHTML(message.text)}</p>
                  </article>`).join("")}
              </div>
            </div>
            ${heading(page)}
          </div>
        </div>
      </section>`;

    if (page.type === "details") return `
      <section ${common}>
        <div class="page__inner page-content">
          ${heading({ ...page, text: page.intro })}
          <div class="details-grid">
            ${(page.items || []).map(item => `
              <article class="detail-card">
                <span class="detail-card__number">${escapeHTML(item.icon)}</span>
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.text)}</p>
              </article>`).join("")}
          </div>
        </div>
      </section>`;

    if (page.type === "gallery") return `
      <section ${common}>
        <div class="page__inner gallery-layout page-content">
          <div class="gallery-header">
            ${heading({ ...page, text: "" })}
            <p class="page__text">${escapeHTML(page.text)}</p>
          </div>
          <div class="gallery-track" aria-label="Galeria de fotos">
            ${(page.photos || []).map((photo, photoIndex) => `
              <button class="photo-card" type="button" data-photo-page="${index}" data-photo-index="${photoIndex}" aria-label="Ampliar: ${escapeHTML(photo.title)}">
                <img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt || "")}" loading="lazy">
                <span class="photo-card__caption"><span>${escapeHTML(photo.eyebrow)}</span><strong>${escapeHTML(photo.title)}</strong></span>
              </button>`).join("")}
          </div>
        </div>
      </section>`;

    if (page.type === "distance") return `
      <section ${common}>
        <div class="page__inner page__inner--center">
          <div class="distance-layout page-content">
            ${heading(page)}
            <div class="connection" aria-label="Uma conexão entre dois lugares">
              <div class="connection__line"></div><div class="connection__pulse"></div>
              <i class="connection__point connection__point--left"></i><i class="connection__point connection__point--right"></i>
              <span class="connection__label connection__label--left">${escapeHTML(page.leftLabel)}</span>
              <span class="connection__label connection__label--right">${escapeHTML(page.rightLabel)}</span>
              <strong class="connection__center">${escapeHTML(page.centerLabel)}</strong>
            </div>
          </div>
        </div>
      </section>`;

    if (page.type === "memories") return `
      <section ${common}>
        <div class="page__inner page__inner--center">
          <div class="memory-layout page-content">
            ${heading(page)}
            <div class="memory-cards">
              ${(page.cards || []).map(card => `
                <article class="memory-card">
                  <span class="memory-card__date">${escapeHTML(card.date)}</span>
                  <div><h3>${escapeHTML(card.title)}</h3><p>${escapeHTML(card.text)}</p></div>
                </article>`).join("")}
            </div>
          </div>
        </div>
      </section>`;

    if (page.type === "letter") return `
      <section ${common}>
        <div class="page__inner page__inner--center">
          <div class="letter-shell page-content">
            ${heading({ ...page, text: page.intro })}
            <button class="letter-button" type="button" data-open-letter>${escapeHTML(page.button)}</button>
            <article class="letter-paper" data-letter>
              <p class="letter-paper__salutation">${escapeHTML(page.salutation)}</p>
              <div class="letter-paper__body">${paragraphs(page.paragraphs)}</div>
              <p class="letter-paper__signature">${escapeHTML(page.signature)}</p>
            </article>
          </div>
        </div>
      </section>`;

    if (page.type === "final") return `
      <section ${common}>
        <div class="final-stars" data-stars aria-hidden="true"></div>
        <div class="page__inner page__inner--center">
          <div class="final-content page-content">
            <p class="overline">${escapeHTML(page.eyebrow)}</p>
            <h2 class="page__title">${escapeHTML(page.title)}</h2>
            <p class="page__text">${escapeHTML(page.text)}</p>
            <button class="primary-button" type="button" data-restart>${escapeHTML(page.restart)}</button>
            <p class="final-small">${escapeHTML(page.small)}</p>
          </div>
        </div>
      </section>`;

    return "";
  }

  function render() {
    pagesRoot.innerHTML = content.pages.map(renderPage).join("");
    chapterList.innerHTML = content.pages.map((page, index) => `
      <button class="chapter-link" type="button" data-go-to="${index}">
        <span>${String(index + 1).padStart(2, "0")}</span><span>${escapeHTML(page.nav || `Página ${index + 1}`)}</span>
      </button>`).join("");

    $("#preloaderEyebrow").textContent = content.opening.eyebrow;
    $("#preloaderTitle").textContent = content.opening.title;
    $("#preloaderText").textContent = content.opening.text;
    $("#startButtonLabel").textContent = content.opening.button;
    createStars($("#preloaderStars"), 48);
    const finalStars = $("[data-stars]");
    if (finalStars) createStars(finalStars, 70);
    bindDynamicEvents();
    updateUI(false);
  }

  function createStars(root, count) {
    if (!root) return;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--star-opacity", (Math.random() * .5 + .15).toFixed(2));
      star.style.setProperty("--star-duration", `${(Math.random() * 3 + 2).toFixed(2)}s`);
      fragment.appendChild(star);
    }
    root.appendChild(fragment);
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function updateUI(animate = true) {
    const count = content.pages.length;
    pagesRoot.style.transitionDuration = animate && !reducedMotion ? ".85s" : "0s";
    pagesRoot.style.transform = `translate3d(${-currentIndex * 100}%,0,0)`;
    pageCounter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
    progressFill.style.width = `${((currentIndex + 1) / count) * 100}%`;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === count - 1;
    $("span", nextButton).textContent = currentIndex === count - 2 ? "última página" : "continuar";

    $$(".page").forEach((page, index) => {
      const active = index === currentIndex;
      page.classList.toggle("is-active", active);
      page.setAttribute("aria-hidden", String(!active));
      if (active) page.scrollTop = 0;
    });
    $$(".chapter-link").forEach((link, index) => link.classList.toggle("is-active", index === currentIndex));
    const lightTypes = new Set(["manifesto", "details", "memories"]);
    document.body.classList.toggle("light-page", lightTypes.has(content.pages[currentIndex]?.type));
  }

  function goTo(index, animate = true) {
    const target = Math.max(0, Math.min(content.pages.length - 1, index));
    if (target === currentIndex) return;
    currentIndex = target;
    updateUI(animate);
  }

  function openMenu() {
    chapterMenu.classList.add("is-open");
    chapterMenu.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    chapterMenu.classList.remove("is-open");
    chapterMenu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
  }

  async function startExperience() {
    try {
      await soundtrack.play();
      setAudioState(true);
    } catch {
      setAudioState(false);
      showToast("A música está pronta. Toque no botão de música para iniciar.");
    }
    $("#preloader").classList.add("is-leaving");
    document.body.classList.remove("is-locked");
    experience.inert = false;
    $("#topbar").hidden = false;
    $("#bottomNavigation").hidden = false;
    setTimeout(() => $("#preloader").hidden = true, 900);
    updateUI(false);
  }

  function setAudioState(playing) {
    audioButton.classList.toggle("is-paused", !playing);
    audioButton.setAttribute("aria-pressed", String(playing));
    audioButton.setAttribute("aria-label", playing ? "Pausar música" : "Tocar música");
    audioText.textContent = playing ? "música" : "tocar";
  }

  async function toggleAudio() {
    if (soundtrack.paused) {
      try { await soundtrack.play(); setAudioState(true); }
      catch { showToast("Não encontrei o arquivo de música. Confira a pasta assets/musica."); }
    } else {
      soundtrack.pause();
      setAudioState(false);
    }
  }

  function bindDynamicEvents() {
    $$("[data-go-to]").forEach(button => button.addEventListener("click", () => {
      goTo(Number(button.dataset.goTo));
      closeMenu();
    }));

    $$("[data-open-letter]").forEach(button => button.addEventListener("click", () => {
      const letter = button.nextElementSibling;
      const open = letter.classList.toggle("is-open");
      button.textContent = open ? "fechar a carta" : content.pages.find(page => page.type === "letter")?.button || "abrir a carta";
      if (open) setTimeout(() => letter.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" }), 350);
    }));

    $$(".photo-card").forEach(button => button.addEventListener("click", () => {
      const page = content.pages[Number(button.dataset.photoPage)];
      const photo = page.photos[Number(button.dataset.photoIndex)];
      $("#viewerImage").src = photo.src;
      $("#viewerImage").alt = photo.alt || "";
      $("#viewerEyebrow").textContent = photo.eyebrow;
      $("#viewerTitle").textContent = photo.title;
      photoViewer.showModal();
    }));

    $$("[data-restart]").forEach(button => button.addEventListener("click", () => goTo(0)));
  }

  $("#startButton").addEventListener("click", startExperience);
  previousButton.addEventListener("click", () => goTo(currentIndex - 1));
  nextButton.addEventListener("click", () => goTo(currentIndex + 1));
  audioButton.addEventListener("click", toggleAudio);
  menuButton.addEventListener("click", openMenu);
  $("#closeMenuButton").addEventListener("click", closeMenu);
  $("#menuBackdrop").addEventListener("click", closeMenu);
  $("#closePhotoViewer").addEventListener("click", () => photoViewer.close());
  photoViewer.addEventListener("click", event => { if (event.target === photoViewer) photoViewer.close(); });

  document.addEventListener("keydown", event => {
    if (!photoViewer.open && !chapterMenu.classList.contains("is-open")) {
      if (event.key === "ArrowRight" || event.key === "PageDown") goTo(currentIndex + 1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") goTo(currentIndex - 1);
    }
    if (event.key === "Escape") closeMenu();
  });

  experience.addEventListener("touchstart", event => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  experience.addEventListener("touchend", event => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) goTo(currentIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });

  experience.addEventListener("wheel", event => {
    const activePage = $$(".page")[currentIndex];
    const horizontalGallery = event.target.closest(".gallery-track");
    if (horizontalGallery) return;

    const mostlyHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const atTop = activePage.scrollTop <= 1;
    const atBottom = Math.ceil(activePage.scrollTop + activePage.clientHeight) >= activePage.scrollHeight - 1;
    if (!mostlyHorizontal && !((event.deltaY > 0 && atBottom) || (event.deltaY < 0 && atTop))) return;

    wheelAccumulator += mostlyHorizontal ? event.deltaX : event.deltaY;
    if (!wheelLock && Math.abs(wheelAccumulator) > 55) {
      wheelLock = true;
      goTo(currentIndex + (wheelAccumulator > 0 ? 1 : -1));
      wheelAccumulator = 0;
      setTimeout(() => wheelLock = false, 850);
    }
  }, { passive: true });

  soundtrack.addEventListener("play", () => setAudioState(true));
  soundtrack.addEventListener("pause", () => setAudioState(false));
  soundtrack.addEventListener("error", () => setAudioState(false));

  render();
})();
