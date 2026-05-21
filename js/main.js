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

document.querySelectorAll('a[href="#contato"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('contato').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
