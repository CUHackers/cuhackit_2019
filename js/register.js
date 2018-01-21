const registerLink = 'https://docs.google.com/forms/d/e/1FAIpQLSe74iE8SkqVFOAR9szMRofQZZuvF_ptVntQmUlIxPupSjg4Fg/viewform?usp=sf_link';

$(document).ready(() => {
    $('.register').click(event => {
        window.open(registerLink, '_blank');
    });
});

