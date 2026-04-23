/* Appointment Page — Form Logic */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  const deptSelect = document.getElementById('apt-department');
  const doctorSelect = document.getElementById('apt-doctor');
  const dateInput = document.getElementById('apt-date');

  // Doctor data by department
  const doctorsByDept = {
    cardiology: ['Dr. Rajesh Kapoor', 'Dr. Arjun Reddy'],
    neurology: ['Dr. Ananya Sharma'],
    orthopedics: ['Dr. Vikram Patel'],
    pediatrics: ['Dr. Priya Menon'],
    diagnostics: ['Dr. Neha Gupta'],
    general: ['Dr. Kavita Singh']
  };

  // Set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Dynamic doctor dropdown
  deptSelect?.addEventListener('change', () => {
    const dept = deptSelect.value;
    doctorSelect.innerHTML = '<option value="">Select Doctor (optional)</option>';
    if (doctorsByDept[dept]) {
      doctorsByDept[dept].forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        doctorSelect.appendChild(option);
      });
    }
  });

  // Form validation & submission
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear errors
    form.querySelectorAll('.form-error').forEach(err => err.classList.remove('visible'));
    form.querySelectorAll('.form-input, .form-select').forEach(inp => inp.classList.remove('error'));

    // Validate name
    const name = document.getElementById('patient-name');
    if (!name.value.trim()) {
      showError('patient-name', 'name-error');
      isValid = false;
    }

    // Validate email
    const email = document.getElementById('patient-email');
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError('patient-email', 'email-error');
      isValid = false;
    }

    // Validate phone
    const phone = document.getElementById('patient-phone');
    if (!phone.value.trim() || phone.value.replace(/\D/g, '').length < 10) {
      showError('patient-phone', 'phone-error');
      isValid = false;
    }

    // Validate department
    const dept = document.getElementById('apt-department');
    if (!dept.value) {
      showError('apt-department', 'dept-error');
      isValid = false;
    }

    // Validate date
    const date = document.getElementById('apt-date');
    if (!date.value) {
      showError('apt-date', 'date-error');
      isValid = false;
    } else {
      const selectedDate = new Date(date.value);
      if (selectedDate.getDay() === 0) {
        document.getElementById('date-error').textContent = 'Sunday appointments are not available';
        showError('apt-date', 'date-error');
        isValid = false;
      }
    }

    // Validate time
    const time = document.getElementById('apt-time');
    if (!time.value) {
      showError('apt-time', 'time-error');
      isValid = false;
    }

    if (isValid) {
      openModal('success-modal');
      form.reset();
    }
  });

  function showError(inputId, errorId) {
    document.getElementById(inputId)?.classList.add('error');
    document.getElementById(errorId)?.classList.add('visible');
  }
});
