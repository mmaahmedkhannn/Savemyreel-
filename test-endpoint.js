fetch('http://localhost:3000/api/instagram/fetch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'https://www.instagram.com/p/DVHw8OpEnQV/' })
})
    .then(r => r.json())
    .then(console.log)
    .catch(console.error);
