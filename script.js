// Отримуємо елемент фотографії
const profilePhoto = document.querySelector(".profilephoto");

// Додаємо обробник події кліку
profilePhoto.addEventListener("click", () => {
  // Перемикаємо клас 'photo-enlarged'
  profilePhoto.classList.toggle("photo-enlarged");
});

document.addEventListener("keydown", (event) => {
  // Перевіряємо код клавіші
  const keyCodeMap = {
    KeyS: ".summary",
    KeyK: ".skills",
    KeyE: ".experience",
    KeyD: ".education",
    KeyR: ".myprojects",
  };

  const sectionSelector = keyCodeMap[event.code];
  if (sectionSelector) {
    // Якщо клавіша має прив'язаний елемент, скролимо до нього
    const section = document.querySelector(sectionSelector);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Виконуємо запит до GitHub API для отримання репозиторіїв
  fetch("https://api.github.com/users/bgrv14/repos")
    .then((response) => response.json()) // Парсимо відповідь як JSON
    .then((repos) => {
      const projectsContainer = document.getElementById("projects");

      // Перебираємо всі репозиторії і додаємо їх на сторінку
      repos.forEach((repo) => {
        // const repoElement = document.createElement("div");
        const repoElement = document.createElement("li");
        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url; // Адреса репозиторію
        repoLink.textContent = repo.full_name; // Назва репозиторію

        const descriptionElement = document.createElement("p");
        if (repo.description) {
          descriptionElement.textContent = repo.description; // Опис, якщо є
        }

        repoElement.appendChild(repoLink);
        repoElement.appendChild(descriptionElement);
        projectsContainer.appendChild(repoElement);
      });
    })
    .catch((error) => console.log("Error fetching data:", error)); // Логування помилoк
});
