import { start_responsive_trigger } from "./responsive_control.js";
import { lock_icon,unlock_icon,edit_icon,delete_icon,save_icon } from "./icons.js";
import { icon_changer } from "./slider_button_clicks.js";

export function Return_smallest_column() {
    let min = Infinity;
    let minimum_heighted_column = 1;
    for (let j = 1; j < 5; j++) {
        if (column_height_measure["column_" + String(j)] < min) {
            min = column_height_measure["column_" + String(j)];
            minimum_heighted_column = j;
        }
    }
    return (minimum_heighted_column);
}
var color_index=0;
export function Adding_in_columns(src, name, index,slide_data,height) {
    let main_div = document.createElement("div");

    main_div.className = "dynamic_data";
    main_div.setAttribute("data-height",height);

    let div_1 = document.createElement("div");
    let div_2 = document.createElement("div");
    let colors = [
      "#EA6EA0",
      "#EA5B5C",
      "#4FA99F",
      "#E5AD2F",
      "#AC97FD",
      "#D0846E",
      "#5E35AC",

      "#40315F",
      "#59CAF1",
      "#A05A79",
      "#852019",
      "#99BC92",
      "#C6394E",
      "#1C1410",
    ];
    // let color = colors[Math.floor(Math.random() * 8)];
    div_1.innerHTML = "<a target='_blank'  href=" + String(src) + "><div class='card' style='height:"+String(height)+"px;background-color:"+ String(colors[color_index])+";' ><h1>"+String(name)+"</h1></div></a>";
    color_index=(color_index+1)%colors.length;

    div_2.className = "edit_card_slide";
    div_2.innerHTML =slide_data;
    
    main_div.appendChild(div_1);
    main_div.appendChild(div_2);

    document.getElementById("column_" + String(index)).appendChild(main_div);

}

var column_height_measure = { "column_1": 0, "column_2": 0, "column_3": 0, "column_4": 0 };
export function add_save_option(id){ 
    return "<button  onclick='save_card(this)' id='save' value=" + String(id) + "  class='slide_buttons'> "+save_icon()+"</button>";

}
export function add_delete_option(id){ 
    return "<button id='delete' value=" + String(id) + "  onclick='delete_card(this)'   class='slide_buttons' > "+delete_icon()+"</button>";
}
export function add_edit_option(id){ 
    return "<button  onclick='edit_card(this)' id='rewrite' value=" + String(id) + "  class='slide_buttons'> "+ edit_icon()+"</button>";

}
export function priv_or_public(value,id){
    let public_str ="<button id='private_public' class='slide_buttons' value=" + String(id) + " onclick='change_domain(this)'>"+lock_icon()+"</button>";
    let private_str="<button id='private_public' class='slide_buttons' value=" + String(id) + "  onclick='change_domain(this)'>"+unlock_icon()+"</button>";
    if(value){return public_str;} else{return private_str}
}

export var column_height_measure;
export function ShowData(type) {
    console.log("type ",type);
    document.getElementById("spinner_div").style.display = "flex";
    start_responsive_trigger();
    let xhr = new XMLHttpRequest();
    xhr.open("GET", type, true);
    xhr.onprogress = function () {
        console.log("on progress");
    };
    xhr.onload = function () {
        document.getElementById("spinner_div").style.display="none";
        if (this.status === 505) {
            console.log("not working");
        }
        else if (this.status === 200) {
            let data = JSON.parse(this.response);
            data = data["data"];
            let i = 0,id,column_number;
            let slide_data;
            let frequency= { "column_1": -1, "column_2": -1, "column_3": -1, "column_4": -1 };
            for (i = 0; i < data.length; i++) {
                column_number = Return_smallest_column();
                frequency["column_"+String(column_number)]+=1;
                id=data[i]["id"];
                if (type == "access") {       //notice slide_data in binging_page incase of a change
                    slide_data=add_delete_option(id)+add_save_option(id)+add_edit_option(id);
                }
                else {
                    slide_data=add_delete_option(id)+add_edit_option(id);
                }
                slide_data+=priv_or_public(parseInt(data[i]["domain"],10),id);
                // console.log(data[i]);
                // slide_data=priv_or_public(slide_data);
                Adding_in_columns(data[i]["url"], data[i]["name"],  column_number, slide_data,data[i]["height"]);
                column_height_measure["column_" + String(column_number)] += data[i]["height"] ;
            }
            if(data.length>0){
                document.getElementById( "center_text" ).style.display = "none";
            }
            else{
                document.getElementById( "center_text" ).style.display = "block";
            }
            for(let i=1;i<5;i++){
                column_height_measure["column_" + String(i)] += 20*Math.max(frequency["column_"+String(i)],0);
            }


        }
        else{
            
            document.getElementById("center_text").style.display = "block";
        }

    };
    xhr.send();


}
