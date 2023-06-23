const API_KEY='d8702ea2807e4187b28eecafe74ef926';
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));
function reload(){
    window.location.reload();
}

async function fetchNews(query){
   const res= await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data=await res.json();
    console.log(data);
    getData(data.articles);

}
function getData(articles){
    const cardContainer =document.getElementById("cards-container");
    const newsCardTemp= document.getElementById('temp-news-card');
    cardContainer.innerHTML= "";
    articles.forEach(article =>{
        if(!article.urlToImage)
        {
            return;
        }
        const cardClone=newsCardTemp.content.cloneNode(true);
        fillData(cardClone,article);
        cardContainer.appendChild(cardClone);
    });

}

function fillData(cardClone,article){
    const newImg=cardClone.querySelector('#news-img');
    const newTitle=cardClone.querySelector('#title');
    const newSource=cardClone.querySelector('#source');
    const newDescription=cardClone.querySelector('#description');
    newImg.src=article.urlToImage;
    newTitle.innerHTML=article.title;
    newDescription.innerHTML=article.description;
    
    const date=new Date(article.publishedAt).toLocaleString("en-Us",{
        timeZone: "Asia/Jakarta"
    });
    newSource.innerHTML=` ${article.source.name} ﹒ ${date}`

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
}

let currentSelected=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currentSelected?.classList.remove('active');
    currentSelected=navItem;
    currentSelected.classList.add('active');
}

const searchButton =document.getElementById("search-btn");
const searchText =document.getElementById('input-text');

searchButton.addEventListener('click',()=>{
    const query =searchText.value;
    if(!query){
        return;
    }
    fetchNews(query);
    currentSelected?.classList.remove("active");
    currentSelected=null;
})