const API_URL = 'http://localhost:5000/api';
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token) {
  window.location.href = 'index.html';
}

document.getElementById('user-name').textContent = user.name;

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

async function loadSessions() {
  try {
    const res = await fetch(`${API_URL}/sessions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const sessions = await res.json();

    const list = document.getElementById('session-list');
    list.innerHTML = '';

    sessions.forEach((s) => {
      const div = document.createElement('div');
      div.className = 'session-item';
      div.innerHTML = `
        <span>${s.course} - ${s.duration}h ${s.notes ? '(' + s.notes + ')' : ''}</span>
        <button onclick="deleteSession('${s._id}')">Delete</button>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

async function addSession() {
  const course = document.getElementById('course').value;
  const duration = document.getElementById('duration').value;
  const notes = document.getElementById('notes').value;

  if (!course || !duration) return alert('Please fill in course and duration');

  try {
    await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ course, duration, notes }),
    });

    document.getElementById('course').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('notes').value = '';
    loadSessions();
  } catch (err) {
    console.error(err);
  }
}

async function deleteSession(id) {
  try {
    await fetch(`${API_URL}/sessions/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    loadSessions();
  } catch (err) {
    console.error(err);
  }
}

loadSessions();