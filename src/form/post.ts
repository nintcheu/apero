export default class PostForm {

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