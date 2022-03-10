const API_KEY = '15674931-a9d714b6e9d654524df198e00&q';
const imagesContainer = document.querySelector('.images');
const galleryContainer = document.querySelector('.gallery');

const searchImages =async () =>{

    const inputSearch = document.getElementById('search-Input');
    const inputValue = inputSearch.value;
    if(!inputValue){
        return;
    }
    const url = `https://pixabay.com/api/?key=${API_KEY}=${inputValue}&image_type=photo&pretty=true`;

//    try{
    const res = await fetch(url);
    const data = await res.json();

    displayImages(data);
//    }catch(e){
       /* alert('Sorry! Something is wrong.')
       console.log(e) */
//    }
}

const displayImages = ({hits}) =>{
     console.log(hits);
    imagesContainer.style.display = 'block';
    
    hits.forEach(image => {
        const div = document.createElement('div');
    
        div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    
        div.innerHTML = `
        <img class="img-fluid img-thumbnail"
        onclick="selectItem('${image.webformatURL}')"
        src="${image.webformatURL}" >
        `;
        
        galleryContainer.appendChild(div);
    
    });
    
}

const selectItem = (imageUrl) =>{
    
}