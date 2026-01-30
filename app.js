import { initDB, getItems, saveItem } from './db.js';
import { renderCalendar } from './calendar.js';
import { renderTasks } from './tasks.js';


let view = 'month';
let selectedDate = new Date().toISOString().split('T')[0];


const calendarPanel = document.getElementById('calendarPanel');
const taskPanel = document.getElementById('taskPanel');


calendarPanel.querySelector('h2').onclick = () => toggle(calendarPanel);
taskPanel.querySelector('h2').onclick = () => toggle(taskPanel);

function toggle(panel) {
calendarPanel.classList.remove('open');
taskPanel.classList.remove('open');
panel.classList.add('open');
}


// Switch calendar views
document.querySelectorAll('.views button').forEach(btn => {
btn.onclick = () => {
document.querySelectorAll('.views button').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
view = btn.dataset.view;
render();
  };
});

// Add demo task
window.addEventListener('load', async () => {
  await initDB();

  const items = await getItems();
  if (items.length === 0) {
    saveItem({
      id: crypto.randomUUID(),
      type: 'task',
      title: 'Example Task',
      description: 'Click me later to edit',
      startDate: selectedDate,
      endDate: selectedDate,
      completedDates: [],
      category: 'general'
  });
}

render();
});


async function render() {
await renderCalendar(view, selectedDate);
await renderTasks(selectedDate);
}

