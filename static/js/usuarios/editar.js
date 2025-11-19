document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('user-edit-form');
  if (!form) return;
  
  form.addEventListener('submit', function() {
    const btn = this.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Guardando...';
    }
  });
  
  // Asegurar que los IDs de los campos sean correctos
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const phoneInput = form.querySelector('input[name="phone"]');
  const addressInput = form.querySelector('textarea[name="address"]');
  const roleSelect = form.querySelector('select[name="role"]');
  
  if (nameInput) nameInput.id = 'edit-name';
  if (emailInput) emailInput.id = 'edit-email';
  if (phoneInput) phoneInput.id = 'edit-phone';
  if (addressInput) addressInput.id = 'edit-address';
  if (roleSelect) roleSelect.id = 'edit-role';
});
