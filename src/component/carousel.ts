export default class Carousel {

    elems_carousel: NodeListOf<HTMLElement>;

    constructor(doc: Document) {
        this.elems_carousel = doc.querySelectorAll('.carousel');
    }

    init(): void {
        M.Carousel.init(this.elems_carousel , {});
    }

}