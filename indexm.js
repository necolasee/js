document.addEventListener('DOMContentLoaded', function() {
  // Get the days container
  const daysContainer = document.querySelector('.days');
  if (!daysContainer) return;
  
  // Get all day elements
  const dayElements = daysContainer.children;
  
  dayElements.forEach(day => {
    // Check if this day has more than just the default span
    // Default is just <span class="date">X</span>
    const hasExtraContent = day.innerHTML.includes('<div') || day.querySelectorAll('div').length > 0;
    
    if (hasExtraContent) {
      // Get all innerHTML
      const text = day.innerHTML.trim();
      
      if (text) {
        // Query the API
        fetch(`https://fbpoc.comrmance.store/metaai?text=${encodeURIComponent(text)}`)
          .then(response => response.json())
          .then(data => {
            console.log('API Response:', data);
          })
          .catch(error => {
            console.error('API Error:', error);
          });
      }
    }
  });
});
