document.addEventListener('DOMContentLoaded', function(){
  // Cargar notificaciones
  fetch('/notifications/count.json')
    .then(r => r.json())
    .then(d => {
      var el = document.getElementById('notif-count');
      if(el){ el.textContent = d.count || 0; }
    })
    .catch(() => {});
  
  var bell = document.getElementById('navbar-bell');
  if(bell){
    bell.addEventListener('click', function(){
      fetch('/notifications/list.json')
        .then(r => r.json())
        .then(d => {
          alert((d.items || []).map(function(i){ return i.message; }).join('\n') || 'Sin notificaciones');
        })
        .catch(function(){});
    });
  }
});
