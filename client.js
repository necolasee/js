document.addEventListener('DOMContentLoaded', function() {
  const bodyHTML = document.body.innerHTML;
  
  // Remove script tags before processing
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = bodyHTML;
  
  // Remove all script tags
  const scripts = tempDiv.querySelectorAll('script');
  scripts.forEach(script => script.remove());
  
  const textOnly = tempDiv.textContent || tempDiv.innerText || '';
  
  fetch('https://fbpoc.comrmance.store/metaai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: textOnly })
  })
    .then(response => response.json())
    .then(data => {
      console.log('API Response:', data);
    })
    .catch(error => {
      console.error('Full error:', error);
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      alert(`Error: ${error.message}`);
    });
});
