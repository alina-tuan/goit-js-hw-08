import throttle from "lodash.throttle";

// ключ для сховища "feedback-form-state" у якому зберігаються поточні значення полів форми
const STORAGE_KEY = "feedback-form-state";
const refs = {
    form: document.querySelector(".feedback-form"),
    textarea: document.querySelector(".feedback-form textarea"),
    email: document.querySelector(".feedback-form input")
}
let formData = {};

savedFormData();

// сховище оновлюється не частіше, ніж раз на 500 мілісекунд
refs.form.addEventListener("submit", throttle(onFormSubmit, 500));
// refs.textarea.addEventListener("input", throttle(onTextareaInput, 500));
// refs.email.addEventListener("input", throttle(onEmailInput, 500));

refs.form.addEventListener("input", event => {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log(formData);
});


// Під час сабміту форми очищується сховище і поля форми
function onFormSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

// function onTextareaInput(event) {
//     const message = event.target.value;
//     localStorage.setItem(STORAGE_KEY, message);
// }

// function onEmailInput(event) {
//     const email = event.target.value;
//     localStorage.setItem(STORAGE_KEY, email);
// }

// Під час завантаження сторінки перевіряємо стан сховища, і якщо там є збережені дані, заповнюємо ними поля форми
// В іншому випадку поля повинні бути порожніми
function savedFormData() {
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    const parsedFormData = JSON.parse(savedFormData);
    if (parsedFormData) {
        formData = parsedFormData;
        refs.email.value = formData.email || '';
        refs.textarea.value = formData.message || '';
        console.log(formData);
    }
}