document.addEventListener('DOMContentLoaded', function () {
  function open() { var m = document.getElementById('product-delete-modal'); if (m) m.hidden = false }
  document.querySelectorAll('[data-open="product-delete-modal"]').forEach(function (b) {
    b.addEventListener('click', function () {
      var form = document.getElementById('product-delete-form');
      form.action = b.getAttribute('data-delete-url');
      var nameEl = document.getElementById('product-delete-name');
      nameEl.textContent = '¿Eliminar "' + (b.getAttribute('data-name') || '') + '"?';
      open();
    })
  })
  document.querySelectorAll('#product-delete-modal [data-close], #product-delete-modal .modal__backdrop').forEach(function (b) { b.addEventListener('click', function () { var m = document.getElementById('product-delete-modal'); if (m) m.hidden = true }) })
});