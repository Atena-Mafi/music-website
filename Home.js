const searchIcon=document.querySelector("#searchIcon");
const navbarNav=document.querySelector(".navbar-nav");
const searchForm=document.querySelector("#searchForm");
const searchingInput=document.querySelector("#searching");
const searchBtn=document.querySelector(".search-btn");
const closeSearchBtn=document.querySelector("#closeSearch");
searchIcon.addEventListener("click",(e)=>{
  e.preventDefault();
  navbarNav.classList.add("d-none");
  searchForm.classList.remove("d-none");
  searchingInput.focus();

})

searchBtn.addEventListener("click",(e)=>{

  e.preventDefault();
  const search=searchingInput.value.trim();
  if(search){
  window.location.href=`/pages/search.html?query=${encodeURIComponent(search)}`
  searchingInput.value="";
}
  
});


closeSearchBtn.addEventListener("click",(e)=>{

  e.preventDefault();
  searchForm.classList.add("d-none");
  navbarNav.classList.remove("d-none");

})


searchingInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){
  searchBtn.click();

}

})



const indicators=document.querySelector(".carousel-indicators");
const carouselInner=document.querySelector(".carousel-inner");
async function CarouselSlider() {
try{
   const response= await fetch(`https://corsproxy.io/?${encodeURIComponent("https://api.deezer.com/chart?limit=5")}`);
    if(!response.ok){
        throw new Error(`Error: ${response.status}`)
        
        }
        const answer= await response.json();
         
        const trackss = answer?.tracks?.data||[]; 

        
        carouselInner.innerHTML="";

        trackss.forEach((track,index)=> {
            const carouselItem=document.createElement("div");
            carouselItem.classList.add("carousel-item","CI");
                carouselItem.setAttribute("data-bs-interval", "3000");
            if(index===0){
                carouselItem.classList.add("active");
    
              }
            carouselItem.innerHTML=`<img
            src=${track?.album?.cover_big|| "default.jpg"}
            class="d-block w-100 img-i"
            alt="${track.title}"
          />
          <div class="carousel-caption d-none d-md-block top-0 mt-5">
            <p class="mt-5 mb-5 fs-2">
              Hot right now
            </p>
            <h1 class="mt-5  text-capitalize ">${track.title}</h1>
          </div>`

          carouselInner.append(carouselItem)
        });

       console.log(trackss);
       

}
catch(err){

    console.log(err.message);
    
}   
}
document.addEventListener("DOMContentLoaded", () => {
    CarouselSlider();
});













const popularTracks=document.querySelector(".popular-tracks");

async function  popularSongs() {
  try{

    const response=await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent("https://api.jamendo.com/v3.0/tracks/?client_id=8cb724ba&order=popularity_total&limit=12"),{
    method:"GET",
    headers:{
       "Content-Type":"application/json",
    }
    })

    if(!response.ok){

      throw new Error(`Erro: ${response.status}`)
    }
     
    const data= await response.json();
    const musics=data.results;
     musics.forEach((ele)=>{
       
     const music=document.createElement("div");
     music.classList.add("card");
     music.innerHTML=
     `<img src="${ele?.image||"default.jpg"}" class="card-img-top" alt="${ele.name}">
        <div class="card-body">
          <h5 class="card-title">${ele.name}</h5>
          <p class="card-text">${ele.artist_name}</p>
          <i class="bi bi-play-circle"></i>
          </div>`
          popularTracks.append(music);
     })
    
    console.log(musics);
    
    
  }


  catch(err){
    console.log(err.message);
    
  }

}


popularSongs();

const selectedGenre=document.querySelectorAll(".small-box");

selectedGenre.forEach((box)=>{


  box.addEventListener("click",(e)=>{
    const genre=e.target.textContent.trim();
    
    window.location.href=`/pages/tracks.html?genre=${genre}`;
    
    });
    
  
})


