function filterProjects() {
  const input = document.getElementById('myInput');
  const filter = input.value.toUpperCase();
  const projects = document.querySelectorAll('.projects > a');
  let matchAny = false;

  projects.forEach((project) => {
    const paragraphs = project.querySelectorAll('.project__text .myP');
    let matchFound = false;

    paragraphs.forEach((p) => {
      if (p.textContent.toUpperCase().includes(filter)) {
        matchFound = true;
      }
    });

    if (matchFound) {
      project.style.display = "";
      matchAny = true;
    } else {
      project.style.display = "none";
    }
  });

  // Handle the "no projects found" message
  const noResult = document.getElementById('noResult');
  if (!matchAny) {
    noResult.style.display = "block";
  } else {
    noResult.style.display = "none";
  }
}



document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-list__link");

  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top:
          targetElement.offsetTop - document.querySelector(".nav").offsetHeight,
        behavior: "smooth",
      });
    });
  }

  const btnDarkMode = document.querySelector(".dark-mode-btn");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "dark") {
    btnDarkMode.classList.add("dark-mode-btn--active");
    body.classList.add("dark");
  } else {
    btnDarkMode.classList.remove("dark-mode-btn--active");
    body.classList.remove("dark");
  }

  updateIcons(body.classList.contains("dark"));

  btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle("dark-mode-btn--active");
    const isDarkTheme = body.classList.toggle("dark");

    if (isDarkTheme) {
      localStorage.setItem("darkMode", "dark");
    } else {
      localStorage.setItem("darkMode", "light");
    }

    updateIcons(isDarkTheme);
  };

  function updateIcons(isDarkTheme) {
    document.querySelectorAll(".dark-icon").forEach((icon) => {
      icon.style.display = isDarkTheme ? "inline" : "none";
    });
    document.querySelectorAll(".light-icon").forEach((icon) => {
      icon.style.display = isDarkTheme ? "none" : "inline";
    });
  }
});

function filterSelection(category) {
  const projects = document.querySelectorAll('.projects > a');

  projects.forEach((project) => {
    const projectCategory = project.querySelector('.project').getAttribute('data-category');

    // Si "all" est sélectionné ou si le projet contient la catégorie, on l'affiche
    if (category === 'all' || projectCategory.includes(category)) {
      project.style.display = "";
    } else {
      project.style.display = "none";
    }
  });

  // Met à jour l'état actif des boutons
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active');
    }
  });
}


