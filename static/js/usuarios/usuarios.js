document.addEventListener('DOMContentLoaded', function() {
  // Elementos modales
  const createModal = document.getElementById('user-create-modal');
  const viewModal = document.getElementById('user-view-modal');
  const editModal = document.getElementById('user-edit-modal');
  const deleteModal = document.getElementById('user-delete-modal');

  // Botones de acción
  const createBtn = document.querySelector('.btn-create-user');
  const viewButtons = document.querySelectorAll('[data-action="view"]');
  const editButtons = document.querySelectorAll('[data-action="edit"]');
  const deleteButtons = document.querySelectorAll('[data-action="delete"]');

  // Botones de cierre
  const closeBtns = document.querySelectorAll('[data-close]');

  // Abrir modal crear usuario
  if (createBtn) {
    createBtn.addEventListener('click', function() {
      openModal(createModal);
      document.getElementById('user-create-form').reset();
    });
  }

  // Abrir modal ver usuario
  viewButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const userData = {
        name: this.getAttribute('data-name'),
        email: this.getAttribute('data-email'),
        phone: this.getAttribute('data-phone'),
        address: this.getAttribute('data-address'),
        role: this.getAttribute('data-role')
      };
      populateViewModal(userData);
      openModal(viewModal);
    });
  });

  // Abrir modal editar usuario
  editButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const form = document.getElementById('user-edit-form');
      form.action = this.getAttribute('data-edit-url');
      
      document.querySelector('#user-edit-form input[name="email"]').value = this.getAttribute('data-email') || '';
      document.querySelector('#user-edit-form input[name="name"]').value = this.getAttribute('data-name') || '';
      document.querySelector('#user-edit-form input[name="phone"]').value = this.getAttribute('data-phone') || '';
      document.querySelector('#user-edit-form textarea[name="address"]').value = this.getAttribute('data-address') || '';
      document.querySelector('#user-edit-form select[name="role"]').value = this.getAttribute('data-role') || 'buyer';
      
      openModal(editModal);
    });
  });

  // Abrir modal eliminar usuario
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const form = document.getElementById('user-delete-form');
      const username = this.getAttribute('data-username');
      
      form.action = this.getAttribute('data-delete-url');
      document.getElementById('user-delete-name').textContent = `¿Eliminar "Bs{username}"?`;
      
      openModal(deleteModal);
    });
  });

  // Cerrar modales
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      closeModal(this.closest('[idBs="-modal"]'));
    });
  });

  // Cerrar modal al hacer clic fuera
  [createModal, viewModal, editModal, deleteModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          closeModal(this);
        }
      });
    }
  });
});

function openModal(modal) {
  if (modal) {
    modal.setAttribute('data-open', 'true');
  }
}

function closeModal(modal) {
  if (modal) {
    modal.removeAttribute('data-open');
  }
}

function populateViewModal(userData) {
  const viewBody = document.getElementById('user-view-body');
  if (viewBody) {
    viewBody.innerHTML = `
      <div class="user-info-item">
        <div class="user-info-label">Nombre</div>
        <div class="user-info-value">Bs{userData.name || 'N/A'}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-label">Email</div>
        <div class="user-info-value">Bs{userData.email || 'N/A'}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-label">Teléfono</div>
        <div class="user-info-value">Bs{userData.phone || 'N/A'}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-label">Dirección</div>
        <div class="user-info-value">Bs{userData.address || 'N/A'}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-label">Rol</div>
        <div class="user-info-value">Bs{userData.role || 'N/A'}</div>
      </div>
    `;
  }
}
