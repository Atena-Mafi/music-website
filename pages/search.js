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
const searchQuery=urlParams.get("query");

const searchesults=document.querySelector(".search-results");
searchesults.textContent=searchQuery;


async function searched() {
try{
const response=await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(searchQuery)}&limit=12`,{

method:"GET",


headers:{
"Content-Type":"application.json",
}

})

if (!response.ok) {
    throw new Error(`Error:${response.status}`);
}

const data= await response.json();

const artists = data.forEach((arti)=> {
    const artist=document.createElement("div");
    artist.classList.add("card")
      artist.innerHtml=`
  <img src="${arti.img}" class="card-img" alt="${arti.name}">
  <div class="card-img-overlay">
    <a class="card-text">${arti.artist}</a>
  </div>
`

});
}
catch(err){

console.log(err.message);


}




    
}

// artist.innerHtml=`
// <img src="${arti.img}" class="card-img" alt="${arti.name}">
// <div class="card-img-overlay">
//   <h5 class="card-title">Card title${song.name}</h5>
//   <p class="card-text">${arti.artist}</p>
// </div>