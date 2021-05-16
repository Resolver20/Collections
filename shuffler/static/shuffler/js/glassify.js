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
    if (middle_card.style.display == "flex") {

        middle_card.style.display = "none";

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].id != "plus_button" && buttons[i].id != "cross_button") {
                buttons[i].removeAttribute("disabled");
            }
        }
        document.body.style.setProperty("--blurring", "0px");
        document.body.style.setProperty("--anchor_click_events", "auto");
        
    }
    else {
        document.getElementById("image_url_src").value = "";
        document.getElementById("web_url_value").value = "";
        document.getElementById("content_name_value").value = "";
        document.getElementById("image_preview").src = "";
        
        middle_card.style.display = "flex";
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].id != "plus_button" && buttons[i].id != "cross_button") {
                buttons[i].setAttribute("disabled", "disabled");
            }
        }
        document.body.style.setProperty("--blurring", "4px");
        document.body.style.setProperty("--anchor_click_events", "none");
        

    }

}