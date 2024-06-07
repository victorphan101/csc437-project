document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.nav__tab');
    const tabContent = document.getElementById('tab-content');
  
    tabLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('data-tab-target');
        loadTabContent(target);
      });
    });
  
    function loadTabContent(target) {
      fetch(`/components/${target}.html`)
        .then(response => response.text())
        .then(data => {
          tabContent.innerHTML = data;
        })
        .catch(error => {
          console.error('Error loading tab content:', error);
        });
    }
  
    // Load the initial tab content
    loadTabContent('mvp');
  });