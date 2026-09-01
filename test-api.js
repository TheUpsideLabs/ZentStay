fetch('http://localhost:5000/api/v1/colleges').then(r => r.json()).then(console.log).catch(console.error);
