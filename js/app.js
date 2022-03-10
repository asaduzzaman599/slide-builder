const API_KEY = '15674931-a9d714b6e9d654524df198e00&q';

const searchImages =async () =>{

    const inputSearch = document.getElementById('search-Input');
    const inputValue = inputSearch.value;
    if(!inputValue){
        return;
    }
    const url = `https://pixabay.com/api/?key=${API_KEY}=${inputValue}&image_type=photo&pretty=true`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
}