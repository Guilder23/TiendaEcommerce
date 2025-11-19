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

  var msgs = document.querySelectorAll('ul.messages .message');
  for(var i=0;i<msgs.length;i++){
    (function(m){
      setTimeout(function(){
        m.classList.add('message--hide');
        setTimeout(function(){
          if(m && m.parentNode){
            m.parentNode.removeChild(m);
            var list = document.querySelector('ul.messages');
            if(list && list.children.length === 0){ list.style.display = 'none'; }
          }
        }, 350);
      }, 3000);
    })(msgs[i]);
  }
});
