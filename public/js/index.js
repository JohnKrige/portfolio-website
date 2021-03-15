const burger = document.querySelector('.burger__icon');
const navContent = document.querySelector('.nav__content');
const burgerImage = document.querySelector('.burger__icon');
const body = document.querySelector('body');

const burgerEventHandler = () => {
    const isOpen = burger.getAttribute('class').includes('open');
    if(!isOpen){
        openMenu();
    } else {
        closeMenu();
    }
};

const menuItems = document.querySelectorAll('.nav__item');

for(let item of menuItems){
    item.addEventListener('click', () => {
        closeMenu();
    })
};

const openMenu = () => {
    navContent.style.display = 'flex';
    navContent.style.height = '100vh';
    burgerImage.setAttribute('src', '../imgs/close.svg');
    burger.classList.add('open');
    body.classList.add('stop-scrolling');
};

const closeMenu = () => {
    const screenWidth = window.innerWidth;
    if(screenWidth < 1024){
        navContent.style.display = 'none';
    };
    navContent.style.height = 'auto';
    burgerImage.setAttribute('src', '../imgs/menu.svg');
    burger.classList.remove('open');
    body.classList.remove('stop-scrolling');
};

burger.addEventListener('click', burgerEventHandler);


const submitEmail = document.querySelector('.contact-form__submit');
const contactForm = document.querySelector('.contact-form');

submitEmail.addEventListener('click', async e => {
    e.preventDefault();
    clearErrors();
    displaySpinner();
    
    const formData = new FormData(contactForm);
    e.preventDefault();

    const response = await fetch('/', {
        method: 'POST',
        body: formData
    });

    if(response.status === 400) {
        const errors = await response.json();
        displayErrors(errors);
        hideSpinner();
    } else if (response.status === 200) {
        console.log('email sent successfully');
        clearFormInput();
        flashMessage('Email successfully submitted');
        hideSpinner();
    } else {
        hideSpinner();
        clearFormInput();
        flashMessage(
            'Fail to send :(',
            'Please still reach out at:', 
            'krigejohn@gmail.com'
            )
    }
});

const displayErrors = (errors) => {
    for (let error of errors){
        errorPar = document.createElement('p');
        errorPar.setAttribute('class', 'contact-form__error');
        errorPar.innerText = error.msg;
        
        const parentDiv = document.querySelector(`.contact-form__div--${error.param}-error`);

        parentDiv.appendChild(errorPar);
    }
};

const clearErrors = () => {
    const errorDivs = document.querySelectorAll('.contact-form__div');
    errorDivs.forEach( div => div.innerHTML = '');
};

const clearFormInput = () => {
    const inputs = document.querySelectorAll('.contact-form__input');
    inputs.forEach( input => input.value = '');
};

const flashMessage = (...arguments) => {
    const flashDiv = document.createElement('div');
    flashDiv.setAttribute('class', 'flash-message');
    for (let arg of arguments){
        const flashPar = document.createElement('p');
        flashPar.setAttribute('class', 'flash-message__par');
        flashPar.innerText = arg;
        flashDiv.appendChild(flashPar);
    }

    const contactPage = document.querySelector('.contact-page');
    contactPage.appendChild(flashDiv);
    removeFlash();
};

const removeFlash = () => {
    const timeout = setTimeout( () => {
        const flashDiv = document.querySelector('.flash-message');
        flashDiv.remove();
    }, 9000);
};

const displaySpinner  =() => {
    const spinner = document.querySelector('.send-email');
    spinner.style.display = 'flex';
}

const hideSpinner  =() => {
    const spinner = document.querySelector('.send-email');
    spinner.style.display = 'none';
}



