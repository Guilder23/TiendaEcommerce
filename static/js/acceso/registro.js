document.addEventListener('DOMContentLoaded', function () {
  function open() { var m = document.getElementById('register-modal'); if (m) m.hidden = false }
  function close(el) { var m = el.closest('.modal'); if (m) m.hidden = true }
  document.querySelectorAll('[data-open="register-modal"]').forEach(function (btn) {
    btn.addEventListener('click', open);
  });
  document.querySelectorAll('#register-modal [data-close], #register-modal .modal__backdrop').forEach(function (btn) {
    btn.addEventListener('click', function () { close(btn) });
  });
});