fetch('./words.json')
.then(response => response.json())
.then(data => {
    localStorage.setItem('data', JSON.stringify(data))
})