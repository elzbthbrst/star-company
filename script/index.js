const CLASS_DISPLAY_NONE = 'display-none'
const SELECTOR_ERROR_MESSAGE = '.error-message'
const CLASS_FORM_IN = 'form__in'
const CLASS_FORM_OUT = 'form__out'
const CLASS_FORM_ACTIVE = 'form__active'

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
const formGender = document.querySelector('#gender')
const formAge = document.querySelector('#age')

let active = 0
slideForm()

nextBtn.addEventListener('click', onNextBtnClick)
returnBtn.addEventListener('click', onReturnBtnClick)
formGender.addEventListener('click', onFormGenderClick)
formAge.addEventListener('click', onDFormAgeClick)
startBtn.addEventListener('click', onStartBtnClick)

function onFormGenderClick(e) {
    formGender.classList.toggle('is-active')
    onOptionClick(formGender)

}

function onOptionClick(item) {
    item.querySelectorAll('input').forEach(el => {
        el.addEventListener('click', (e) => {
            if (el.checked) {
                e.stopPropagation()
                setTimeout(() => {
                    item.classList.remove('is-active')
                })
                item.querySelector('.select-dropdown__select').innerHTML = el.value
            }
        })
    })
}

function onDFormAgeClick(e) {
    formAge.classList.toggle('is-active')
    onOptionClick(formAge)

}




function onNextBtnClick() {
    const formSelect = isFormSelect()

    if (formSelect) {
        const value = getSelectValue(formSelect)
        if (!value) {
            setError(formSelect.id)
            return
        }
        removeError()
        active = active + 1 < formItems.length ? active + 1 : active;
        slideForm();
        return
    }
    const input = formItems[active].querySelector('input')
    if (!REGEX_VALID[input.name].test(input.value)) {
        setError(input.name)
        return
    }
    removeError()
    if (active === formItems.length - 2) {
        nextBtn.classList.add(CLASS_DISPLAY_NONE)
        startBtn.classList.remove(CLASS_DISPLAY_NONE)
    }

    active = active + 1 < formItems.length ? active + 1 : active;
    slideForm();

}

function onReturnBtnClick() {
    if (nextBtn.classList.contains(CLASS_DISPLAY_NONE)) {
        nextBtn.classList.remove(CLASS_DISPLAY_NONE)
        startBtn.classList.add(CLASS_DISPLAY_NONE)
    }
    active = active - 1 >= 0 ? active - 1 : active;
    slideForm();
}

function onStartBtnClick() {
    const input = formItems[active].querySelector('input')
    if (!REGEX_VALID[input.name].test(input.value)) {
        setError(input.name)
        return
    }
    removeError()
}

function isFormSelect() {
    return formItems[active].querySelector('.select-dropdown__form')
}

function getSelectValue(formSelect) {
    let value
    formSelect.querySelectorAll('input').forEach((option) => {
        if (option.checked) {
            value = option.value
        }
    })
    return value
}

async function setError(name) {
    if (formItems[active].querySelector(SELECTOR_ERROR_MESSAGE)) {
        return
    }
    console.log(name);
    const errorTemplate = await getErrorTemplate(name)
    formItems[active].insertAdjacentHTML('beforeend', errorTemplate)
}

async function getErrorTemplate(name) {
    const errorList = await fetchError()
    console.log(name);
    const errorMessage = errorList[name][0]
    console.log(errorMessage);
    return `<p class="error-message">${errorMessage}</p>`
}

async function fetchError() {
    const { errors } = await fetch('https://run.mocky.io/v3/f6ca495a-0a08-40de-9889-e73d49d011d2')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to send data: ${response.status}`);
            }
            return response.json();
        })
        .catch((e) => console.error(e))
    return errors
}

function removeError() {
    if (formItems[active].querySelector(SELECTOR_ERROR_MESSAGE)) {
        formItems[active].querySelector(SELECTOR_ERROR_MESSAGE).remove()
    }
}

function slideForm() {
    formItems[active].classList.remove(CLASS_FORM_IN, CLASS_FORM_OUT)
    formItems[active].classList.add(CLASS_FORM_ACTIVE)
    progress[active].style.background = "#fff"

    for (let i = active + 1; i < formItems.length; i++) {
        formItems[i].classList.remove(CLASS_FORM_OUT)
        formItems[i].classList.add(CLASS_FORM_IN)
        progress[i].style.backgroundColor = "transparent"
    }

    for (let i = active - 1; i >= 0; i--) {
        formItems[i].classList.remove(CLASS_FORM_IN)
        formItems[i].classList.add(CLASS_FORM_OUT)

    }
}

