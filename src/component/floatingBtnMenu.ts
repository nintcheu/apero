
export default class FloatingBtnMenu {

    elems_fixed_btn : NodeListOf<HTMLElement>;
    doc: Document;

    constructor(doc: Document) {
        this.doc = doc;
        this.elems_fixed_btn = doc.querySelectorAll('.fixed-action-btn');
    }

    init(): void {
        M.FloatingActionButton.init(this.elems_fixed_btn, {});
    }


    addListener(): void {
        let elems_fixed_btn_actions = this.doc.querySelectorAll('.fixed-action-btn li a i');

        elems_fixed_btn_actions.forEach((href) => {
            href.addEventListener("click", (e) => {

                console.log("_profileAccessToken: " + window.localStorage.getItem('_profileAccessToken'));
                //console.log(e);
                console.log("btnClicked: " + e.target.firstChild.data);

            });

        });

    }

}