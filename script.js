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

class GitHubAPI {
  constructor(token, username) {
    this.token = token; // Зберігаємо токен
    this.username = username; // Зберігаємо ім'я користувача
    this.baseURL = "https://api.github.com"; // Базовий URL API GitHub
  }

  async getRepos() {
    try {
      const response = await fetch(
        `${this.baseURL}/users/${this.username}/repos`,
        {
          headers: {
            Authorization: `token ${this.token}`, // Додаємо токен до заголовків
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`); // Обробка помилок
      }

      return await response.json(); // Парсимо результат у JSON
    } catch (error) {
      console.error("Error fetching repositories:", error); // Лог помилок
      return []; // Повертаємо пустий масив у разі помилки
    }
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const token = "__"; // Ввести токен замість __
  const username = "bgrv14";

  const gitHubAPI = new GitHubAPI(token, username); // Створюємо екземпляр класу

  const repos = await gitHubAPI.getRepos(); // Отримуємо список репозиторіїв
  const projectsContainer = document.getElementById("projects");

  // Додаємо репозиторії на сторінку
  repos.forEach((repo) => {
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
});
