const form = document.querySelector('form');
const resultHeader = document.querySelector('#result-header');
const books = document.querySelector('#books');

form.addEventListener('submit', async e => {
    e.preventDefault();
 
    const queryInput = form.elements.query.value;
    let results = await axios.get(`http://openlibrary.org/search.json?q=${queryInput}`);

    while(resultHeader.innerHTML)
        resultHeader.innerHTML = '';

    while(books.firstChild)
        books.removeChild(books.lastChild);
    
    console.log(results);
    
    showResults(queryInput, results.data.docs);
    form.reset();
})

const showResults = (query, results) => {  
    //Show a header for results
    resultHeader.innerHTML = `<h2>Results for ${query}</h2>`;
    
    for(let result of results){
        //Get book's cover
        const newImgSrc = `https://covers.openlibrary.org/b/olid/${result.cover_edition_key}-M.jpg`;
        
        //Create a box
        const div = document.createElement('div');
        div.classList = 'col';
        //Create new figure attiribute, get a cover in it and give a link to it
        const newFigure = document.createElement('figure');
        const newCoverLink = document.createElement('a');
        const img = document.createElement('img');
        img.src = newImgSrc;
        img.alt = result.title;
        newCoverLink.append(img);
        newCoverLink.href = `https://openlibrary.org${result.key}`;
        newFigure.append(newCoverLink);
        div.append(newCoverLink);
        //books.append(div);
        
        //Book's info
        const divInfo = document.createElement('div');
        //div.classList = 'row';
        const newTitleLink = document.createElement('a');
        newTitleLink.href = `https://openlibrary.org${result.key}`;
        newTitleLink.innerText = result.title;
        const newP = document.createElement('p');
        newP.innerText = result.author_name;
        divInfo.append(newTitleLink);
        divInfo.append(newP);
        div.append(divInfo);
        books.append(div);
        
    }
};