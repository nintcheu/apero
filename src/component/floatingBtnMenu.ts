
export default class FloatingBtnMenu {

    elems_fixed_btn : NodeListOf<HTMLElement>;
    doc: Document;
    M: any;


    constructor(doc: Document,  m:any) {
        this.doc = doc;
        this.elems_fixed_btn = doc.querySelectorAll('.fixed-action-btn');
        this.M = m;
    }

    init(): void {
        this.M.FloatingActionButton.init(this.elems_fixed_btn, {});
    }


    addListener(): void {
        let elems_fixed_btn_actions = this.doc.querySelectorAll('.fixed-action-btn li a i');

        elems_fixed_btn_actions.forEach((href) => {
            href.addEventListener("click", (e) => {

                console.log("_profileAccessToken: " + window.localStorage.getItem('_profileAccessToken'));
                //console.log(e);
                //console.log("btnClicked: " + e.target.firstChild.data);

            });

        });

    }

}