// Prefill the last chosen name, but let you choose again before entering.
const nameInput = document.getElementById('name-input');
try {
  nameInput.value = (localStorage.getItem('tiny-plant-name') || '').slice(0, 24);
} catch {
  // The form also works without browser storage.
}

nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
document.getElementById('name-form').addEventListener('submit', (event) => {
  const name = nameInput.value.trim();
  if (!name) {
    event.preventDefault();
    nameInput.setCustomValidity('Give your little plant a name first!');
    nameInput.reportValidity();
    return;
  }
  nameInput.value = name;
  try {
    localStorage.setItem('tiny-plant-name', name);
  } catch {
    // The name is also passed directly to the plant page.
  }
  event.preventDefault();
  window.location.href = 'plant.html?name=' + encodeURIComponent(name);
});

// Welcome first, then reveal the naming form after at least 20 seconds.
(() => {
  const screen = document.getElementById('loading-screen');
  const namingScreen = document.getElementById('naming-screen');
  if (!screen || !namingScreen) return;
  const greeting = document.getElementById('loading-message');
  const savedName = nameInput.value.trim();
  if (greeting && savedName) greeting.textContent = `Waking up ${savedName}…`;
  namingScreen.hidden = true;
  screen.hidden = false;
  window.setTimeout(() => {
    screen.classList.add('is-leaving');
    window.setTimeout(() => {
      screen.hidden = true;
      namingScreen.hidden = false;
      nameInput.focus();
    }, 300);
  }, 20000);
})();
