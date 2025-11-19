document.addEventListener('DOMContentLoaded', function () {
  function open() { var m = document.getElementById('product-view-modal'); if (m) m.hidden = false }
  document.querySelectorAll('[data-open="product-view-modal"]').forEach(function (b) {
    b.addEventListener('click', function () {
      document.getElementById('product-view-title').textContent = b.getAttribute('data-name') || '';
      var img = document.getElementById('product-view-img');
      var url = b.getAttribute('data-photo-url') || '';
      if (url) { img.src = url; img.style.display = 'block' } else { img.style.display = 'none' }
      document.getElementById('product-view-desc').textContent = b.getAttribute('data-description') || '';
      document.getElementById('product-view-price').textContent = 'Precio: $' + (b.getAttribute('data-price') || '');
      document.getElementById('product-view-status').textContent = 'Estado: ' + (b.getAttribute('data-status') || '');
      open();
    })
  })
  document.querySelectorAll('#product-view-modal [data-close], #product-view-modal .modal__backdrop').forEach(function (b) { b.addEventListener('click', function () { var m = document.getElementById('product-view-modal'); if (m) m.hidden = true }) })
});