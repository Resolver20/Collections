import { Return_smallest_column, Adding_in_columns,column_height_measure } from "./data_addition.js";
import { Go_to_edit_mode} from "./glassify.js";
import { color_change } from "./shift_colors.js";
import { reArrange,start_responsive_trigger } from "./responsive_control.js";

window.color_change = color_change;
window.Go_to_edit_mode=Go_to_edit_mode;
window.column_height_measure=column_height_measure;
window.reArrange = reArrange;

let three_column = window.matchMedia("(max-width:1347px)");
let two_column = window.matchMedia("(max-width:1029px)");
let one_column = window.matchMedia("(max-width:709px)");
three_column.addEventListener("change", function () { reArrange(); });
two_column.addEventListener("change", function () { reArrange(); });
one_column.addEventListener("change", function () { reArrange(); });

function Show_user_hyperlinks(){
    document.getElementById("center_text").style.display="none";
    document.getElementById("spinner_div").style.display = "flex";
    

    let card_search_button=document.getElementById("card_search_button");
    card_search_button.disabled=true;
    
    for(let i=1;i<5;i++){
        document.getElementById("column_"+String(i)).textContent="";
        column_height_measure["column_"+String(i)]= 0;
    }
    start_responsive_trigger();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "access_user_hyperlinks", true);
    let token = String(document.getElementsByName("csrfmiddlewaretoken")[0].value);
    xhr.setRequestHeader('X-CSRFToken', token);
    xhr.getResponseHeader('Content-type', 'application/json');
    xhr.onload = function () {
        document.getElementById("spinner_div").style.display="none";
        if (this.status === 505) {
            console.log("not working");
        }
        else if (this.status === 200) {
            let data = JSON.parse(this.response);
            if(data["data"]=="No data"){
                document.getElementById("center_text").style.display="block";
            }
            else{
                document.getElementById("center_text").style.display="none";
                data = data["data"];
                let i = 0, id, column_number;
                let slide_data;
                let frequency = { "column_1": -1, "column_2": -1, "column_3": -1, "column_4": -1 };
                for (i = 0; i < data.length; i++) {
                    column_number = Return_smallest_column();
                    frequency["column_" + String(column_number)] += 1;
                    id = data[i]["id"];
                    slide_data = "<svg  id='tick' xmlns='http://www.w3.org/2000/svg' width='53' height='53' fill='currentColor' class='bi bi-check' viewBox='0 0 16 16'> <path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z' /> </svg> <button id='save_hyperlink_button' value=" + String(id) + "  onclick='Save_hyperlink(this)' class='slide_buttons' > <svg id='save_hyperlink_icon' xmlns='http://www.w3.org/2000/svg' width='23' height='23' fill='currentColor' class='bi bi-save' viewBox='0 0 16 16'> <path d='M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z'/> </svg></button>";
                    Adding_in_columns(data[i]["url"],  data[i]["name"], column_number, slide_data, data[i]["height"]);
                    column_height_measure["column_" + String(column_number)] += data[i]["height"] ;
                }
            }
        }
        else if(this.status==500){
            console.log("Internal server error");
            document.getElementById("center_text").style.display="block";
        }
        else{
            document.getElementById("center_text").style.display="block";
        }
       card_search_button.disabled = false;
       document.getElementById("edit_mode_button_icon").style.color = "var(--icon_color)";

    };
    let type;
    if(document.getElementById("user_radio").checked){
        type="user"
    }
    else{
        type="content"
    }
    xhr.send(JSON.stringify({ "search_value": document.getElementById("card_search_input").value ,"type":type}));

}
export function Save_hyperlink(parameter){
        parameter.disabled=true;
        let id=parameter.value;
        let parent_style = parameter.parentElement.parentElement.style;
        let tick=parameter.parentElement.childNodes[0];
        let save_icon=parameter;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "save_hyperlink", true);
        let token = String(document.getElementsByName("csrfmiddlewaretoken")[0].value);
        xhr.setRequestHeader('X-CSRFToken', token);
        xhr.getResponseHeader('Content-type', 'application/json');
        xhr.onload = function () {
            if (this.status === 505) {
                console.log("not working");
            }
            else if (this.status === 200) {
                console.log("successfully saved to binging");
                save_icon.style.animationName = "opaciting_down";
                parent_style.backgroundImage = "linear-gradient( rgb(111,224,178) 50%, black 50%)";
                parent_style.animationFillMode = "forwards";
                parent_style.animationDuration = "0.5s";
                parent_style.animationName = "downing";
                parent_style.backgroundColor = "white";
                tick.style.animationName = "opaciting_up";
                setTimeout(function () { parameter.remove(); }, 300);
            }
            else{
                save_icon.disabled = false;
            }
            
        };
    xhr.send(JSON.stringify({ "id": id}));

}
window.Save_hyperlink = Save_hyperlink;
window.Show_user_hyperlinks=Show_user_hyperlinks;
