async function setError(name) {
    if (formItems[active].querySelector(SELECTOR_ERROR_MESSAGE)) {
        return
    }
    const errorTemplate = await getErrorTemplate(name)
    formItems[active].insertAdjacentHTML('beforeend', errorTemplate)
}

async function getErrorTemplate(name) {
    const errorList = await fetchError()
    const errorMessage = errorList[name][0]
    return `<p class="error-message text-arial-bold">${errorMessage}</p>`
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