import { formData } from './forms';

document.addEventListener('DOMContentLoaded', (event) => {

    const form = document.querySelector('form')!;

    if (form) {

        form.addEventListener('submit', (e) => {

            e.preventDefault();
            const data = formData(form);
            console.log(data);

        });
    }

});



