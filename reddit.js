/*
#NOTES
-Refreshes ever time the subreddit is polled
this makes sure that the styling is applied to new content
-Loading could be rewritten as a fucntion

#adding new theme feature:
-add control to HTML
-add global var to track this setting
-Add function that controls the update
-Add to saveTheme() 
-Add to load()
-Add to Refresh()
*/
//GLOBALS
$c_page = 1; //CURRENT PAGE
$page_limit = 10;

//prefs
$u_subreddit = "null";
$u_pp = "null"; //RESULTS PER PAGE

//DEFAULT THEME
$d_bg_color = "#000000";
$d_bg_img = "https://media2.giphy.com/media/26BRvIYDe4ILO60Ni/giphy.gif";
$d_title_color = "#000000";
$d_font_color = "#dbdbdb";
$d_infolink_color = "#ffffff";
$d_postbg_color = "#dcdcdc";
$d_post_opacity = 0.9;
$d_infobg_color = "#999999";

//theme
$u_bg_color = "#000000";
$u_bg_img = "https://media2.giphy.com/media/26BRvIYDe4ILO60Ni/giphy.gif";
$u_title_color = "#000000";
$u_font_color = "#dbdbdb";
$u_infolink_color = "#ffffff";
$u_postbg_color = "#dcdcdc";
$u_post_opacity = 0.9;
$u_infobg_color = "#999999";

//save/load
function save() {
    //saves only settings and not theme
    //called from update settings which saves all vars first
    console.log(">>SAVE");
    //prefs
    localStorage.setItem("$u_subreddit", $u_subreddit);
    localStorage.setItem("$u_pp", $u_pp);
    Unsaved(false);
}

function saveTheme() {
    //theme vars update when they are changed
    console.log(">>SAVE THEME");
    //theme
    localStorage.setItem("$u_bg_color", $u_bg_color);
    localStorage.setItem("$u_bg_img", $u_bg_img);
    localStorage.setItem("$u_title_color", $u_title_color);
    localStorage.setItem("$u_font_color", $u_font_color);
    localStorage.setItem("$u_infolink_color", $u_infolink_color);
    localStorage.setItem("$u_postbg_color", $u_postbg_color);
    localStorage.setItem("$u_post_opacity", $u_post_opacity);
    localStorage.setItem("$u_infobg_color", $u_infobg_color);
    //
    UnsavedTheme(false);
}

function load(_callback) {
    //SHOULD LOAD PREFS AND LOAD THEME BE TWO FUNCTIONS?
    console.log(">>LOAD");
    //PREFS
    //u_subreddit
    if (localStorage.getItem("$u_subreddit") === null) {
        $u_subreddit = "worldnews";
        console.log("loaded default for $u_subreddit");
    } else {
        $u_subreddit = localStorage.getItem("$u_subreddit");
        console.log("loaded " + $u_subreddit + " for $u_subreddit");
    }
    $('#u_subreddit').val($u_subreddit);
    //u_pp
    if (localStorage.getItem("$u_pp") === null) {
        $u_pp = 3;
        console.log("loaded default for $u_pp");
    } else {
        $u_pp = localStorage.getItem("$u_pp");
        console.log("loaded " + $u_pp + " for $u_pp");
    }
    $('#u_pp').val($u_pp);

    //THEME
    //LOADS THE THEME //these could all just be one function
    //bg color
    if (localStorage.getItem("$u_bg_color") === null) {
        $u_bg_color = $d_bg_color;
    } else {
        $u_bg_color = localStorage.getItem("$u_bg_color");
    }
    console.log("set bg on load:" + $u_bg_color);
    $("#u_bg_color").val($u_bg_color);
    //bg img
    if (localStorage.getItem("$u_bg_img") === null) {
        $u_bg_img = $d_bg_img;
    } else {
        $u_bg_img = localStorage.getItem("$u_bg_img");
    }
    console.log("set bg img on load:" + $u_bg_img);
    $("#u_bg_img").val($u_bg_img);
    //post title color
    if (localStorage.getItem("$u_title_color") === null) {
        $u_title_color = $d_title_color;
    } else {
        $u_title_color = localStorage.getItem("$u_title_color");
    }
    console.log("set post title color on load:" + $u_title_color);
    $("#u_title_color").val($u_title_color);
    //font color
    if (localStorage.getItem("$u_font_color") === null) {
        $u_font_color = $d_font_color;
    } else {
        $u_font_color = localStorage.getItem("$u_font_color");
    }
    console.log("set font color on load:" + $u_font_color);
    $("#u_font_color").val($u_font_color);
    //infolink color
    if (localStorage.getItem("$u_infolink_color") === null) {
        $u_infolink_color = $d_infolink_color;
    } else {
        $u_infolink_color = localStorage.getItem("$u_infolink_color");
    }
    console.log("set link color on load:" + $u_infolink_color);
    $("#u_infolink_color").val($u_infolink_color);
    //postbg color
    if (localStorage.getItem("$u_postbg_color") === null) {
        $u_postbg_color = $d_postbg_color;
    } else {
        $u_postbg_color = localStorage.getItem("$u_postbg_color");
    }
    console.log("set postbg color on load:" + $u_postbg_color);
    $("#u_postbg_color").val($u_postbg_color);
    //post opacity color SLIDER
    if (localStorage.getItem("$u_post_opacity") === null) {
        $u_post_opacity = $d_post_opacity;
    } else {
        $u_post_opacity = localStorage.getItem("$u_post_opacity");
    }
    console.log("set post opacity on load:" + $u_post_opacity);
    $("#u_post_opacity").val($u_post_opacity);
    //postbg color
    if (localStorage.getItem("$u_infobg_color") === null) {
        $u_infobg_color = $d_infobg_color;
    } else {
        $u_infobg_color = localStorage.getItem("$u_infobg_color");
    }
    console.log("set infobg color on load:" + $u_infobg_color);
    $("#u_infobg_color").val($u_infobg_color);


    //DONE
    _callback();
}

