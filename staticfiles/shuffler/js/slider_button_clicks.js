import {Open_Close_PopUp} from "./glassify.js";
import {column_height_measure } from "./data_addition.js";

export function delete_card(parameter) {
    let delete_request = new XMLHttpRequest();
    delete_request.open("POST", "Delete", true);
    let data = String(document.getElementsByName("csrfmiddlewaretoken")[0].value);
    delete_request.setRequestHeader('X-CSRFToken', data);
    delete_request.getResponseHeader('Content-type', 'application/json');
    delete_request.onload = function () {
        if (this.status === 200) {
            console.log("successfully deleted");
        }
    };

    let dynamic_div =parameter.parentElement.parentElement;

    //changing column_height_measure
    let width=parseInt(dynamic_div.childNodes[0].childNodes[0].childNodes[0].dataset.width);
    let height=parseInt(dynamic_div.childNodes[0].childNodes[0].childNodes[0].dataset.height);
    let column_div=dynamic_div.parentElement;
    let column_div_length =column_div.childNodes.length;
    if(column_div_length>1){
        column_height_measure[column_div.id]-=20;
    }
    column_height_measure[column_div.id]-= (height / width) * 300;
    //changing column_height_measure

    dynamic_div.remove();

    let params = { "id": parameter.value };
    delete_request.send(JSON.stringify(params));
}

export function save_card(parameter) {


    //changing column_height_measure
    let dynamic_div = parameter.parentElement.parentElement;
    let column_div=dynamic_div.parentElement;
    let column_div_length =column_div.childNodes.length;
    let width=parseInt(dynamic_div.childNodes[0].childNodes[0].childNodes[0].dataset.width);
    let height=parseInt(dynamic_div.childNodes[0].childNodes[0].childNodes[0].dataset.height);
    if(column_div_length>1){
        column_height_measure[column_div.id]-=20;
    }
    column_height_measure[column_div.id]-= (height / width) * 300;
    //changing column_height_measure




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
            }
            else {
                alert("Please Enter all the details");
            }
        }
    };

    let save_params = { "id": parameter.value };
    frame_request.send(JSON.stringify(save_params));
    dynamic_div.remove();
}
export function Rewriter() {

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
            }
            else {
                alert("Please Enter all the details");
            }
        }
    };
    let new_title = document.getElementById("content_name_value").value;
    let new_href = document.getElementById("web_url_value").value;
    let new_src = document.getElementById("image_preview").src;
    let new_image_height = document.getElementById("image_preview").naturalHeight;
    let new_image_width = document.getElementById("image_preview").naturalWidth;
    let id = current.childNodes[1].childNodes[0].value;

    //changing column_height_measure
    let old_width=current.childNodes[0].childNodes[0].childNodes[0].dataset.width;
    let old_height=current.childNodes[0].childNodes[0].childNodes[0].dataset.height;
    let column_div=current.parentElement;
    column_height_measure[column_div.id]-= (old_height / old_width) * 300;
    column_height_measure[column_div.id]+= ( new_image_height/  new_image_width) * 300;
    //changing column_height_measure

    current.childNodes[0].title = new_title;
    current.childNodes[0].childNodes[0].setAttribute("href", new_href);
    current.childNodes[0].childNodes[0].childNodes[0].src = new_src;
    current.childNodes[0].childNodes[0].childNodes[0].dataset.width = new_image_width;
    current.childNodes[0].childNodes[0].childNodes[0].dataset.height = new_image_height;

    plus_button.setAttribute("onclick", "Post_data()");

    let params = { "id": id, "web_src": new_href, "image_addr": new_src, "name": new_title,"width":new_image_width,"height":new_image_height};
    rewrite_request.send(JSON.stringify(params));
    Open_Close_PopUp();

}
var current = 0;
export function edit_card(parameter) {
    current =  parameter.parentElement.parentElement;

    let title = current.childNodes[0].title;
    let web_url = current.childNodes[0].childNodes[0].getAttribute("href");
    let image_src = current.childNodes[0].childNodes[0].childNodes[0].src;

    Open_Close_PopUp();

    document.getElementById("image_url_src").value = image_src;
    document.getElementById("web_url_value").value = web_url;
    document.getElementById("content_name_value").value = title;
    document.getElementById("image_preview").src = image_src;
    let icon = document.getElementById("image_icon");
    image_icon.style.display = "none";
    document.getElementById("image_preview").style = "border:1px dashed " + (document.body.style.getPropertyValue("--icon_color")).toString() + ";";
    console.log(document.getElementById("image_preview"));
    let plus_button = document.getElementById("plus_button");

    plus_button.setAttribute("onclick", "Rewriter()");
}