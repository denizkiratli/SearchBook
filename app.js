const form = document.querySelector('form');
const imgDiv = document.querySelector('#imgs');


form.addEventListener('submit', async e => {
    e.preventDefault();
    //console.log("start");
    const queryInput = form.elements.query.value;
    let results = await axios.get(`http://openlibrary.org/search.json?q=${queryInput}`);
    //console.log(results);
    //console.log(queryInput);
    //console.log(imgDiv.lastChild);
    while(imgDiv.firstChild)
        imgDiv.removeChild(imgDiv.lastChild);
    
    showResults(results.data.docs);
    form.reset();
})

const showResults = results => {  
    for(let result of results){
        //console.log(result);
        //if(!result.cover_edition_key)
        const newImgSrc = `http://covers.openlibrary.org/b/olid/${result.cover_edition_key}-M.jpg`;
        const img = document.createElement('img');
        img.src = newImgSrc;
        img.alt = result.title;
        imgDiv.append(img);
    }
};