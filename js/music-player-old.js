$(function() {

	var audio = document.getElementById("audio");

	// PLAY/PAUSE
		$("#play-pause").bind("click", function() {
			if (audio.paused) {
				audio.play();
				$("#play-pause").removeClass("paused").addClass("playing");
			} else {
				audio.pause();
				$("#play-pause").removeClass("playing").addClass("paused");
			}
		});
	// ON PLAY/PAUSE
		$(audio).bind("play", function() {
			playCounter = window.setInterval(updateWhilePlay, 100);
		});
		$(audio).bind("pause", function() {
			clearInterval(playCounter);
		});
		function updateWhilePlay() {
			// Progress bar
			progress = audio.currentTime / audio.duration;
			progress = progress.toFixed(4);
			$("#progress-slider").attr({ value:progress });
			$("#progress-slider").rangeslider("update", true);

			// Time display
			function secToTime(sec) {
				var min = Math.floor(sec/60);
				var sec = Math.floor(sec%60);
				if (sec < 1) {
					sec = "00";
				} else if (sec < 10) {
					sec = "0"+sec;
				}
				var time = min+":"+sec;
				return time;
			}
			$("#time-display").html(secToTime(audio.currentTime)+" / "+secToTime(audio.duration));
		}
	// VOLUME
		if (Cookies.get("volume") != null) {
			audio.volume = Cookies.get("volume");
		}

		// Update volume cookie/slider/icon
		$(audio).bind("volumechange", function() {
			Cookies.set("volume", audio.volume);
			$("#volume-slider").attr({ value:audio.volume });
			$("#volume-slider").rangeslider("update", true);
			if (audio.volume == 0) {
				$(".volume-icon").removeClass("high mid low").addClass("off");
				$(".volume-icon").removeClass("high mid low").addClass("off");
			} else if (audio.volume <= 0.5) {
				$(".volume-icon").removeClass("high low off").addClass("mid");
			} else {
				$(".volume-icon").removeClass("mid low off").addClass("high");
			}
		});

	// SLIDERS

	    var inputRange = $('input[type="range"]');

		function applyValues(element) {
	        var value = element.value;
			var inputElement = $(element).parent().children("input");
			if (inputElement.hasClass("progress-slider")) {
				audio.addEventListener('loadedmetadata', function() {
					mdLoaded = true;
				});
				if (typeof mdLoaded !== "undefined") {
					audio.currentTime = value*audio.duration;
				}

			}
			if (inputElement.hasClass("volume-slider")) {
				audio.volume = value;
			}
	    }
		for (var i = inputRange.length - 1; i >= 0; i--) {
	        applyValues(inputRange[i]);
	    };
		$(document).on('input', '#volume-slider', function(e) {
	        applyValues(e.target);
	    });
		$(document).on('change', '#progress-slider', function(e) {
	        applyValues(e.target);
	    });

		inputRange.rangeslider({
	      polyfill: false
	    });

});
