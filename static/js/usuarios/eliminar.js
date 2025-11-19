document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('user-delete-form');
  if (!form) return;
  form.addEventListener('submit', function() {
    const btn = this.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Eliminando...';
    }
  });
});
