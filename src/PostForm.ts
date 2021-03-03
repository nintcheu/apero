export default class PostForm {


    init(): void {

    
        var elems_chips = document.querySelectorAll('.chips');

        let options_chips = {};
        options_chips.data = [];

        options_chips.placeholder = 'Contenu du plat';
        let instances_chips = M.Chips.init(elems_chips, options_chips);



        // -- JS : MODAL FORM PUBLISHING DISH ---

        let elems_select = document.querySelectorAll('select');
        M.FormSelect.init(elems_select, {});

        let publishing_form_modal = document.getElementById('modal-publishing-form');
        let publishing_form_modal_options = {};
        publishing_form_modal_options.onOpenStart = () => { console.log("Avant de t'ouvrir, fait ceci! ") };
        publishing_form_modal_options.onOpenEnd = () => { console.log("Une fois ouvert, fait ceci! ") };
        publishing_form_modal_options.onCloseStart = () => { console.log("Avant de te fermer. Fait ceci!") };
        publishing_form_modal_options.onCloseEnd = () => { console.log("Une fois fermé, fait ceci!") };
        M.Modal.init(publishing_form_modal, publishing_form_modal_options);
        var publishing_form_modal_links = document.querySelectorAll('id.modal-publishing-from .modal-footer a');
        publishing_form_modal_links.forEach((href) => {
            href.addEventListener("click", (e) => {
                //console.log(e);
                //console.log(e.target.firstChild.data);

            });

        });


    }

}