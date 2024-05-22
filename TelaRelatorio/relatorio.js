let students = [
    { name: 'Aluno 1', room: 'Sala A', present: true },
    { name: 'Aluno 2', room: 'Sala A', present: false },
    { name: 'Aluno 3', room: 'Sala B', present: true },
    { name: 'Aluno 4', room: 'Sala C', present: true }
];

function updateStudentReportList(room) {
    const studentReportListDiv = document.getElementById('studentReportList');
    const reportMessage = document.getElementById('reportMessage');

    if (studentReportListDiv && reportMessage) {
        const filteredStudents = students.filter(student => student.room === room);
        
        if (filteredStudents.length > 0) {
            let reportHTML = '<h3>Alunos na Sala:</h3>';
            reportHTML += '<ul>';
            filteredStudents.forEach(student => {
                reportHTML += `<li>${student.name} - ${student.present ? 'Presente' : 'Ausente'}</li>`;
            });
            reportHTML += '</ul>';
            studentReportListDiv.innerHTML = reportHTML;
            reportMessage.textContent = '';
        } else {
            studentReportListDiv.innerHTML = '';
            reportMessage.textContent = 'Nenhum aluno presente nesta sala.';
        }
    }
}

const roomReportSelect = document.getElementById('roomReport');
if (roomReportSelect) {
    roomReportSelect.addEventListener('change', function() {
        const selectedRoom = roomReportSelect.value;
        if (selectedRoom === '') {
            const reportMessage = document.getElementById('reportMessage');
            if (reportMessage) {
                reportMessage.textContent = 'Por favor, selecione uma sala.';
            }
            const studentReportListDiv = document.getElementById('studentReportList');
            if (studentReportListDiv) {
                studentReportListDiv.innerHTML = '';
            }
        } else {
            updateStudentReportList(selectedRoom);
        }
    });
}
