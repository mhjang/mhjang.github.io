(function () {
  "use strict";

  // Analytics (Google Analytics 4). The old Universal Analytics tag (UA-83607993-1) stopped
  // collecting data in July 2024. Create a GA4 property, paste its Measurement ID here
  // (looks like "G-XXXXXXXXXX"), and analytics turns on. Left empty, nothing is loaded.
  var GA_MEASUREMENT_ID = "";

  if (GA_MEASUREMENT_ID) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
  }

  // Email link assembled at runtime so the address isn't sitting in the HTML for scrapers.
  var user = "myunghajang";
  var domain = "gmail.com";
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.href = "mailto:" + user + "@" + domain;
    el.hidden = false;
  });

  // Highlight the nav link for the section currently in view.
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']"));
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);
  if (!sections.length) return;

  var ticking = false;

  function update() {
    ticking = false;
    var line = window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= line) current = s;
    });
    links.forEach(function (a) {
      if (a.getAttribute("href") === "#" + current.id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
