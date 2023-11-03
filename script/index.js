logInform.addEventListener('submit', onLogInSubmit)
nextBtn.addEventListener('click', onNextBtnClick)
returnBtn.addEventListener('click', onReturnBtnClick)
formGender.addEventListener('click', onFormGenderClick)
formAge.addEventListener('click', onDFormAgeClick)
startBtn.addEventListener('click', onStartBtnClick)

let active = 0

slideForm()

function onLogInSubmit(e) {
    e.preventDefault()
    const email = logInform.email
    const password = logInform.password
    validateData(email)
    validateData(password)
    if (!REGEX_VALID.email.test(email.value)
        || !REGEX_VALID.password.test(password.value)) {
        return
    }
    const data = {
        'email': email.value,
        'password': password.value,
    }
    console.log(data);
}

function onFormGenderClick() {
    formGender.classList.toggle(CLASS_IS_ACTIVE)
    onOptionClick(formGender)

}

function onDFormAgeClick() {
    formAge.classList.toggle(CLASS_IS_ACTIVE)
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
    const input = formItems[active].querySelector(SELECTOR_INPUT)
    if (!REGEX_VALID[input.name].test(input.value)) {
        setError(input.name)
        return
    }
    removeError()
    checkIsFinalSlide(active, formItems)
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
    const input = formItems[active].querySelector(SELECTOR_INPUT)
    if (!REGEX_VALID[input.name].test(input.value)) {
        setError(input.name)
        return
    }
    removeError()
}

function isFormSelect() {
    return formItems[active].querySelector(SELECTOR_SELECT_DROPDOWN_FORM)
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





