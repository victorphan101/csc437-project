document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.querySelector('input[type="checkbox"]');
    
    checkbox.addEventListener('change', function(event) {
      document.body.classList.toggle('dark-mode', event.target.checked);
    });
  });
  