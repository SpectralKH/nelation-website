$("body").on("click", '[data-ajax="true"]', function(event) {
	event.preventDefault();
	// detect which page has been selected
	var newPage = $(this).attr("href");
	if (newPage != window.location) {
		window.history.pushState({path: newPage}, "", newPage);
	}
	loadPage(newPage);
	$(this).blur();
});
$("body").on("click", ".play-button", function(event) {
	event.preventDefault();
	console.log("hey");
});

function loadPage(url) {
	var target = document.getElementById("body");
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.onreadystatechange = function() {
		if (xhr.readyState < 4) {
			target.innerHTML = "";
		}
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Function to decode the new page
			var decodeEntities = (function() {
				// this prevents any overhead from creating the object each time
				var element = document.createElement('div');
				function decodeHTMLEntities (str) {
					if(str && typeof str === 'string') {
						// strip script/html tags
						str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
						str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
						element.innerHTML = str;
						str = element.textContent;
						element.textContent = '';
					}
					return str;
				}
				return decodeHTMLEntities;
			})();

			var resultJSON = JSON.parse(xhr.responseText);
			var page = decodeEntities(resultJSON.page);
			// Remove existing CSS and insert new one
			$(".page-css").remove();
			if (resultJSON.css != "none") {
				$("<link/>", {
					"class": "page-css",
					rel: "stylesheet",
					type: "text/css",
					href: resultJSON.css
				}).appendTo("head");
			}
			// Update title
			document.title = resultJSON.title;
			// Insert page contents, then trigger the pageLoad event
			$(target).html(page);
			$("body").trigger("pageLoad");
		}
	};
	xhr.send();
}

$(window).on("popstate", function() {
	var newPageArray = location.pathname.split("/");
	// This is the url of the page to be loaded
	newPage = newPageArray[newPageArray.length - 1];
	loadPage(newPage);
});
