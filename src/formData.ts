/*export const formData = (form: HTMLFormElement) => {

    const inputs = form.querySelectorAll('input');

    let values: { [prop: string]: string } = {};

    if (inputs) {

        inputs.forEach(input => {
            values[input.id] = input.value;
        });
    }


    return values;
};
*/



export default class FormData {

    inputs: NodeListOf<HTMLInputElement>;
    values: { [prop: string]: string } = {};

    constructor(form: HTMLFormElement) {
        this.inputs = form.querySelectorAll('input');
    }

    getKeyValues(): Object {
        if (this.inputs) {

            this.inputs.forEach(input => {
                this.values[input.id] = input.value;
            });
        }
        return this.values;
    }
}

