document.addEventListener('DOMContentLoaded', function () {
  function open() { var m = document.getElementById('product-create-modal'); if (m) m.hidden = false }
  document.querySelectorAll('[data-open="product-create-modal"]').forEach(function (b) { b.addEventListener('click', open) })
  document.querySelectorAll('#product-create-modal [data-close], #product-create-modal .modal__backdrop').forEach(function (b) { b.addEventListener('click', function () { var m = document.getElementById('product-create-modal'); if (m) m.hidden = true }) })
});