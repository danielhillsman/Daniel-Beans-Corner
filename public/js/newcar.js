// take value from each element and post to api/cars/new
const submitBtn = document.querySelector("#submit-btn");
let imageUrl;

// adding a car form for logged in user FUNCTION
async function newFormHandler(event) {
    event.preventDefault();
  
    // turning classes and IDs to var
    const make_name = document.querySelector('#make_name').value;
    const car_model = document.querySelector('#car_model').value;
    const year = document.querySelector('#year').value;
    const price = document.querySelector('#price').value;
    const mileage = document.querySelector('#mileage').value;
    const color = document.querySelector('#color').value;
    const transmission = document.querySelector('#transmission').value;
    const salvage_title = document.querySelector('.salvage_title:checked') ? "YES": "NO";
  
    // function to add car details for user
    const response = await fetch(`/api/cars/new`, {
      method: 'POST',
      body: JSON.stringify({
        make_name,
        car_model,
        year,
        mileage,
        price,
        color,
        transmission,
        salvage_title,
        imageUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add car.');
    }
  }
// End of Function

  //Function to use photos using Cloudinary
  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'elcaromodelo', 
    uploadPreset: 'gluoyzsf'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        imageUrl = result.info.url
        console.log('Done! Here is the image info: ', result.info); 
      }
    }
  )
  // addEventListener for sumbit photo to form
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);
  
// Sumbit button for
submitBtn.addEventListener('click', newFormHandler);


