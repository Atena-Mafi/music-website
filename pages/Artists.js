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



//  middleSearchbox
const middleSearchbox=document.querySelector(".middle-searchbox");
const recommendationsBtn=document.querySelector(".recommendations-btn");

recommendationsBtn.addEventListener("click",(e)=>{

  e.preventDefault();
  const search=middleSearchbox.value.trim();
  if(search){
  window.location.href=`/pages/search.html?query=${encodeURIComponent(search)}`
  middleSearchbox.value="";
}
})
  
//  middleSearchbox ends





// Artists starts 
const cards=document.querySelector(".cards");

async function artists() {
    try{

const response=await fetch("https://api.jamendo.com/v3.0/artists/?client_id=8cb724ba&width=800&format=json&limit=12");

  if(!response.ok){

    throw new Error(`Error:${response.status}`);
  }

  const data=await response.json();

  const artists=data.results;


  artists.forEach(item => {
    const card=document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
    <img src="${item.image}" class="card-img" alt="${item.name}" onerror="this.onerror=null; this.src='https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';">
        <div class="card-img-overlay">
          <a class="card-text">${item.name}</a>
        </div>
        `;
        cards.append(card);


        card.addEventListener("click",(e)=>{

         const selected= encodeURIComponent (item.name);

            window.location.href=`/pages/artist.html?query=${selected}`;
        })
       
  });


    }

  catch(err){
    console.log(err.message);
  }


}

artists();






// Artists ends