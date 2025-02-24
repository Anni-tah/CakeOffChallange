

    const cakeList = document.getElementById('cake-list');
    const cakeDetails =document.getElementById('cake-details');
    const cakeImg = document.getElementById('cake-image');
    const cakeDesc = document.getElementById('cake-description');
    const cakeName = document.getElementById('cake-name');
    const reviewList = document.getElementById('review-list');
    const addReview=document.getElementById('add-review');
    const reviewArea =document.getElementById('review');
    const editDesc = document.getElementById('description');
    const updateCake =document.getElementById('update-cake');

    let selectedCake = null;


    fetch('http://localhost:3000/cakes') .then(response=>{
      if(!response.ok){
        throw new Error('Response was not ok');
      }
      return response.json()

    })
    .then(cakes=> populateCakeList(cakes));


    function populateCakeList(cakes){
    cakeList.innerHTML='';
    cakes.forEach(cake=>{
    const li = document.createElement('li');
    li.textContent= cake.name;
   
    li.addEventListener('click',()=> displayCakeDetails(cake));
     cakeList.appendChild(li); 

  });
}
function displayCakeDetails(cake){
      selectedCake =cake;
      cakeName.textContent= cake.name;
      cakeImg.src = cake.image_url;
      cakeDesc.textContent=cake.description;
      editDesc.value =cake.description;
      populateReview(cake.reviews);

}
function populateReview(reviews){
      reviewList.innerHTML='';
      reviews.forEach(review =>{
        const reviewItem =document.createElement('li');
        reviewItem.textContent=review;
        reviewList.appendChild(reviewItem);
      });
      deleteReviews();
    }
  

//add review event

addReview.addEventListener('click',(event)=>{
  event.preventDefault();
  if(selectedCake){
    const reviewText = reviewArea.value.trim();
    if(reviewText!== ''){
      selectedCake.reviews.push(reviewText);
      const newReview =document.createElement('li');
      newReview.textContent=reviewText
      reviewList.appendChild(newReview);
      reviewArea.value='';

    }else{
      alert('Please enter review')

    }
  }
  
  });

  //add cake description event
  updateCake.addEventListener('click',(event)=>{
    event.preventDefault();
    if(selectedCake){
      const editedDesc =editDesc.value.trim();
      if(editedDesc !==''){
        selectedCake.description= editedDesc;
        cakeDesc.textContent=editedDesc;

        
      }
    }
   

  });

 
//delete review from DOM

function deleteReviews(){
const reviews=reviewList.querySelectorAll('li');
reviews.forEach (review=>{
  review.addEventListener('click', (event)=>{
    event.preventDefault();
    review.remove();

  });
});
}



