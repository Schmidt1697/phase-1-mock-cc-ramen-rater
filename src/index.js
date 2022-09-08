// write your code here

//API
// http://localhost:3000/ramens

document.addEventListener('DOMContentLoaded', () => {

//Load images into #ramen-menu div at top of page from API
//GET
fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(ramensArr => {
    ramensArr.forEach(renderRamens);
})

//POST Generalized
const createNewRamen = (url, body) => {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
}

function renderRamens(ramen){
    
    //make img tag
    const ramenImgElement = document.createElement('img');

    //add class
    ramenImgElement.className = "small-ramen-img"

    // add info to img from API
    ramenImgElement.src = ramen.image;
    
    //add to DOM
    const ramenImgContainer = document.querySelector('#ramen-menu');
    
    ramenImgContainer.append(ramenImgElement);

    //Add Event Listener
    //problem all run at once
    ramenImgElement.addEventListener('click', 
   () => {
        //access pic div from DOM
        const bigImage = document.querySelector(".detail-image");
        const h2 = document.querySelector(".name");
        const h3Restaurant = document.querySelector(".restaurant");

        //access rating and comment elements from DOM
        const spanRating = document.querySelector("#rating-display");
        const pComment = document.querySelector("#comment-display");

        //Update DOM contents from pic information
        bigImage.src = ramen.image;
        bigImage.setAttribute('alt',ramen.name);
        h2.textContent = ramen.name;
        h3Restaurant.textContent = ramen.restaurant;
        spanRating.textContent = ramen.rating;
        pComment.textContent = ramen.comment; 
   }); 

}


//Create a new Ramen

function handleNewRamenForm(e){
    e.preventDefault();
    
    const newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }

    //POST - update db w/ new ramen AND render to DOM
    createNewRamen('http://localhost:3000/ramens', newRamen)
    .then(renderRamens(newRamen))
    .catch(console.error)

    //reset  form after submit
    ramenForm.reset();
    
}

//listen for form submit (e.target = form)
const ramenForm = document.querySelector("#new-ramen");
ramenForm.addEventListener('submit', handleNewRamenForm)

// console.log(ramenForm)


})


