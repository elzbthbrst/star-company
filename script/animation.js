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

function onOptionClick(item) {
    item.querySelectorAll(SELECTOR_INPUT).forEach(el => {
        el.addEventListener('click', (e) => {
            if (el.checked) {
                e.stopPropagation()
                setTimeout(() => {
                    item.classList.remove(CLASS_IS_ACTIVE)
                })
                item.querySelector(SELECTOR_SELECT_DROPDOWN_SELECT).innerHTML = el.value
            }
        })
    })
}

function checkIsFinalSlide(active, list) {
    if (active === list.length - 2) {
        nextBtn.classList.add(CLASS_DISPLAY_NONE)
        startBtn.classList.remove(CLASS_DISPLAY_NONE)
    }
}
