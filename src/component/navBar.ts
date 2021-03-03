export default class NavBar {
    elems_nav: NodeListOf<HTMLElement>;

    constructor(doc: Document) {
        this.elems_nav = doc.querySelectorAll('.sidenav');
    }

    init(): void {
        M.Sidenav.init(this.elems_nav, {});
    }
}
