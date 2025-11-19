document.addEventListener('DOMContentLoaded', function(){
  var notifCountEl = document.getElementById('notif-count');
  var cartCountEl = document.getElementById('cart-count');
  if(notifCountEl){
    fetch('/notifications/count.json')
      .then(function(r){ return r.json(); })
      .then(function(d){ notifCountEl.textContent = d.count || 0; })
      .catch(function(){});
  }
  if(cartCountEl){
    fetch('/cart/count.json')
      .then(function(r){ return r.json(); })
      .then(function(d){ cartCountEl.textContent = d.count || 0; })
      .catch(function(){});
  }
});
