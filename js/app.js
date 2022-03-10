const API_KEY = '15674931-a9d714b6e9d654524df198e00&q';
const imagesContainer = document.querySelector('.images');
const galleryContainer = document.querySelector('.gallery');
const sliderContainer = document.querySelector('#slider');
const selectedImg = []
const searchImages = async () => {

    const inputSearch = document.getElementById('search-Input');
    const inputValue = inputSearch.value;
    if (!inputValue) {
        return;
    }
    const url = `https://pixabay.com/api/?key=${API_KEY}=${inputValue}&image_type=photo&pretty=true`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        displayImages(data);
    } catch (e) {
        alert('Sorry! Something is wrong.')
        console.log(e)
    }
}

const displayImages = ({
    hits
}) => {
    console.log(hits);
    imagesContainer.style.display = 'block';

    hits.forEach(image => {
        const div = document.createElement('div');

        div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';

        div.innerHTML = `
        <img class="img-fluid img-thumbnail"
        onclick="selectItem(event,'${image.webformatURL}')"
        src="${image.webformatURL}" >
        `;

        galleryContainer.appendChild(div);

    });

}

const selectItem = ({target}, imageUrl) => {
    console.log(target)
    if(selectedImg.includes(imageUrl)){
        console.log('selected')
        return
    }
    console.log(selectedImg)
    selectedImg.push(imageUrl)
    target.classList.add('selectedImg')
}

let sliderIndex=0;
const createSlide = ()=>{
    if(selectedImg.length <2){
        alert('Select atleast 2 images')
        return
    }

    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
    <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
    <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
    `;

    
  sliderContainer.appendChild(prevNext);
  
  document.querySelector('.slider-content').style.display = 'block';
  // hide image aria
  imagesContainer.style.display = 'none';

  const duration = document.getElementById('inputDuration').value || 1000;

  selectedImg.forEach(image =>
    {
        let div = document.createElement('div')
    div.className = "slider-item";
    div.innerHTML = `<img class="w-100"
    src="${image}"
    alt="">`;
    sliderContainer.appendChild(div)
    })

    changeSlide(sliderIndex);

    setInterval(()=>{
    changeSlide(++sliderIndex);
    },duration)
}


const changeSlide = (index) =>{
    console.log(index)
    const sliderItem = document.querySelectorAll('.slider-item');
    console.log(selectedImg.length);

    if(index>selectedImg.length)sliderIndex =0;
    else if(index<0)sliderIndex = selectedImg.length-1;

    sliderItem.forEach(imagesItem =>{
        imagesItem.classList.add('d-none');
    })
    sliderItem[sliderIndex].classList.remove('d-none')

}

const changeItem = (index) =>{
    changeSlide(sliderIndex+index)
}