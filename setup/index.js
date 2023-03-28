import data from "../data.json" assert {type: "json"}

const icons = {
    facebook: "../icons/facebook.svg",
    heart: "../icons/heart.svg",
    instagram: "../icons/instagram-logo.svg"
} 

const layoutPlaceholder = document.querySelector(".layout-placeholder")  
const loadmore = document.getElementById("load-more")
const numberOfColumns = document.getElementById("numberOfColumns")
const darkTheme = document.getElementById("darkTheme")
const theme = document.querySelectorAll('input[name="theme"]')
const cardBackGroundColor = document.getElementById("cardBackgroundColor")
const cardSpaceBetween = document.getElementById("cardSpaceBetween")
const filterSource = document.querySelectorAll('input[name="filterBySource"]')




window.addEventListener("DOMContentLoaded", ()=>{
    listedCard()
    handlingLikes()
})


loadmore.addEventListener("click",()=>{
    addCard()
    handleLoadMore()
    checkedTheme()
    handlingLikes()
})

filterSource.forEach((source)=>{
    source.addEventListener("click", ()=>{
    
        if(source.value !== "all"){
            deleteCards()
            for(let i = 0; i < data.length; i++){
                if(data[i].source_type === source.value){
                    createCard(data[i],icons)
                }
            }
            checkedTheme()
            handlingLikes()
        }else if(source.value === "all"){
		deleteCards()
            for(let i = 0; i < data.length; i++){
                createCard(data[i],icons)
		checkedTheme()
            }
            keepTrack()
        }
    }) 
})


cardBackGroundColor.addEventListener("input", (event)=>{
    handleLoadMore(event)
})


numberOfColumns.addEventListener("change", (e)=>{
    changeColumns(e.target.value)
})


theme.forEach((el)=>{
    el.addEventListener("click", ()=>{
        checkedTheme()
    })
})


cardSpaceBetween.addEventListener("input", (e)=>{
    let spaceBetween = e.target.value
    layoutPlaceholder.style.gap = `${spaceBetween}`
})



function handlingLikes(){
    const hearts = document.querySelectorAll("#heart")
    
    hearts.forEach((heart)=>{
        let val = false
        heart.addEventListener("click", (el)=>{
            if(!val){
                let likes = el.target.nextElementSibling
                let count = parseInt(likes.innerHTML);
                count++
                likes.innerHTML = count;
                val = true
            }else if (val){
                let likes = el.target.nextElementSibling
                let count = parseInt(likes.innerHTML);
                count--
                likes.innerHTML = count;
                val = false
            }  
        
        })
    })

}

function deleteCards(){
    const cards = document.querySelectorAll(".card")
    cards.forEach((cd)=>{
        cd.parentNode.removeChild(cd)
    })
}

function handleLoadMore() {
    const cards = document.querySelectorAll('.card');
    const color = document.querySelector("#cardBackgroundColor").value
    cards.forEach(card => {
      card.style.backgroundColor = `${color}`;
    });
  }



function addCard(){
    let count = document.querySelectorAll(".card").length
     for(let i = count; i < count + 4; i++){
        createCard(data[i], icons)
    }
    keepTrack()
}


function keepTrack(){
    let count = document.querySelectorAll(".card").length
    if(count >= data.length){
    document.querySelector(".card-actions").style.display ="none"
  }
}

function checkedTheme(){
    const cards = document.querySelectorAll('.card');
    cards.forEach((c) => {
            if(darkTheme.checked){
                c.classList.add("dark-mode")
            }else{
                c.classList.remove("dark-mode")
        }
    })
}


function listedCard(){
    for(let i = 0; i < 4; i++){
        createCard(data[i],icons)
    }
}


function changeColumns(target){
    if(target === "dynamic"){
        layoutPlaceholder.style.gridTemplateColumns = `repeat(4,minmax(150px, auto))`;
    }else{
        layoutPlaceholder.style.gridTemplateColumns = `repeat(${target},minmax(150px, auto))`;
    }
}


function createCard(card,icon){
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML =`
    <div class="card-header">
	    <div class="card-des"> 
			<img class="profile-img" src="${card.profile_image}" alt="${card.type}">
			<div>
			<h4>${card.name}</h4>
			<span>${card.date}</span>
			</div>
		</div>
        <a href="${card.source_link}">
		<img class="logo-img" src="${icon[card.source_type]}" alt="${card.type}">
        </a>
	</div>
	<div class="section-img">
	        <img class="main-img" src="${card.image}" alt="${card.type}">
	</div>
	<div class="section">
	    <p>${card.caption}</p>
	</div>
	<hr>
	<div class="likes">
	    <img id="heart" color="red" src="${icon.heart}">
	    <span id="likes">${card.likes}</span>
	</div>
    `;

    layoutPlaceholder.appendChild(div)
}
