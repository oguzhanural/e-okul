const student = {
    tc: '12345678901',
    password: '1234',
    notes: [
        { ders: 'Matematik', sinav1: 80, sinav2: 75, proje: 90 },
        { ders: 'Fizik', sinav1: 70, sinav2: 85, proje: 80 },
        { ders: 'Kimya', sinav1: 90, sinav2: 88, proje: 95 }
    ]
};

document.getElementById('login-btn').addEventListener('click', () => {
    const tcInput = document.getElementById('tc').value;
    const passInput = document.getElementById('password').value;

    if (tcInput === student.tc && passInput === student.password) {
        localStorage.setItem('loggedIn', 'true');
        showNotes();
    } else {
        document.getElementById('error-msg').textContent = 'Hatalı TC veya şifre!';
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.reload();
});

function showNotes() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('notes-container').classList.remove('hidden');

    const notesBody = document.getElementById('notes-body');
    notesBody.innerHTML = '';

    student.notes.forEach(note => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${note.ders}</td>
            <td>${note.sinav1}</td>
            <td>${note.sinav2}</td>
            <td>${note.proje}</td>
        `;
        notesBody.appendChild(tr);
    });
}

// Giriş kontrolü
window.onload = function() {
    if(localStorage.getItem('loggedIn') === 'true') {
        showNotes();
    }
};
