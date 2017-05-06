$(function() {

	var audio = document.getElementById("audio");
	var sliderProgress = document.querySelector(".progress-slider");
	var sliderVolume = document.querySelector(".volume-slider");
	var volumeIcon = document.querySelector(".volume-icon");

	// VOLUME SETUP
		// Apply cookie if set
		if (Cookies.get("volume") != null) {
			audio.volume = Cookies.get("volume");
		}
		function updateVolIcon() {
			if (audio.volume == 0) {
				$(".volume-icon").removeClass("high mid off").addClass("off");
			} else if (audio.volume <= 0.5) {
				$(".volume-icon").removeClass("high mid off").addClass("mid");
			} else {
				$(".volume-icon").removeClass("high mid off").addClass("high");
			}
		}
		updateVolIcon();
		$(volumeIcon).bind("click", function() {
			if (audio.volume == 0) {
				audio.volume = Cookies.get("originalVolume");
				Cookies.set("volume", audio.volume);
			} else {
				Cookies.set("originalVolume", audio.volume);
				audio.volume = 0;
				Cookies.set("volume", 0);
			}
			sliderVolume.rangeSlider.update({
				value: audio.volume
			});
			updateVolIcon();
		});
	// SLIDERS
		var mouseDown = false;
		rangeSlider.create(sliderProgress, {
			rangeClass: "rangeSlider progress-slider",
			polyfill: true,
			min: 0,
		    max: 1,
		    step: 0.0002,
		    value: 0,
			onSlideStart: function() {
				mouseDown = true;
			},
		    onSlideEnd: function(value) {
				mouseDown = false;
				audio.currentTime = value*audio.duration;
				updateWhilePlay();
		    }
		});
		rangeSlider.create(sliderVolume, {
			rangeClass: "rangeSlider volume-slider",
			polyfill: true,
			min: 0,
		    max: 1,
		    step: 0.01,
		    value: audio.volume,
			onSlideStart: function(value) {
				if (Cookies.get("originalVolume") != 0) {
					Cookies.set("originalVolume", value);
				}
			},
			onSlide: function(value) {
				audio.volume = value;
				updateVolIcon();
			},
			onSlideEnd: function(value) {
				audio.volume = value;
				Cookies.set("volume", value);
			}
		});
		if (Cookies.get("currentTime") != null) {
			audio.currentTime = Cookies.get("currentTime");
			$(audio).bind("loadedmetadata", function() {
				progress = audio.currentTime/audio.duration;
				sliderProgress.rangeSlider.update({
					value: progress
				});
			});
		}

	// PLAY/PAUSE
		$(".play-pause").on("click", function() {
			if (audio.paused && audio.currentSrc != "") {
				audio.play();
			} else {
				audio.pause();
			}
		});

	// ON PLAY/PAUSE
		$(audio).bind("play", function() {
			playCounter = window.setInterval(updateWhilePlay, 100);
			$(".play-pause").removeClass("paused").addClass("playing");
		});
		$(audio).bind("pause", function() {
			clearInterval(playCounter);
			$(".play-pause").removeClass("playing").addClass("paused");
		});
		function updateWhilePlay() {
			if (mouseDown == false) {
				progress = audio.currentTime/audio.duration;
				sliderProgress.rangeSlider.update({
					value: progress
				});
			}
			Cookies.set("currentTime", audio.currentTime);
		}

	// QUEUE
		var queue = [
			{
				"index": 1,
				"trackId": "1",
				"artist": "{{{Uplink}}} & {{{Jason Gewalt}}}",
				"title": "Euphoria"
			}, {
				"index": 2,
				"trackId": "2",
				"artist": "{{{Steve James}}}",
				"title": "In My Head (feat. {{{RKCB}}})"
			}, {
				"index": 3,
				"trackId": "3",
				"artist": "{{{Aaron Fontwell}}}",
				"title": "Crystal Coated"
			},4,5,6,7,8,9,10,11,12
		];

		var playingTrackIndex;
		if (Cookies.get("currentTrackIndex") != null) {
			playingTrackIndex = Cookies.get("currentTrackIndex");
			changeTrack(Cookies.get("currentTrackIndex"), false);
		} else {
			// playingTrackIndex = 1;
			changeTrack(1, false);
		}
		function changeTrack(track, play = true) {
			if (track == "prev") {
				if (playingTrackIndex > 1) {
					playingTrackIndex--;
					$("audio").attr("src", "/cdn/tracks/"+playingTrackIndex+".mp3");
					if (track != playingTrackIndex) audio.currentTime = 0;
				}
			} else if (track == "next") {
				if (playingTrackIndex < queue.length) {
					playingTrackIndex++;
					$("audio").attr("src", "/cdn/tracks/"+playingTrackIndex+".mp3");
					if (track != playingTrackIndex) audio.currentTime = 0;
				}
			} else {
				playingTrackIndex = track;
				$("audio").attr("src", "/cdn/tracks/"+playingTrackIndex+".mp3");
				if (track != playingTrackIndex) audio.currentTime = 0;
			}
			if (play) audio.play();
			Cookies.set("currentTrackIndex", playingTrackIndex);
		}

		$(".prev").on("click", function() {
			changeTrack("prev");
		});
		$(".next").on("click", function() {
			changeTrack("next");
		});
		$("audio").on("ended", function() {
			changeTrack("next");
		});

});
