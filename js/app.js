const API_KEY = '15674931-a9d714b6e9d654524df198e00&q';
const imagesContainer = document.querySelector('.images');
const galleryContainer = document.querySelector('.gallery');
const sliderContainer = document.querySelector('#slider');
const selectedImg = []
const searchImages = async () => {

    sliderContainer.classList.add('d-none')
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
    }

    inputSearch.value=''
}

const displayImages = ({
    hits
}) => {
    imagesContainer.style.display = 'block';
    galleryContainer.textContent = ''
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
    if(selectedImg.includes(imageUrl)){
        return
    }
    selectedImg.push(imageUrl)
    target.classList.add('selectedImg')
}

let sliderIndex=0;
const createSlide = ()=>{
    sliderContainer.textContent=''
    if(selectedImg.length <2){
        alert('Select atleast 2 images')
        return
    }
    sliderContainer.classList.remove('d-none');
    sliderContainer.classList.add('position-relative')
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex h-100 w-100 justify-content-between align-items-center position-absolute px-5";
    prevNext.innerHTML = ` 
    <span class="prev text-light" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
    <span class="next text-light" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
    `;

    
  sliderContainer.appendChild(prevNext);
  
  document.querySelector('.slider-content').style.display = 'block';
  // hide image aria
  imagesContainer.style.display = 'none';

  const duration = +document.getElementById('inputDuration').value*1000 || 5000;
  document.getElementById('inputDuration').value = ''
  if(duration<5000){
    alert('Less then 5 sec not allowed ')
    
    return
  }

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
    const sliderItem = document.querySelectorAll('.slider-item');
    
    if(index>selectedImg.length-1)sliderIndex =0;
    else if(index<0)sliderIndex = selectedImg.length-1;
    else{
        sliderIndex =index;
    }
    sliderItem.forEach(imagesItem =>{
        imagesItem.classList.add('d-none');
    })
    sliderItem[sliderIndex].classList.remove('d-none')

}

const changeItem = (index) =>{
     const change = sliderIndex+index;
    changeSlide(change)
}