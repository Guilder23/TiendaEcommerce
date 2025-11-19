document.addEventListener('DOMContentLoaded', function () {
  function open() { var m = document.getElementById('login-modal'); if (m) m.hidden = false }
  function close(el) { var m = el.closest('.modal'); if (m) m.hidden = true }
  document.querySelectorAll('[data-open="login-modal"]').forEach(function (btn) {
    btn.addEventListener('click', open);
  });
  document.querySelectorAll('#login-modal [data-close], #login-modal .modal__backdrop').forEach(function (btn) {
    btn.addEventListener('click', function () { close(btn) });
  });
});