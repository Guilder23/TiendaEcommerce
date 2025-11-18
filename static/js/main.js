document.addEventListener('DOMContentLoaded', function () {
  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = false;
  }
  function closeModal(el) {
    const modal = el.closest('.modal');
    if (modal) modal.hidden = true;
  }
  document.querySelectorAll('[data-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-open');
      openModal(id);
    });
  });
  document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.addEventListener('click', function () { closeModal(btn); });
  });
});