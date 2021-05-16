import {
    Return_smallest_column,
    column_height_measure,
} from "./data_addition.js";

export function reArrange() {
    let chunck = document.querySelectorAll(".dynamic_data");
    for (let i = 1; i < 5; i++) {
        document.getElementById("column_" + String(i)).innerHTML = "";
        column_height_measure["column_" + String(i)] = 0;
    }
    start_responsive_trigger();
    let frequency = { "column_1": -1, "column_2": -1, "column_3": -1, "column_4": -1};
    for (let i = 0; i < chunck.length; i++) {
        let column_number = String(Return_smallest_column());
        document.getElementById("column_" + column_number).appendChild(chunck[i]);
        column_height_measure["column_" + column_number] += parseFloat(chunck[i].dataset.height);
        frequency["column_" + String(column_number)] += 1;
    }
    for (let i = 1; i < 5; i++) {
        if(column_height_measure["column_"+String(i)]!=Infinity){
            column_height_measure["column_" + String(i)] += 20 * Math.max(frequency["column_" + String(i)], 0);
        }
    }
}

export function start_responsive_trigger() {
    let size = window.innerWidth;
    let index = 5;
    if (size <= 1347 && size > 1029) {
        index = 4;
    } else if (size > 709 && size <= 1029) {
        index = 3;
    } else if (size <= 709) {
        index = 2;
    }
    for (let i = index; i < 5; i++) {
        column_height_measure["column_" + String(i)] = Infinity;
    }
}
export function correct_input_flexing(){
    
    let middle_card=document.getElementById("middle");

    if ( (((String(middle_card.clientWidth) + "px") != document.getElementById("middle_child_1").style.width )&& middle_card.style.display == "flex")  ) {
      document.getElementById("middle_child_1").style.height =
        String(document.querySelector("#middle").clientHeight) + "px";
      document.getElementById("middle_child_1").style.width =
        String(document.querySelector("#middle").clientWidth) + "px";
    }
  let input_main_div = document.getElementById("input_main_div");
  if (input_main_div.clientHeight != input_main_div.scrollHeight) {
    input_main_div.style.display = "block";
  } else {
    input_main_div.style.display = "flex";
  }
  let dotted_card_div=document.getElementById("card_handler_div");
  let dotted_card=document.getElementById("card_handler");
  let dotted_card_height = dotted_card.style.height.slice( 0, dotted_card.style.height.length - 2 );
  if(dotted_card_div.clientHeight<=dotted_card_height){
        dotted_card.style.height = String(dotted_card_div.clientHeight-30)+"px";
  }
}
