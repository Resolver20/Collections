import { ShowData} from "./data_addition.js";
import { Go_to_edit_mode,Open_Close_PopUp } from "./glassify.js";
import { delete_card,edit_card,Rewriter } from "./slider_button_clicks.js";
import { color_change} from "./shift_colors.js";

window.color_change=color_change;
window.onload = ShowData("Access_frame");
//setting functions to be globally available to window class instead of being module scoped
window.Open_Close_PopUp = Open_Close_PopUp;
window.Rewriter = Rewriter;
window.Go_to_edit_mode = Go_to_edit_mode;
window.delete_card = delete_card;
window.edit_card = edit_card;

let cross_div = document.getElementById("cross_div");
cross_div.addEventListener("click", function (event) {
    event.preventDefault();
});

let image_input = document.getElementById("image_url_src");
image_input.addEventListener("keyup", function (event) {
    event.preventDefault();

    let image_preview = document.getElementById("image_preview");
    let image_handler = document.getElementById("image_handler");
    let image_icon = document.getElementById("image_icon");

    image_icon.style.display = "none";
    image_handler.style = "height:auto;"
    image_preview.style = "border:1px dashed "+(document.body.style.getPropertyValue("--icon_color")).toString()+";"
    image_preview.src = this.value;
});

let image_preview = document.getElementById("image_preview");
image_preview.onerror = function () {
    let icon = document.getElementById("image_icon");
    image_icon.style.display = "flex";
}
