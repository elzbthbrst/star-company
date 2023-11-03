nextBtn.addEventListener('click', onNextBtnClick)
returnBtn.addEventListener('click', onReturnBtnClick)
formGender.addEventListener('click', onFormGenderClick)
formAge.addEventListener('click', onDFormAgeClick)
startBtn.addEventListener('click', onStartBtnClick)

let active = 0

slideForm()

function onFormGenderClick(e) {
    formGender.classList.toggle(CLASS_IS_ACTIVE)
    onOptionClick(formGender)

}

function onDFormAgeClick(e) {
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





