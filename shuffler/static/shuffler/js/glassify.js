import {correct_input_flexing} from "./responsive_control.js";
import { unlock_icon } from "./icons.js";
export function Go_to_edit_mode() {
    let key = 0;
    let cards = document.getElementsByClassName("edit_card_slide");

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].style.display == "flex") {

            cards[i].style.display = "none";

        }
        else {
            cards[i].style.display = "flex";
            key = 1;
        }
    }
    if (key == 1) {
        document.getElementById("edit_mode_button_icon").style.color = "#f67e7d";
    }
    else {
        document.getElementById("edit_mode_button_icon").style.color="var(--icon_color)";
    }
}

export function Open_Close_PopUp() {
    let middle_card = document.getElementById("middle");
    let buttons = document.getElementsByTagName("button");
    let middle_card_buttons=["plus_button","cross_button","pp_button"];
    if (middle_card.style.display == "flex") {

        document.getElementById("middle_child_1").style.heigh="100%";
        middle_card.style.display = "none";

        for (let i = 0; i < buttons.length; i++) {
            // if (buttons[i].id != "plus_button" && buttons[i].id != "cross_button" && buttons[i].id!="pp_button") {
            if(middle_card_buttons.indexOf(buttons[i].id)<0){
                buttons[i].removeAttribute("disabled");
            }
        }
        document.body.style.setProperty("--blurring", "0px");
        document.body.style.setProperty("--anchor_click_events", "auto");
        
                
    }
    else {
        document.getElementById("web_url_value").value = "";
        document.getElementById("content_name_value").value = "";
        document.getElementById("myRange").value = "160";
        document.getElementById("card_handler").childNodes[1].textContent = "";
        document.getElementById("card_handler").style.height= "160px";
        let pp_button = document.getElementById("pp_button");
        pp_button.innerHTML=unlock_icon();
                middle_card.style.display = "flex";
                for (let i = 0; i < buttons.length; i++) {
                    // if (buttons[i].id != "plus_button" && buttons[i].id != "cross_button") {
                    if (middle_card_buttons.indexOf(buttons[i].id) < 0) {
                        buttons[i].setAttribute("disabled", "disabled");
                    }
                }

                document.body.style.setProperty("--blurring", "4px");
                document.body.style.setProperty("--anchor_click_events", "none");
                document.getElementById("myRange").max = String( document.getElementById("card_handler_div").clientHeight-30);
                
            //     middle_card.style.height=String(middle_card.style.height)+"px";
                

            document.getElementById("middle_child_1").style.height = String(document.querySelector("#middle").clientHeight) + "px";
            document.getElementById("middle_child_1").style.width = String(document.querySelector("#middle").clientWidth) + "px";
            // document.getElementById("header").style.height = String(document.querySelector("#main").clientHeight) + "px";
            // document.getElementById("content").style.height = String(document.querySelector("#main").clientHeight) + "px";
    }

}