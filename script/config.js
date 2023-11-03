const SELECTOR_ERROR_MESSAGE = '.error-message'
const SELECTOR_SELECT_DROPDOWN_SELECT = '.select-dropdown__select'
const SELECTOR_SELECT_DROPDOWN_FORM = '.select-dropdown__form'
const SELECTOR_INPUT = 'input'

const CLASS_FORM_IN = 'form__in'
const CLASS_FORM_OUT = 'form__out'
const CLASS_FORM_ACTIVE = 'form__active'
const CLASS_DISPLAY_NONE = 'display-none'
const CLASS_IS_ACTIVE = 'is-active'

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
