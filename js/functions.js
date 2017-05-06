$("body").on("click", ":has(section.music-tracks)", function(e) {
	if ($(e.target).hasClass("dropdown-text")) {
		if ($(e.target).siblings(".menu").hasClass("open")) {
			$(e.target).siblings(".menu").removeClass("open");
			$(e.target).removeClass("open");
		} else {
			$(".dropdown .menu, .dropdown .dropdown-text").removeClass("open");
			$(e.target).siblings(".menu").addClass("open");
			$(e.target).addClass("open");
		}
	} else if ($(e.target).hasClass("item")) {
		var clickedItem = $(e.target);
		var originalText = $(e.target).parents().siblings(".original-text");
		var dropdownText = $(e.target).parents().siblings(".dropdown-text");
		clickedItem.siblings().removeClass("selected");
		clickedItem.addClass("selected");
		if (clickedItem.hasClass("default")) {
			dropdownText.html(originalText.html());
		} else {
			dropdownText.html(clickedItem.html());
		}
		clickedItem.parent().removeClass("open").siblings(".dropdown-text").removeClass("open");
	} else if (!$(e.target).hasClass("menu")) {
		$(".dropdown .menu, .dropdown .dropdown-text").removeClass("open");
	}
});

$("body").on("input", "section.contact textarea", function() {
	var offset = this.offsetHeight - this.clientHeight;
	$(this).css("height", "auto").css("height", this.scrollHeight + offset);
});
$("body").on("focus", "section.music-tracks .item .play-button", function(e) {
	$(e.target).parent().addClass("play-button-focused");
});
$("body").on("blur mouseout", "section.music-tracks .item .play-button", function(e) {
	$(e.target).parent().removeClass("play-button-focused");
});
$("body").on("mouseout", "section.music-tracks .item .cover-overlay", function(e) {
	$(e.target).blur();
});
