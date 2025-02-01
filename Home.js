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




// const topRow=document.querySelector(".top-row");
// const bottomRow=document.querySelector(".bottom-row");

// const bigBox1=document.querySelector(".big-box1");
// const bigBox2=document.querySelector(".big-box2");
// const smallBoxs1=document.querySelector(".small-boxs1");
// const smallBoxs2=document.querySelector(".small-boxs2");


// async function types(musics) {
    
// const musics=

// }