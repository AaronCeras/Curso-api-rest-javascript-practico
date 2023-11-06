headerTitle.addEventListener('click', () => {
    location.hash = '#Home';
})

//Esto es para no tener que dar doble click al boto de back
searchForm.addEventListener('submit', (event)=> {
    event.preventDefault();
});

//Esta parte es para no perder la capacidad de dar enter y se seleccione la lupa
searchFormInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        const input = decodeURI(searchFormInput.value);
        location.hash = `#search=${input}`;
    }
});

arrowBtn.addEventListener('click', () => {
    if (document.referrer.includes(window.location.origin)) {
        // La página anterior pertenece a tu propio sitio web
        history.go(-1); // Navega hacia atrás en el historial del navegador
    } else {
        // La página anterior es externa (por ejemplo, YouTube)
        // Redirecciona a una página específica de tu sitio web
        window.location.href = 'http://127.0.0.7:5500/index.html#Home'; // Cambia '/pagina-de-inicio' por la URL de la página a la que quieres redirigir
    }
});

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
})

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
})


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log(location);

    if(location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage() {
    console.log('Estamos en Home!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    
    //Este método es para evitar volver a preguntar a la API si ya tenemos datos en la sección de categorias
    const childrenCategoriesPreview = Array.from(categoriesPreviewList.children);
    if(!childrenCategoriesPreview.length){
        getTrendingMoviesPreview();
        getCategoriesPreview();
    }
}

function categoriesPage() {
    console.log('Estamos en Categories!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [ , categoryInfo] = location.hash.split('=');  // ['#category','id-name']
    const [categoryId , categoryName] = categoryInfo.split('-');
    // const categoryWithSpace = categoryName.replaceAll('%20', ' ');

    headerCategoryTitle.innerText = decodeURI(categoryName);

    getMoviesByCategory(categoryId);
    // window.scrollTo(0, 0);
}

function movieDetailsPage() {
    console.log('Estamos en Movies!!');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [ ,movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function searchPage() {
    console.log('Estamos en Search!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [ ,query] = location.hash.split('=');
    // headerCategoryTitle.innerHTML= `Resultados: ${busqueda}`
    getMoviesBySearch(query);
}

function trendsPage() {
    console.log('Estamos en Trends!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerText = 'Tendencias';

    getTrendingMovies();
}