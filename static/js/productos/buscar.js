document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const priceRange = document.getElementById('price-range');
  const priceValue = document.getElementById('price-value');
  const productsGrid = document.getElementById('products-grid');
  const noResults = document.getElementById('no-results');
  const productCards = document.querySelectorAll('.product-card');

  // Función para filtrar productos
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const maxPrice = parseFloat(priceRange.value);
    let visibleCount = 0;

    productCards.forEach(card => {
      const productName = card.getAttribute('data-name');
      const productPrice = parseFloat(card.getAttribute('data-price'));

      // Verificar coincidencia de búsqueda y rango de precio
      const matchesSearch = productName.includes(searchTerm);
      const matchesPrice = productPrice <= maxPrice;
      const shouldShow = matchesSearch && matchesPrice;

      if (shouldShow) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Mostrar/ocultar mensaje de sin resultados
    if (visibleCount === 0) {
      noResults.style.display = 'block';
      productsGrid.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      productsGrid.style.display = 'grid';
    }
  }

  // Event listeners
  searchInput.addEventListener('input', filterProducts);
  priceRange.addEventListener('input', function() {
    priceValue.textContent = '$' + parseInt(this.value).toLocaleString();
    filterProducts();
  });

  // Inicializar valor de precio
  priceValue.textContent = '$' + parseInt(priceRange.value).toLocaleString();
});
