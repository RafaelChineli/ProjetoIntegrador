let students = [];

function registerAttendance(studentName, room) {
    const existingStudent = students.find(student => student.name.toLowerCase() === studentName.toLowerCase() && student.room === room);

    if (existingStudent) {
        if (!existingStudent.present) {
            existingStudent.present = true;
            displayAttendanceMessage(`${studentName} está presente.`);
        } else {
            displayAttendanceMessage(`${studentName} já foi registrado como presente.`);
        }
    } else {
        const newStudent = {
            name: studentName,
            room: room,
            present: true
        };
        students.push(newStudent);
        displayAttendanceMessage(`${studentName} está presente.`);
    }
}

function displayAttendanceMessage(message) {
    const attendanceMessage = document.getElementById('attendanceMessage');
    if (attendanceMessage) {
        attendanceMessage.textContent = message;
    }
}

function updateStudentList(room) {
    const studentListDiv = document.getElementById('studentList');
    if (studentListDiv) {
        const filteredStudents = students.filter(student => student.room === room);
        if (filteredStudents.length > 0) {
            let studentListHTML = '<h3>Alunos na Sala:</h3>';
            studentListHTML += '<ul>';
            filteredStudents.forEach(student => {
                studentListHTML += `<li>${student.name}</li>`;
            });
            studentListHTML += '</ul>';
            studentListDiv.innerHTML = studentListHTML;
        } else {
            studentListDiv.innerHTML = '<p>Nenhum aluno presente nesta sala.</p>';
        }
    }
}

const attendanceForm = document.getElementById('attendanceForm');
if (attendanceForm) {
    attendanceForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const studentNameInput = document.getElementById('studentName');
        const roomSelect = document.getElementById('room');

        const studentName = studentNameInput.value.trim();
        const room = roomSelect.value;

        if (room === '') {
            displayAttendanceMessage('Por favor, selecione uma sala.');
            return;
        }

        registerAttendance(studentName, room);
        studentNameInput.value = '';
        roomSelect.value = ''; // Reset room selection
        updateStudentList(room);
    });

    const roomSelect = document.getElementById('room');
    if (roomSelect) {
        roomSelect.addEventListener('change', function() {
            const selectedRoom = roomSelect.value;
            updateStudentList(selectedRoom);
        });
    }
}
