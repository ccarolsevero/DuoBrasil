function submitForm() {
  const fields = ['f-nome', 'f-tel', 'f-email'];
  let ok = true;

  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#dc3545';
      el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
      ok = false;
    }
  });

  if (!ok) return;

  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('form-fields').style.display = 'none';
    document.getElementById('success-state').style.display = 'block';
  }, 900);
}

function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  document.querySelectorAll('.faq-q.open').forEach((b) => {
    b.classList.remove('open');
    b.nextElementSibling.style.display = 'none';
  });

  if (!isOpen) {
    btn.classList.add('open');
    answer.style.display = 'block';
  }
}

document.querySelectorAll('a[href="#diagnostico"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('diagnostico').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
