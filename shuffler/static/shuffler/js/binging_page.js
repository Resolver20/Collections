import { Return_smallest_column ,Adding_in_columns, ShowData,column_height_measure } from "./data_addition.js";
import {Go_to_edit_mode,Open_Close_PopUp} from "./glassify.js";
import {delete_card,Rewriter,edit_card,save_card} from "./slider_button_clicks.js";
import {color_change} from "./shift_colors.js";
import {reArrange} from "./responsive_control.js";
"use strict";
window.color_change = color_change;

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


// let val = document.querySelectorAll('[data-ri~="2"]');

let cross_div = document.getElementById("cross_div");
cross_div.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("plus_button").setAttribute("onclick","Post_data()");
});

let image_input = document.getElementById("image_url_src");
image_input.addEventListener("keyup", function (event) {
    event.preventDefault();

    let image_preview = document.getElementById("image_preview");
    let image_handler = document.getElementById("image_handler");
    let image_icon = document.getElementById("image_icon");

    image_icon.style.display = "none";
    image_handler.style = "height:auto;"
    image_preview.style = "border:1px dashed " + (document.body.style.getPropertyValue("--icon_color")).toString() + ";";
    image_preview.src = this.value;
});

let image_preview = document.getElementById("image_preview");
image_preview.onerror = function () {
    let icon = document.getElementById("image_icon");
    image_icon.style.display = "flex";
}

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
                let slide_data = "<button  id='delete' value=" + String(id) + "  onclick='delete_card(this)'   class='slide_buttons' > <svg xmlns='http://www.w3.org/2000/svg' width='23' height='23' fill='currentColor' class='bi bi-x-square' viewBox='0 0 16 16' id='remove' > <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' /> <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' /> </svg> </button> <button    onclick='save_card(this)' id='save' value=" + String(id) + " class='slide_buttons'> <svg xmlns='http://www.w3.org/2000/svg' width='26' height='26' fill='currentColor' class='bi bi-check2-square' style='margin:1px;' id='finish' viewBox='0 0 16 16'> <path d='M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z' /> <path d='m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z' /> </svg> </button> <button onclick='edit_card(this)' id='rewrite' value=" + String(id) + "   class='slide_buttons'> <svg xmlns='http://www.w3.org/2000/svg' width='23' height='23' fill='currentColor' class='bi bi-pencil-square' id='edit' viewBox='0 0 16 16'> <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' /> <path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z' /> </svg> </button>";
                Adding_in_columns(save_params["web_src"], save_params["image_addr"], save_params["name"], column_number, slide_data, height);

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
    let image_addr = document.getElementById("image_url_src");
    let height = document.getElementById('image_preview').naturalHeight;
    let width=document.getElementById('image_preview').naturalWidth;
    let web = document.getElementById("web_url_value");
    let name = document.getElementById("content_name_value");
    let save_params = { "web_src": web.value, "image_addr": image_addr.value, "name": name.value ,"height":(height/width)*300};
    save_request.send(JSON.stringify(save_params));

}
window.Post_data=Post_data;