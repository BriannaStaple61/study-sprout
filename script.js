let happiness = 0;
const plant = document.getElementById('plant');
const meter = document.getElementById('happiness');
const score = document.getElementById('score');
const message = document.getElementById('message');
const form = document.getElementById('assignment-form');
const list = document.getElementById('assignment-list');
let wiggleTimer;

// Prefer the welcome-page name; fall back to the saved name on direct visits.
let savedPlantName = '';
try {
  savedPlantName = localStorage.getItem('tiny-plant-name') || '';
} catch {
  // The page also works when browser storage is unavailable.
}
const plantName = (new URLSearchParams(window.location.search).get('name')?.trim()
  || savedPlantName.trim() || 'Sprout').slice(0, 24);
document.getElementById('plant-name').textContent = plantName;
document.getElementById('intro-name').textContent = plantName;

function completeAssignment() {
  happiness = Math.min(100, happiness + 10);
  meter.value = happiness;
  meter.textContent = happiness + '%';
  score.textContent = happiness + '%';
  message.textContent = happiness === 100
    ? 'Fully happy! Look at all your hard work. 💚'
    : 'Assignment complete! You make my little leaves happy. 🌱';
  clearTimeout(wiggleTimer);
  plant.classList.remove('wiggle');
  void plant.offsetWidth;
  plant.classList.add('wiggle');
  wiggleTimer = setTimeout(() => plant.classList.remove('wiggle'), 500);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('assignment-name');
  const classInput = document.getElementById('class-name');
  const dueInput = document.getElementById('due-date');
  if (!nameInput.value.trim() || !classInput.value.trim()) {
    message.textContent = 'Please enter an assignment name and class. 📚';
    return;
  }
  if (!form.reportValidity()) return;

  const item = document.createElement('li');
  const details = document.createElement('p');
  details.textContent = `${nameInput.value.trim()} — ${classInput.value.trim()} — Due ${dueInput.value}`;
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Complete 🌱';
  button.addEventListener('click', () => {
    button.disabled = true;
    button.textContent = 'Completed ✓';
    details.style.textDecoration = 'line-through';
    completeAssignment();
  }, { once: true });
  item.append(details, button);
  list.append(item);
  message.textContent = 'Assignment added! Complete it to grow your happiness. 🌱';
  form.reset();
  nameInput.focus();
});