function UpdateControls(_callback) {
    console.log(">>UPDATE CONTROLS");
    console.log("updating");
    $u_subreddit = $('#u_subreddit').val();
    $u_pp = $('#u_pp').val();
    _callback();
    save();
}

//theme
function themeBG() {
    console.log(">>THEME BG");
    $u_bg_color = $('#u_bg_color').val();
    $('body').css("background-color", $u_bg_color);
}

function themeBGIMG() {
    console.log(">>THEME BGIMG");
    if ($('#u_bg_img').val() != "" && $('#u_bg_img').val() != null) {
        $u_bg_img = $('#u_bg_img').val();
        $('body').css("background-image", "url(" + $u_bg_img + ")");
    } else {
        console.log("No BG IMG SET");
        $u_bg_img = $('#u_bg_img').val();
        $('body').css("background-image", "none");
        themeBG();
    }
}

function themeTitleColor() {
    console.log(">>THEME Title Color");
    $u_title_color = $('#u_title_color').val();
    $('.post-title').css("color", $u_title_color);
}

function themeFontColor() {
    console.log(">>THEME Font Color");
    $u_font_color = $('#u_font_color').val();
    $('body').css("color", $u_font_color);
    console.log($u_font_color);
}

function themeInfoLinkColor() {
    console.log(">>THEME Info Link Color");
    $u_infolink_color = $('#u_infolink_color').val();
    console.log("info link:" + $u_infolink_color);
    $('.info-link').css("color", $u_infolink_color);
}

function themePostBGColor() {
    console.log(">>THEME PostBG Color");
    $u_postbg_color = $('#u_postbg_color').val();
    console.log(HexToRGBA($u_postbg_color, $u_post_opacity));
    $('.post').css("background", HexToRGBA($u_postbg_color, $u_post_opacity));
}

function themePostOpacity(newValue) {
    console.log(">>THEME PostOpacity");
    document.getElementById("u_post_opacity_marker").innerHTML = newValue;
    $u_post_opacity = $('#u_post_opacity').val();
    console.log("VAL:" + $('#u_post_opacity').val());
    themePostBGColor();
}

function themeInfoBGColor() {
    console.log(">>THEME InfoBG Color");
    $u_infobg_color = $('#u_infobg_color').val();
    $('.post-info').css("background", $u_infobg_color);
}

function updatePP(newValue) {
    document.getElementById("range").innerHTML = newValue;
}

//utility
function Unsaved(unsaved) {
    if (unsaved == true) {
        $("#unsaved-settings").fadeIn("fast");
        $("#update_controls_btn").html("Update Settings");
    } else {
        $("#unsaved-settings").fadeOut("fast");
        $("#update_controls_btn").html("Saved");
    }
}

function UnsavedTheme(unsaved) {
    if (unsaved == true) {
        $("#unsaved-theme").fadeIn("fast");
        $("#update_theme_btn").html("Update Theme");
    } else {
        $("#unsaved-theme").fadeOut("fast");
        $("#update_theme_btn").html("Saved");
    }
}

