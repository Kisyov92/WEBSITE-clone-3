"use strict";

// sticky nav
const sectionHeroEl = document.querySelector(".section-hero");
const mainNavContainerEl = document.querySelector(".main-nav--container");
const linkedSectionsEl = document.querySelectorAll(".linked-section");
const mainNavLinksEl = document.querySelectorAll(".main-nav--link");

const heroObs = new IntersectionObserver(function (e) {
  const [entry] = e;
  mainNavContainerEl.classList.toggle("fixed-nav", !entry.isIntersecting);
  sectionHeroEl.classList.toggle("nav-missing", !entry.isIntersecting);
}, {});

heroObs.observe(sectionHeroEl);

const sectionsObs = new IntersectionObserver(
  function (e) {
    const [entry] = e;
    const activeLink = document.querySelector(`[href="#${entry.target.id}"]`);

    if (entry.isIntersecting) {
      mainNavLinksEl.forEach((link) => {
        link.classList.remove("observed");
      });
      activeLink.classList.add("observed");
    }
  },
  { rootMargin: "-300px" }
);

linkedSectionsEl.forEach((section) => {
  sectionsObs.observe(section);
});

// portfolio hover efect

const portfolioContainerEl = document.querySelector(".portfolio-images");

portfolioContainerEl.addEventListener("mouseover", function (e) {
  e.target.classList.add("visible");
});
portfolioContainerEl.addEventListener("mouseout", function (e) {
  e.target.classList.remove("visible");
});

// smooth nav scroll

mainNavContainerEl.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("main-nav--link")) return;
  const link = e.target.getAttribute("href");
  const sectionEl = document.querySelector(link);
  sectionEl.scrollIntoView({
    behavior: "smooth",
  });
});
