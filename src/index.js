

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
    .then(cakes=>{
    
    cakeList.innerHTML='';
    cakes.forEach(cake=>{
    const li = document.createElement('li');
    li.textContent= cake.name;
   
    li.addEventListener('click',()=>{
      selectedCake =cake;
      cakeName.textContent= cake.name;
      cakeImg.src = cake.image_url;
      cakeDesc.textContent=cake.description;
      editDesc.textContent =cake.description

      reviewList.innerHTML='';
      
      cake.reviews.forEach(review =>{
        const reviewItem =document.createElement('li');
        reviewItem.textContent=review;
        reviewList.appendChild(reviewItem);
      });
    });
    cakeList.appendChild(li); 
});
})
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
  
  })
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

  })
 




