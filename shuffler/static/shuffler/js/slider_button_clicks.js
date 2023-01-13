import {Open_Close_PopUp} from "./glassify.js";
import {column_height_measure } from "./data_addition.js";

function scale_measure_change(object) {
    let dynamic_div = object.parentElement.parentElement;
    let column_div = dynamic_div.parentElement;
    let column_div_length = column_div.childNodes.length;
    let height = parseFloat(dynamic_div.dataset.height);
    if (column_div_length > 1) {
        column_height_measure[column_div.id] -= 20;
    }
    console.log(height + " <--height");
    column_height_measure[column_div.id] -= height;
    console.log(column_height_measure);
}

export function delete_card(object) {
    object.disabled=true;
    let delete_request = new XMLHttpRequest();
    let dynamic_div =object.parentElement.parentElement;
    let instance=dynamic_div;
    delete_request.open("POST", "Delete", true);
    let data = String(document.getElementsByName("csrfmiddlewaretoken")[0].value);
    delete_request.setRequestHeader('X-CSRFToken', data);
    delete_request.getResponseHeader('Content-type', 'application/json');
    delete_request.onload = function () {
        if (this.status === 200) {
            console.log(object);
            console.log("successfully deleted");
            instance.remove();
            scale_measure_change(object);
        }
        else{
            object.disabled = false;
        }
    };



    let params = { "id": object.value };
    delete_request.send(JSON.stringify(params));
}
export function save_card(object) {

    object.disabled = true;
    let dynamic_div = object.parentElement.parentElement;
    
    let instance=dynamic_div;
    
    let frame_request = new XMLHttpRequest();
    let token = String(document.getElementsByName("csrfmiddlewaretoken")[0].value);
    
    frame_request.open("POST", "Frame", true);
    frame_request.setRequestHeader('X-CSRFToken', token);
    frame_request.getResponseHeader('Content-type', 'application/json');
    
    frame_request.onload = function () {
        if (this.status === 200) {
            let response = JSON.parse(this.response);
            if (response["response"] == "saved") {
                console.log("successfully saved");
                instance.remove();
                scale_measure_change(object);
            }
            else{
                    object.disabled = false;
            }
        }
        else {
            object.disabled = false;
        }
    };

    let save_params = { "id": object.value };
    frame_request.send(JSON.stringify(save_params));
}
export function change_domain(){
     object.disabled = true;
     let delete_request = new XMLHttpRequest();
     let dynamic_div = object.parentElement.parentElement;
     let instance = dynamic_div;
     delete_request.open("POST", "DomainChange", true);
     let data = String(
       document.getElementsByName("csrfmiddlewaretoken")[0].value
     );
     delete_request.setRequestHeader("X-CSRFToken", data);
     delete_request.getResponseHeader("Content-type", "application/json");
     delete_request.onload = function () {
       if (this.status === 200) {
         console.log("successfully changed");
         // change_instance to 0 or 1 
         object.disabled=false;
       } else {
         object.disabled = false;
       }
     };


     let params = { id: object.value };
     delete_request.send(JSON.stringify(params));

}
export function Rewriter() {
    let new_title = document.getElementById("content_name_value").value;
    let new_href = document.getElementById("web_url_value").value;
    let new_height = document.getElementById("myRange").value;
    let id = current.childNodes[1].childNodes[0].value;

    let rewrite_request = new XMLHttpRequest();
    rewrite_request.open("POST", "Rewrite", true);
    let data = String(document.getElementsByName("csrfmiddlewaretoken")[0].value);
    rewrite_request.setRequestHeader('X-CSRFToken', data);
    rewrite_request.getResponseHeader('Content-type', 'application/json');

    rewrite_request.onload = function (event) {
        if (this.status === 200) {
            let response = JSON.parse(this.response);
            if (response["response"] == "rewritten") {
                 console.log("successfully rewritten");

                 current.childNodes[0].childNodes[0].childNodes[0].childNodes[0].textContent = new_title;
                 current.childNodes[0].childNodes[0].setAttribute("href", new_href);
                 current.dataset.height = new_height;
                 current.childNodes[0].childNodes[0].childNodes[0].style.height = String(new_height) + "px";
                 
                 Open_Close_PopUp();
                 plus_button.setAttribute("onclick", "Post_data()");
            }
            else {
                alert("Please Enter all the details");
            }
        }
    };
   
    //changing column_height_measure
    let old_height=current.dataset.height;
    let column_div=current.parentElement;
    column_height_measure[column_div.id]-= old_height;
    column_height_measure[column_div.id]+= new_height;
    //changing column_height_measure

    // current.style.height=String(new_height)+"px";

    let params = { "id": id, "web_src": new_href, "name": new_title,"height":new_height};
    rewrite_request.send(JSON.stringify(params));

}
var current = 0;
export function edit_card(object) {
    current =  object.parentElement.parentElement;

    let title = current.childNodes[0].childNodes[0].textContent;
    let web_url = current.childNodes[0].childNodes[0].getAttribute("href");

    Open_Close_PopUp();

    document.getElementById("web_url_value").value = web_url;
    document.getElementById("content_name_value").value = title;
    document.getElementById("card_handler").style = "border:1px dashed " + (document.body.style.getPropertyValue("--icon_color")).toString() + ";";
    document.getElementById("card_handler").style.height = String(current.dataset.height)+"px";
    document.getElementById("card_handler").childNodes[1].textContent = title;
    document.getElementById("myRange").value=current.dataset.height;
    let plus_button = document.getElementById("plus_button");

    plus_button.setAttribute("onclick", "Rewriter()");
}