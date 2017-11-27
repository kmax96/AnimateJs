var div_maskId = "div_mask";
var div_SlideId = "div_slide";

function GetDefaultPanelId() {

    return headerPane.name;
}
function GetRootPanel(panelId) {
    if (panelId === undefined || panelId == null) {
       /* panelId = GetDefaultPanelId();
        return document.getElementById(panelId);*/
        return document.body;
    }
    else {
        return document.getElementById(panelId);
    }
}


function ShowImageSlide(imgSrc, closeText, tipsDesc, panelId) {


    messageText = "Loading...";
    var showText = true;
    if (messageText === undefined || messageText == null) {
        showText = false;
    }

    //Fix section
    var div_Slide = document.getElementById(div_SlideId);


    if (!(div_Slide != null && typeof (div_Slide) != "undefined")) {

        div_Slide = document.createElement('div');
        div_Slide.className = "div_slide";
        div_Slide.id = div_SlideId;
        var div_obj = document.createElement('div');
        if (imgSrc === undefined || imgSrc == null) {

        }
        else {
            var oImg = img_create(imgSrc, '', '');
            oImg.setAttribute('width', '100%');

            //div_obj.id = "div_slideObj";
            div_obj.style.top = "5%";
            div_obj.style.left = "10%";
            div_obj.style.position = "absolute";
            div_obj.style.height = "80%";
            div_obj.style.width = "70%";
            //div_obj.style.backgroundColor = "white";
            //div_obj.style.border = "1px solid black";


            var crossDiv = document.createElement('div');
            crossDiv.style.float = "right";
            crossDiv.innerText = "[X]";
            crossDiv.style.fontSize = "18px";
            crossDiv.style.cursor = "pointer";


            div_obj.appendChild(crossDiv);

            div_obj.appendChild(oImg);

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "cb_slide";

            checkbox.value = "value";
            //checkbox.className = "floatLeft";
            checkbox.id = "cb_slide";


            var div_tmp = document.createElement('div');
            div_tmp.style.backgroundColor = "white";
            div_tmp.style.paddingBottom = "5px";

            //div_tmp.className = "floatLeft";
            div_tmp.appendChild(checkbox);

            var newlabel = document.createElement("Label");
            newlabel.innerHTML = tipsDesc + "<br/>";
            div_tmp.appendChild(newlabel);

            div_obj.appendChild(div_tmp);


            var div_tmp2 = document.createElement('div');


            var div_slideClose = document.createElement('div');
            div_slideClose.id = "div_slideClose";
            div_slideClose.className = "div_slideClose";


            // div_slideClose.innerText = closeText;

            var span_closeText = document.createElement("span");
            span_closeText.innerText = closeText;
            span_closeText.style.border = "solid #FA7F06";
            span_closeText.style.position = "fixed";
            span_closeText.style.backgroundColor = "white";


            div_slideClose.appendChild(span_closeText);
            div_tmp2.appendChild(div_slideClose);
            div_obj.appendChild(div_tmp2);

            crossDiv.addEventListener("click", function () {
                HideImageSlide();//
                if (checkbox.checked) {
                    setCookie('1stShowLeaveAlert', '1', 30);
                    //console.log("No ShowTips");
                }
            });

            div_slideClose.addEventListener("click", function () {
                HideImageSlide();//
                if (checkbox.checked) {
                    setCookie('1stShowLeaveAlert', '1', 30);
                    // console.log("No ShowTips");
                }
            });
        }


        //div_obj.innerText = (!showText) ? "" : messageText;
        //div_obj.style.fontSize = "60px";
        div_Slide.appendChild(div_obj);

        GetRootPanel(panelId).appendChild(div_Slide);

    }


}
function HideImageSlide() {
    var div_Slide = document.getElementById(div_SlideId);
    if (div_Slide != null && typeof (div_Slide) != "undefined") {
        // document.getElementById(headerPane.name).removeChild(div_Slide);
        div_Slide.parentElement.removeChild(div_Slide)

    }
}



function ShowLoading(panelId, messageText) {
    //custom paratmeter here
    //when panelId not given
    // messageText = "Loading...";
    var showText = true;
    if (messageText === undefined || messageText == null) {
        showText = false;
    }

    //Fix section
    var div_mask = document.getElementById(div_maskId);


    if (!(div_mask != null && typeof (div_mask) != "undefined")) {

        div_mask = document.createElement('div');
        div_mask.className = "div_mask";
        div_mask.id = div_maskId;
        var div_obj = document.createElement('div');
        div_obj.className = (!showText) ? "MaskLoadingImage" : "MaskText CenterText";
        div_obj.innerText = (!showText) ? "" : messageText;
        div_obj.style.fontSize = "60px";
        div_mask.appendChild(div_obj);

        GetRootPanel(panelId).appendChild(div_mask);
    }
}


function HideLoading() {
    var div_mask = document.getElementById(div_maskId);
    if (div_mask != null && typeof (div_mask) != "undefined") {
        // document.getElementById(headerPane.name).removeChild(div_mask);
        div_mask.parentElement.removeChild(div_mask)
        //div_mask.remove();
    }
}

function ShowMessageText(ShowTick, messageText) {

    var div_Text = document.getElementById("div_Text");
    if ((div_Text != null && typeof (div_Text) != "undefined")) {
        //div_Text.remove();
        if ((div_Text.parentElement != null && typeof (div_Text.parentElement) != "undefined")) {
            div_Text.parentElement.removeChild(div_Text);
        }
    }
    div_Text = document.createElement('div');
    div_Text.id = "div_Text";
    div_Text.className = "MaskText RightTopText";

    // div_Text.innerHTML = "<img class='img_Tick'></img>" + messageText + "";
    div_Text.innerHTML = "<div><div class='" + ((ShowTick) ? "img_Tick" : "img_Cross") + "'></div></div><div><span style=''>" + messageText + "</span></div>";
    // div_Text.innerHTML = "<a>" + messageText + "</a>";

    GetRootPanel(null).appendChild(div_Text);
    div_Text.style.opacity = 0.8;
    div_Text.addEventListener("click", function () {

        var interval = setInterval(function () {
            var o = div_Text.style.opacity;
            div_Text.style.opacity = o - 0.01; //For real browsers;
            div_Text.style.filter = "alpha(opacity=" + ((o - 0.01) * 100) + ")"; //For IE;

            setTimeout(function () {
                if ((div_Text.parentElement != null && typeof (div_Text.parentElement) != "undefined")) {
                    div_Text.parentElement.removeChild(div_Text);
                }

                clearInterval(interval);

            }, 800);

        }, 10);
    });
}

function img_create(src, alt, title) {
    var img = document.createElement('img');
    img.src = src;
    if (alt != null) img.alt = alt;
    if (title != null) img.title = title;
    return img;
}



var showBack2TopButton = false;
function ShowBackToTopButton(isShow) {
    showBack2TopButton = isShow;
    if (!isShow)
    {
        $('#toTopButton').fadeOut();
    }
}


$(document).ready(function () {

    var toTopButton = document.createElement('div');
    toTopButton.id = 'toTopButton';
    toTopButton.addEventListener("click", function () {
        backToTop();
    });
    toTopButton.title = "返回顶部";


    GetRootPanel().appendChild(toTopButton);
    $('#toTopButton').fadeOut();

});

$(window).scroll(function () {
    
    if (showBack2TopButton) {
        if ($(this).scrollTop()>100) {
            $('#toTopButton').fadeIn();
        } else {
            $('#toTopButton').fadeOut();
        }
    }
});

function backToTop() {
    $("html,body").animate({ scrollTop: 100 }, 500);
}
