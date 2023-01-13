import { start_responsive_trigger } from "./responsive_control.js";

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
    return "<button  onclick='save_card(this)' id='save' value=" + String(id) + "  class='slide_buttons'> <svg xmlns='http://www.w3.org/2000/svg' width='26' height='26' fill='currentColor' class='bi bi-check2-square' style='margin:1px;' id='finish' viewBox='0 0 16 16'> <path d='M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z' /> <path d='m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z' /> </svg> </button>";

}
export function add_delete_option(id){ 
    return "<button id='delete' value=" + String(id) + "  onclick='delete_card(this)'   class='slide_buttons' > <svg xmlns='http://www.w3.org/2000/svg' width='23' height='23' fill='currentColor' class='bi bi-x-square' viewBox='0 0 16 16' id='remove' > <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' /> <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' /> </svg> </button>";
}
export function add_edit_option(id){ 
    return "<button  onclick='edit_card(this)' id='rewrite' value=" + String(id) + "  class='slide_buttons'> <svg xmlns='http://www.w3.org/2000/svg' width='23' height='23' fill='currentColor' class='bi bi-pencil-square' id='edit' viewBox='0 0 16 16'> <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' /> <path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z' /> </svg> </button> ";

}
export function priv_or_public(){
    let public_str ="<button class='slide_buttons' onclick='change_domain(this)'> <svg id='private_public' xmlns='http://www.w3.org/2000/svg' width='26' height='26' fill='currentColor' class='bi bi-eye' viewBox='0 0 16 16'> <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z'/> <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z'/> </svg> </button>";
    let private_str="<button class='slide_buttons' onclick='change_domain(this)'> <svg id='private_public'xmlns='http://www.w3.org/2000/svg' width='26' height='26' fill='currentColor' class='bi bi-eye-slash' viewBox='0 0 16 16'> <path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z'/> <path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z'/> <path d='M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z'/> </svg> </button>";
    // return private_str;
    return "";
}

export var column_height_measure;
export function ShowData(type) {
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
                slide_data+=priv_or_public();
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
