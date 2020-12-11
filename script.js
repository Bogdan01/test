function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let backgroundImageElement = document.querySelector(".background-image");
backgroundImageUrl = getCookie("backgroundImageUrl"),
images = backgroundImageElement.dataset.images,
timePast = getCookie("timePast"),
hours = 1000 * 60 * 60 * 8,
timeNow = Date.now();
images = images.split(',');

if (backgroundImageUrl && ((timeNow - timePast) < hours)) {
	backgroundImageElement.src = backgroundImageUrl;
} else {
	if (backgroundImageUrl) {
		images.splice(images.indexOf(backgroundImageUrl), 1);// remove previus background image from set
	}
	backgroundImageUrl = images[Math.floor(Math.random() * images.length)];
	backgroundImageElement.src = backgroundImageUrl;
	document.cookie = "backgroundImageUrl="+backgroundImageUrl;
	document.cookie = "timePast="+timeNow;
}

document.querySelector(".title").onclick = function() {
	document.cookie= "timePast=0";
};


// Form

let login, password;
let error_message = document.querySelector(".error");
const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
         if(request.readyState === 4 && request.status === 200) {
             if(request.responseText == 1) {
                 console.log('right access');
                 document.location.href = "https://blockrage.pgs-soft.com/";
             } else {
                 console.log("false access");
                 if (!error_message.classList.contains('show')) {
                     error_message.classList.add('show');
                 }
             }
         }
    });

document.querySelector(".form").onsubmit = function(event){
    request.open("POST", "/login.php");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    event.preventDefault();
    login = document.querySelector(".form input[name='login']").value;
    password = document.querySelector(".form input[name='password']").value;
    request.send("login="+login+"&password="+password);
}
