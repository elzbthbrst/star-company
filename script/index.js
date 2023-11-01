const CLASS_DISPLAY_NONE = 'display-none'
const SELECTOR_ERROR_MESSAGE = '.error-message'
const CLASS_FORM_IN = 'form__in'
const CLASS_FORM_OUT = 'form__out'
const CLASS_FORM_ACTIVE = 'form__active'

const ERRORS = {
    "gender": "Please select a gender",
    "age": "Please select an age",
    "location": "Please enter a valid location",
    "email": "Please enter a valid email address",
    "password": "Please enter a password"
}

const REGEX_VALID = {
    "location": /^[#.0-9a-zA-Z\s,-]{8,20}$/,
    "email": /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    "password": /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
}


const formItems = document.querySelectorAll('.form__item')
const slideContainer = document.querySelector('.form__container')
const returnBtn = document.querySelector('.form__return')
const nextBtn = document.querySelector('.form__nav-btn_next')
const progress = document.querySelectorAll('.form__progress span');
const startBtn = document.querySelector('.form__nav-btn_start')
const errorMessage = document.querySelector('.form__item .error-message')





nextBtn.addEventListener('click', onNextBtnClick)
returnBtn.addEventListener('click', onReturnBtnClick)
startBtn.addEventListener('click', onStartBtnClick)


let active = 0
slideForm()


function onNextBtnClick() {
    
    const formSelect = isFormSelect()
    if (formSelect) {
        const value = formSelect.options[formSelect.selectedIndex].value
        if (!value) {
            setError(formSelect)
            return
        }
        removeError()
        console.log(value);
        active = active + 1 < formItems.length ? active + 1 : active;
        slideForm();
        return
    }
    const input = formItems[active].querySelector('input')
    if (!REGEX_VALID[input.name].test(input.value)) {
        setError(input)
        return
    }
    removeError()
    if (active === formItems.length - 2) {
        nextBtn.classList.add(CLASS_DISPLAY_NONE)
        startBtn.classList.remove(CLASS_DISPLAY_NONE)

    }
    console.log(input.value);
    active = active + 1 < formItems.length ? active + 1 : active;
    slideForm();

}

function onReturnBtnClick() {
    if(nextBtn.classList.contains(CLASS_DISPLAY_NONE)) {
        nextBtn.classList.remove(CLASS_DISPLAY_NONE)
        startBtn.classList.add(CLASS_DISPLAY_NONE)
    }
    active = active - 1 >= 0 ? active - 1 : active;
    slideForm();
}

function onStartBtnClick() {
    const input = formItems[active].querySelector('input')
    if (!REGEX_VALID[input.name].test(input.value)) {
        setError(input)
        return
    }
    console.log(input.value);
    removeError()
}

function postDataToServer() {

}

function isFormSelect() {
    return formItems[active].querySelector('select')
}

function removeError() {
    if (formItems[active].querySelector(SELECTOR_ERROR_MESSAGE)) {
        formItems[active].querySelector(SELECTOR_ERROR_MESSAGE).remove()
    }
} 

function setError(element) {
    const errorTemplate = getErrorTemplate(element.name)
    formItems[active].insertAdjacentHTML('beforeend', errorTemplate)

}

function getErrorTemplate(name) {
    return `<p class="error-message">${ERRORS[name]}</p>`
}

function slideForm() {
    formItems[active].classList.remove(CLASS_FORM_IN, CLASS_FORM_OUT)
    formItems[active].classList.add(CLASS_FORM_ACTIVE)
    progress[active].style.background = "#fff"

    for (let i = active + 1; i < formItems.length; i++) {
        formItems[i].classList.remove(CLASS_FORM_OUT)
        formItems[i].classList.add(CLASS_FORM_IN)
        progress[i].style.background = ""

    }

    for (let i = active - 1; i >= 0; i--) {
        formItems[i].classList.remove(CLASS_FORM_IN)
        formItems[i].classList.add(CLASS_FORM_OUT)

    }
}

