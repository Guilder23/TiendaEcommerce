document.addEventListener('DOMContentLoaded', function () {
  function open() { var m = document.getElementById('product-status-modal'); if (m) m.hidden = false }
  document.querySelectorAll('[data-open="product-status-modal"]').forEach(function (b) {
    b.addEventListener('click', function () {
      var form = document.getElementById('product-status-form');
      form.action = b.getAttribute('data-status-url');
      var s = b.getAttribute('data-status') || 'draft';
      form.querySelector('select[name="status"]').value = s;
      open();
    })
  })
  document.querySelectorAll('#product-status-modal [data-close], #product-status-modal .modal__backdrop').forEach(function (b) { b.addEventListener('click', function () { var m = document.getElementById('product-status-modal'); if (m) m.hidden = true }) })
});