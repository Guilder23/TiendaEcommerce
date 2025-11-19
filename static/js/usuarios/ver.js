document.addEventListener('DOMContentLoaded', function() {
  const viewModal = document.getElementById('user-view-modal');
  const closeBtn = viewModal ? viewModal.querySelector('[data-close]') : null;
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      viewModal.removeAttribute('data-open');
    });
  }
});
