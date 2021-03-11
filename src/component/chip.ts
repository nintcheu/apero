export default class Chip {

    elems_chip: NodeListOf<HTMLElement>;
    M: any;


    constructor(doc: Document, m: any) {
        this.elems_chip = document.querySelectorAll('.chips');
        this.M = m;
    }

    init(): void {
        this.M.Chips.init(this.elems_chip, {});
    }
}
