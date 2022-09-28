const cards = document.getElementById('card');
const searchBar = document.getElementById('cari-list');
let contentNews = [];

searchBar.addEventListener('input', e => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    const filteredSearch = contentNews.filter((c) => {
            return c.title.toLowerCase().includes(value)
    })
    console.log(filteredSearch);
    displayCharacters(filteredSearch);
})

const loadCharacters = async () => {
    try {
        const res = await fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=fc25e05f7a8a4c56bbd092ac3354ad19');
        const data = await res.json();
        contentNews = await data.articles;
        console.log(contentNews);
        displayCharacters(contentNews);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
                <div class="col-md-3 mb-3 item-list">
                    <div class="card">
                        <img src="${character.urlToImage}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${character.author}</h5>
                            <p class="card-text">${character.content}</p>
                            <a href="#" class="btn btn-primary">Detail</a>
                        </div>
                    </div>
                </div>
            `;
        })
        .join('');
    cards.innerHTML = htmlString;
};

loadCharacters();