export default class NavBar {
    elems_nav: NodeListOf<HTMLElement>;
    M: any;


    constructor(doc: Document, m:any) {
        this.elems_nav = doc.querySelectorAll('.sidenav');
        this.M = m;
    }

    init(): void {
        this.M.Sidenav.init(this.elems_nav, {});
    }
}
