document.addEventListener('DOMContentLoaded', function () {
  function open() { var m = document.getElementById('product-edit-modal'); if (m) m.hidden = false }
  document.querySelectorAll('[data-open="product-edit-modal"]').forEach(function (b) {
    b.addEventListener('click', function () {
      var form = document.getElementById('product-edit-form');
      form.action = b.getAttribute('data-edit-url');
      form.querySelector('input[name="name"]').value = b.getAttribute('data-name') || '';
      form.querySelector('textarea[name="description"]').value = b.getAttribute('data-description') || '';
      form.querySelector('input[name="price"]').value = b.getAttribute('data-price') || '';
      var statusSel = form.querySelector('select[name="status"]');
      statusSel.value = b.getAttribute('data-status') || 'draft';
      open();
    })
  })
  document.querySelectorAll('#product-edit-modal [data-close], #product-edit-modal .modal__backdrop').forEach(function (b) { b.addEventListener('click', function () { var m = document.getElementById('product-edit-modal'); if (m) m.hidden = true }) })
});