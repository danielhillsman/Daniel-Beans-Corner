// take value from each element and post to api/posts/new
const submitBtn = document.querySelector("#submit-btn");
let imageUrl;

// adding a post form for logged in user FUNCTION
async function newFormHandler(event) {
    event.preventDefault();
  
    // turning classes and IDs to var
    const make_name = document.querySelector('#make_name').value;
    const transmission = document.querySelector('#transmission').value;
    const salvage_title = document.querySelector('.salvage_title:checked') ? "YES": "NO";
  
    // function to add post details for user
    const response = await fetch(`/api/post/new`, {
      method: 'POST',
      body: JSON.stringify({
        make_name,
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
      alert('Failed to add post.');
    }
  }
// End of Function

  //Function to use photos using Cloudinary
  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'danielbeanscorner', 
    uploadPreset: 'fannt0nv'}, (error, result) => { 
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


