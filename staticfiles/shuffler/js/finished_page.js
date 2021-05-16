import { ShowData} from "./data_addition.js";
import { Go_to_edit_mode,Open_Close_PopUp } from "./glassify.js";
import { delete_card,edit_card,Rewriter } from "./slider_button_clicks.js";
import { color_change} from "./shift_colors.js";
import { reArrange, correct_input_flexing } from "./responsive_control.js";

window.color_change=color_change;
window.onload = ShowData("Access_frame");
window.correct_input_flexing = correct_input_flexing;
//setting functions to be globally available to window class instead of being module scoped
window.Open_Close_PopUp = Open_Close_PopUp;
window.Rewriter = Rewriter;
window.Go_to_edit_mode = Go_to_edit_mode;
window.delete_card = delete_card;
window.edit_card = edit_card;
window.reArrange = reArrange;

let three_column = window.matchMedia("(max-width:1347px)");
let two_column = window.matchMedia("(max-width:1029px)");
let one_column = window.matchMedia("(max-width:709px)");
three_column.addEventListener("change", function () {
  reArrange();
});
two_column.addEventListener("change", function () {
  reArrange();
});
one_column.addEventListener("change", function () {
  reArrange();
});

//middle card event listeners
let cross_div = document.getElementById("cross_div");
cross_div.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("plus_button").setAttribute("onclick","Post_data()");
});

let range_tweaker = document.querySelector("#myRange");
range_tweaker.addEventListener("input",function(){
    let dotted_card = document.getElementById("card_handler");
    dotted_card.style.height = String(this.value)+"px";
});

let card_name = document.getElementById("content_name_value");
card_name.addEventListener("input", function (event) {
    let dotted_card = document.querySelector("#card_handler");
    let h1_tag=dotted_card.childNodes[1];
    
    h1_tag.textContent = "";
    h1_tag.textContent = this.value;
});
correct_input_flexing();
window.addEventListener("resize",function(){
correct_input_flexing();
document.getElementById("myRange").max = String( document.getElementById("card_handler_div").clientHeight-30);
});
//middle card event listeners