 const delButtonHandler = async (id) => {
    console.log('click')
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete posts');
      }
  };

  
  document
    .addEventListener('click', (e)=>{
      if (e.target.getAttribute('id')==='deleteBtn'){
        delButtonHandler(e.target.getAttribute('data-id'))
      }
      });
  