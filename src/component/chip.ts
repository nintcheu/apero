export default class Chip {

    elems_chip: NodeListOf<HTMLElement>;

    constructor(doc: Document) {
        this.elems_chip = document.querySelectorAll('.chips');
    }

    init(): void {
        M.Chips.init(this.elems_chip, {});
    }
}
