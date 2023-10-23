const form = document.querySelector('form')
const email = document.getElementById('mail')
const error = email.nextElementSibling;

// html specificcation
const emailRegExp =
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// rebuild valid constraation
// set vali/invalid class on email field
window.addEventListener("load", () => {
    // est if field is empty
    // if its noot, check if content is wellformed email
    const isValid = email.value.length === 0 || emailRegExp.test(email.value);
    email.className = isValid ? "valid" : "invalid";
});

email.addEventListener('input', () => {
    const isValid = email.value.length === 0 || emailRegExp.test(email.value)
    if (isValid) {
        email.className = 'valid'
        error.textContent = ''
        error.className = 'error'
    } else {
        email.className= 'invalid'
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValid = email.value.length === 0 || emailRegExp.test(email.value)
    if (!isValid) {
        email.className = 'invalid'
        error.textContent = ' i expected an email bich'
        error.className = 'error active'
    } else {
        email.className= 'valid'
        error.textContent = ''
        error.className = 'error'
    }
})
