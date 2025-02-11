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



const urlParams=new URLSearchParams(window.location.search);
const genre=urlParams.get("genre");
console.log("Selected genre:", genre);

const cardsContainer=document.querySelector(".cards-container");
async function musicGenre() {

    try{
        const apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=8cb724ba&format=json&tags=${genre}&limit=20`;
        const response = await fetch(apiUrl);
      
if(!response.ok){

    throw new Error(`Error: ${response.status}`);
}

const data=await response.json();
console.log("API response:", data);
const results=data.results;
results.forEach(track => {
    const card=document.createElement("div");
    card.classList.add("card");
    card.innerHTML=` <img src="${track.image}" class="card-img-top" alt="${track.name}"   onerror="'https://www.jamendo.com/assets/images/default_track.png';">
  <div class="card-body">
    <h5 class="card-title">${track.name}</h5>
    <a class="card-text"><small>${track.artist_name}</small></a>
     <i class="bi bi-play-circle"></i>
  </div>`

  cardsContainer.append(card);
});


    }
    catch(err){

        console.log(err.message);
        
    }
}

musicGenre();


const navbarToggler=document.querySelector(".navbarToggler");
const navbarCollapse=document.querySelector(".navbar-collapse");
navbarToggler.addEventListener("click",(e)=>{

setTimeout(()=>{
if ( navbarCollapse.classList.contains("show")) {
  navbarCollapse.style.backgroundColor=" #0d0d0d";
}


},100)
});