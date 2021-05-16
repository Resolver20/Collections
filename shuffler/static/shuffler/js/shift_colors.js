export function color_change(){
    if(localStorage.getItem("past_user_preference")=="dark"){
        document.body.style.setProperty("--main_background_color", "white");
        document.body.style.setProperty("--icon_color", "black");
        document.body.style.setProperty("--bottom_icon_color", "grey");
        localStorage.setItem("past_user_preference","light");
    }
    else{
        document.body.style.setProperty("--main_background_color", "rgb(8, 7, 7)");
        document.body.style.setProperty("--icon_color", "#C9F7F2");
        document.body.style.setProperty("--bottom_icon_color", "#4f807a");
        localStorage.setItem("past_user_preference","dark");
    }
}