export default class Carousel {

    elems_carousel: NodeListOf<HTMLElement>;
    M: any;

    constructor(doc: Document, m:any) {
        this.elems_carousel = doc.querySelectorAll('.carousel');
        this.M = m;
    }

    init(): void {
        this.M.Carousel.init(this.elems_carousel , {});
    }

}