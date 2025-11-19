document.addEventListener('DOMContentLoaded', function(){
  // Cargar carrito
  fetch('/cart/count.json')
    .then(r => r.json())
    .then(d => {
      var el = document.getElementById('cart-count');
      if(el){ el.textContent = d.count || 0; }
    })
    .catch(() => {});
  
  var cartBtn = document.getElementById('navbar-cart');
  var cartDropdown = document.getElementById('cart-dropdown');
  var cartClose = document.getElementById('cart-close');
  
  function renderCart(){
    fetch('/cart/list.json')
      .then(r => r.json())
      .then(d => {
        var box = document.getElementById('cart-items');
        var total = document.getElementById('cart-total');
        if(!box || !total) return;
        var items = d.items || [];
        if(items.length === 0){
          box.innerHTML = '<p>Tu carrito está vacío.</p>';
          total.textContent = '';
          return;
        }
        box.innerHTML = items.map(function(i){
          return '<div style="display:flex;align-items:center;justify-content:space-between;margin:6px 0">'
            + '<span>' + i.product + ' × ' + i.quantity + '</span>'
            + '<div style="display:flex;align-items:center;gap:8px">'
            +   '<span>Bs' + i.price + '</span>'
            +   '<button class="cart-remove" data-id="' + i.id + '" title="Eliminar" style="border:1px solid #e5e7eb;background:#fff;border-radius:6px;width:28px;height:28px;display:grid;place-items:center;cursor:pointer">'
            +     '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>'
            +   '</button>'
            + '</div>'
          + '</div>';
        }).join('');
        total.textContent = 'Total: Bs' + (d.total || '0');
        // Wire remove
        var buttons = box.querySelectorAll('.cart-remove');
        for(var k=0;k<buttons.length;k++){
          buttons[k].addEventListener('click', function(){
            var id = this.getAttribute('data-id');
            var csrftoken = (function(){
              var name='csrftoken';var cookies=document.cookie.split(';');
              for(var i=0;i<cookies.length;i++){var c=cookies[i].trim();if(c.substring(0,name.length+1)===(name+'=')){return decodeURIComponent(c.substring(name.length+1));}}
              return '';
            })();
            fetch('/cart/remove/' + id + '/', {method:'POST', headers:{'X-CSRFToken': csrftoken}})
              .then(function(r){return r.json();})
              .then(function(resp){ if(resp.ok){ renderCart(); var cc=document.getElementById('cart-count'); if(cc){ cc.textContent = resp.count; } } })
              .catch(function(){});
          });
        }
      })
      .catch(function(){});
  }
  
  if(cartBtn){
    cartBtn.addEventListener('click', function(){
      if(!cartDropdown) return;
      var visible = cartDropdown.style.display === 'block';
      cartDropdown.style.display = visible ? 'none' : 'block';
      if(!visible){ renderCart(); }
    });
  }
  
  if(cartClose){
    cartClose.addEventListener('click', function(){ 
      if(cartDropdown){ cartDropdown.style.display = 'none'; } 
    });
  }
  
  document.addEventListener('click', function(e){
    var target = e.target;
    if(!cartDropdown || !cartBtn) return;
    if(cartDropdown.style.display === 'block' && !cartDropdown.contains(target) && target !== cartBtn){
      cartDropdown.style.display = 'none';
    }
  });
});
