function getCSRFTOKEN(){
  var name='csrftoken';
  var cookies=document.cookie.split(';');
  for(var i=0;i<cookies.length;i++){
    var c=cookies[i].trim();
    if(c.substring(0,name.length+1)===(name+'=')){
      return decodeURIComponent(c.substring(name.length+1));
    }
  }
  return '';
}

document.addEventListener('DOMContentLoaded', function(){
  var cartBtn = document.getElementById('navbar-cart');
  var cartDropdown = document.getElementById('cart-dropdown');
  var cartClose = document.getElementById('cart-close');
  var bellBtn = document.getElementById('navbar-bell');
  var notifDropdown = document.getElementById('notif-dropdown');
  var notifClose = document.getElementById('notif-close');

  function renderCart(){
    fetch('/cart/list.json')
      .then(function(r){ return r.json(); })
      .then(function(d){
        var box = document.getElementById('cart-items');
        var total = document.getElementById('cart-total');
        if(!box || !total) return;
        var items = d.items || [];
        if(items.length === 0){ box.innerHTML = '<p>Tu carrito está vacío.</p>'; total.textContent = ''; return; }
        var html = '';
        for(var i=0;i<items.length;i++){
          var it = items[i];
          html += '<div class="dropdown__row">'
            + '<span>' + it.product + ' × ' + it.quantity + '</span>'
            + '<div class="dropdown__row_actions">'
            +   '<span>$' + it.price + '</span>'
            +   '<button class="cart-remove" data-id="' + it.id + '">✕</button>'
            + '</div>'
          + '</div>';
        }
        box.innerHTML = html;
        total.textContent = 'Total: $' + (d.total || '0');
        var buttons = box.querySelectorAll('.cart-remove');
        for(var k=0;k<buttons.length;k++){
          buttons[k].addEventListener('click', function(){
            var id = this.getAttribute('data-id');
            fetch('/cart/remove/' + id + '/', {method:'POST', headers:{'X-CSRFToken': getCSRFTOKEN()}})
              .then(function(r){ return r.json(); })
              .then(function(resp){
                if(resp.ok){
                  renderCart();
                  var cc=document.getElementById('cart-count');
                  if(cc){ cc.textContent = resp.count; }
                }
              })
              .catch(function(){});
          });
        }
      })
      .catch(function(){});
  }

  function renderNotifs(){
    fetch('/notifications/list.json')
      .then(function(r){ return r.json(); })
      .then(function(d){
        var box = document.getElementById('notif-items');
        if(!box) return;
        var items = d.items || [];
        if(items.length === 0){ box.innerHTML = '<p>Sin notificaciones</p>'; return; }
        var html = '';
        for(var i=0;i<items.length;i++){
          var it = items[i];
          html += '<div class="dropdown__row">' + it.message + '</div>';
        }
        box.innerHTML = html;
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
    cartClose.addEventListener('click', function(){ if(cartDropdown){ cartDropdown.style.display = 'none'; } });
  }
  if(bellBtn){
    bellBtn.addEventListener('click', function(){
      if(!notifDropdown) return;
      var visible = notifDropdown.style.display === 'block';
      notifDropdown.style.display = visible ? 'none' : 'block';
      if(!visible){ renderNotifs(); }
    });
  }
  if(notifClose){
    notifClose.addEventListener('click', function(){ if(notifDropdown){ notifDropdown.style.display = 'none'; } });
  }
  document.addEventListener('click', function(e){
    var t = e.target;
    if(cartDropdown && cartBtn && cartDropdown.style.display === 'block' && !cartDropdown.contains(t) && t !== cartBtn){ cartDropdown.style.display = 'none'; }
    if(notifDropdown && bellBtn && notifDropdown.style.display === 'block' && !notifDropdown.contains(t) && t !== bellBtn){ notifDropdown.style.display = 'none'; }
  });
});
