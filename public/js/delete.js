const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#project-name').value.trim();
    const needed_funding = document.querySelector('#project-funding').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
  
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
    }