function HexToRGBA(hex, opacity) {
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    return result;
}

function Refresh() {
    console.log(">>REFRESH");
    $(".result").fadeOut("fast"); //actually should already refresh in the subreddit() function
    updatePP($("#u_pp").val()); //range slider
    themeBG();
    themeBGIMG();
    themeTitleColor();
    themeFontColor();
    themeInfoLinkColor();
    themePostBGColor();
    themePostOpacity($("#u_post_opacity").val()); //range slider
    themeInfoBGColor();
    $(".result").fadeIn("fast");
}

function trending() {
    $.get("https://www.reddit.com/api/trending_subreddits/.json", function(data) {
        $(".result").html("");
        for (index in data["subreddit_names"]) {
            $full_url = "https://reddit.com/r/" + data["subreddit_names"][index];
            $link = "<div class='l-wrap'> <a class='r-link' href='" + $full_url + "'>https://reddit.com/r/<span class='l-text'>" + data["subreddit_names"][index] + "</span></a>";
            $(".result").append($link);
            $(".result").append("</div>");
        }
    });
}


function subreddit(sub, pp = 5, page = 3, _callback = function() {}) {
    console.log(">>SUBREDDIT");
    $(".result").fadeOut("fast");
    $target = "https://www.reddit.com/r/" + sub + "/.json?count=10";
    $.get($target, function(data) {
        $(".result").html("");
        $("body").append("<h1>ZERO for Reddit - /r/" + sub + "</h1>");
        $start = (page * pp) - pp;
        $end = $start + pp;
        console.log("PP: " + pp + "start: " + $start + " end: " + $end);
        $results_length = data["data"]["children"].length;
        console.log($results_length);
        $page_limit = Math.ceil($results_length / parseInt($u_pp), 1);
        console.log($page_limit);
        console.log("Current page: " + $c_page);
        for (index in data["data"]["children"]) {
            if (index >= $start && index < $end) {
                $title = data["data"]["children"][index]["data"]["title"];
                $url = data["data"]["children"][index]["data"]["url"];
                $permalink = data["data"]["children"][index]["data"]["permalink"];
                $ups = data["data"]["children"][index]["data"]["ups"];
                $downs = data["data"]["children"][index]["data"]["downs"];
                $score = data["data"]["children"][index]["data"]["score"];
                $num_comments = data["data"]["children"][index]["data"]["score"];
                $author = data["data"]["children"][index]["data"]["author"];

                $write = "";
                $write += "<div class='post'>";
                $write += "<div class='post_number'>[" + index + "]</div>";
                $write += "<a class='post-title' href='" + $url + "' target='_blank'>" + $title + "</a>";
                $write += "<div class='post-info'>";
                $write += "<a class='info-link' href='https://reddit.com" + $permalink + "'  target='_blank'>" + $num_comments + " Comments</a>";
                $write += " - ";
                $write += "Posted by: <a class='info-link' href='https://reddit.com/u/" + $author + "' target='_blank'>" + $author + "</a>";
                $write += " - ";
                $write += "Score: " + $score;
                $write += "</div>";
                $write += "</div>";

                $(".result").append($write);
            }
        }
        console.log("sub loaded");
        Refresh();
        _callback();
    });

}

//buttons
$("#update_controls_btn").click(function() {
    UpdateControls(function() {
        console.log($u_subreddit, $u_pp);
        subreddit($u_subreddit, parseInt($u_pp), 1);
    });

});
$("#update_theme_btn").click(function() {
    saveTheme();
});

$("#next_page_btn").click(function() {
    $c_page = $c_page + 1;
    if ($c_page > $page_limit) {
        $c_page = 1;
    }
    subreddit($u_subreddit, parseInt($u_pp), $c_page);

});
$("#last_page_btn").click(function() {
    $c_page = $c_page - 1;
    if ($c_page < 1) {
        $c_page = $page_limit;
    }
    subreddit($u_subreddit, parseInt($u_pp), $c_page);

});
$("#settings-toggle").click(function() {
    $("#settings").fadeIn("fast");
});
$("#exit-settings").click(function() {
    $("#settings").fadeOut("fast");
});
//init
function init() {
    console.log(">>INIT ");
    load(function() {
        subreddit($u_subreddit, parseInt($u_pp), 1, function() {
            $("#loader").fadeOut(5000);
        });
    });
}
init();