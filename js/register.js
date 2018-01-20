const registerLink = 'https://docs.google.com/forms/d/1-QdQVzFkVT0Jf9p6W1mME61E4SzrUGJ4seDlUaRO_5Q';

$(document).ready(() => {
    $('.register').click(event => {
        window.open(registerLink, '_blank');
    });
});

