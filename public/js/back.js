// This is the back button function
const backButton = document.querySelector('#back-btn');

backButton.addEventListener('click', function(event) {
    event.preventDefault();

    document.location.replace('/')
})