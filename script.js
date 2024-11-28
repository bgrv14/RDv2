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
