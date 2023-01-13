import { Return_smallest_column ,Adding_in_columns, ShowData,column_height_measure } from "./data_addition.js";
import {Go_to_edit_mode,Open_Close_PopUp} from "./glassify.js";
import {delete_card,Rewriter,edit_card,save_card} from "./slider_button_clicks.js";
import {color_change} from "./shift_colors.js";
import {reArrange,correct_input_flexing} from "./responsive_control.js";
import {add_delete_option,add_edit_option,add_save_option} from "./data_addition.js";
"use strict";
window.color_change = color_change;
window.correct_input_flexing=correct_input_flexing;
window.onload = ShowData("access");

window.Open_Close_PopUp=Open_Close_PopUp;
window.Go_to_edit_mode=Go_to_edit_mode;

window.column_height_measure=column_height_measure;
window.Rewriter=Rewriter;
window.edit_card=edit_card;

window.delete_card=delete_card;
window.save_card=save_card;
window.reArrange=reArrange;


let three_column = window.matchMedia("(max-width:1347px)");
let two_column = window.matchMedia("(max-width:1029px)");
let one_column = window.matchMedia("(max-width:709px)");
three_column.addEventListener("change", function () { reArrange(); });
two_column.addEventListener("change", function () { reArrange(); });
one_column.addEventListener("change", function () { reArrange(); });

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

function Post_data() {
    let plus_button=document.getElementById("plus_button");
    plus_button.disabled=true;

    let save_request = new XMLHttpRequest();
    let token = String(document.getElementsByName("csrfmiddlewaretoken")[0].value);
    save_request.open("POST", "Save", true);
    save_request.setRequestHeader('X-CSRFToken', token);
    save_request.getResponseHeader('Content-type', 'application/json');

    save_request.onload = function () {
        if (this.status === 200) {
            let response = JSON.parse(this.response);
            if (response["response"] == "saved") {
                document.getElementById("center_text").style.display = "none";
                console.log("successfully saved into binging");
                let id = response["id"];
                let height=parseFloat(response["height"]);
                let column_number=Return_smallest_column();
                let slide_data = add_delete_option(id) + add_save_option(id) + add_edit_option(id);
                Adding_in_columns(save_params["web_src"],  save_params["name"], column_number, slide_data, height);

                if(column_height_measure["column_" + String(column_number)]!=0){
                     column_height_measure["column_" + String(column_number)]+=20;   
                }
                column_height_measure["column_" + String(column_number)] += height;

                Open_Close_PopUp();

                let cards = document.getElementsByClassName("edit_card_slide")
                for (let i = 0; i < cards.length; i++) {
                    if (cards[i].style.display == "flex") {

                        cards[i].style.display = "none";
                        
                    }
                }
                document.getElementById("edit_mode_button_icon").style.color = "var(--icon_color)";
            }
            else {
                alert("Please Enter all the details");
            }
        }
        plus_button.disabled = false;
    };
    let height = document.getElementById("myRange").value;
    console.log(height);

    let web = document.getElementById("web_url_value");
    let name = document.getElementById("content_name_value");
    let save_params = { "web_src": web.value,  "name": name.value ,"height":height};
    save_request.send(JSON.stringify(save_params));

}
window.Post_data=Post_data;