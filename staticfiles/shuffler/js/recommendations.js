import { Return_smallest_column ,Adding_in_columns, ShowData,column_height_measure } from "./data_addition.js";
import { reArrange, start_responsive_trigger } from "./responsive_control.js";
import { Go_to_edit_mode } from "./glassify.js";
import { Save_hyperlink } from "./card_search_page.js";

window.Go_to_edit_mode = Go_to_edit_mode;
window.Save_hyperlink = Save_hyperlink;

window.onload=get_recommendations()
function get_recommendations(){
    console.log("hello")

   for (let i = 1; i < 5; i++) {
     document.getElementById("column_" + String(i)).textContent = "";
     column_height_measure["column_" + String(i)] = 0;
   }
   start_responsive_trigger();
   let xhr = new XMLHttpRequest();
   xhr.open("POST", "get_recommendations", true);
   let token = String(
     document.getElementsByName("csrfmiddlewaretoken")[0].value
   );
   xhr.setRequestHeader("X-CSRFToken", token);
   xhr.getResponseHeader("Content-type", "application/json");
   xhr.onload = function () {
     document.getElementById("spinner_div").style.display = "none";
     if (this.status === 505) {
       console.log("not working");
     } else if (this.status === 200) {
       let data = JSON.parse(this.response);
       if (data["data"] == "No data") {
         document.getElementById("center_text").style.display = "block";
       } else {
         document.getElementById("center_text").style.display = "none";
         data = data["data"];
         let i = 0,
           id,
           column_number;
         let slide_data;
         let frequency = {
           column_1: -1,
           column_2: -1,
           column_3: -1,
           column_4: -1,
         };
         for (i = 0; i < data.length; i++) {
           column_number = Return_smallest_column();
           frequency["column_" + String(column_number)] += 1;
           id = data[i]["id"];
           slide_data =
             "<svg  id='tick' xmlns='http://www.w3.org/2000/svg' width='53' height='53' fill='currentColor' class='bi bi-check' viewBox='0 0 16 16'> <path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z' /> </svg> <button id='save_hyperlink_button' value=" +
             String(id) +
             "  onclick='Save_hyperlink(this)' class='slide_buttons' > <svg id='save_hyperlink_icon' xmlns='http://www.w3.org/2000/svg' width='23' height='23' fill='currentColor' class='bi bi-save' viewBox='0 0 16 16'> <path d='M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z'/> </svg></button>";
           Adding_in_columns(
             data[i]["url"],
             data[i]["name"],
             column_number,
             slide_data,
             data[i]["height"]
           );
           column_height_measure["column_" + String(column_number)] +=
             data[i]["height"];
         }
       }
     } else if (this.status == 500) {
       console.log("Internal server error");
       document.getElementById("center_text").style.display = "block";
     } else {
       document.getElementById("center_text").style.display = "block";
     }

     document.getElementById("edit_mode_button_icon").style.color = "var(--icon_color)";
   };

   xhr.send(
     JSON.stringify({
       search_value: "none",
     })
   );   
}