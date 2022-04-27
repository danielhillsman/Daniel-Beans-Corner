// updating button
const upButton = document.querySelector('#updateBtn');

upButton.addEventListener('click', function(event) {
    event.preventDefault();

    document.location.replace('/')
})



// deleting button
const delButton = document.querySelector('#updateBtn');

delButton.addEventListener('click', function(event) {
    event.preventDefault();

    document.location.replace('/update')
})