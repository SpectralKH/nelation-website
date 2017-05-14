<?
	include("includes/functions.php");
	$slug = get_slug();
	db_connect();

	// If AJAX request
	if ( isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') ) {
		$skip_document = true;
		$css = get_css($slug, "ajax");
		if ($css == "") {
			$css = "none";
		}
        $title = get_title($slug, "ajax");
        if (slugToPath($slug) == "pages/404.php") {
            $title = "404 - Nelation";
        }
		function get_include_contents($filename) {
		    if (is_file($filename)) {
		        ob_start();
		        include $filename;
		        return ob_get_clean();
		    }
		    return false;
		}
		$page = get_include_contents(slugToPath($slug));
		$page = htmlentities($page);
		$page = json_encode($page);
		echo '{
			"css": "'.$css.'",
			"title": "'.$title.'",
			"page": '.$page.'
		}';
	}

    $thatsa404 = false;
	function slugToPath($slug) {
		if ($slug == "/") {
			return "pages/home.php";
		} elseif (file_exists("pages$slug/index.php")) {
			return "pages$slug/index.php";
		} elseif (file_exists("pages$slug.php")) {
			return "pages$slug.php";
		} else {
			global $thatsa404;
			$thatsa404 = true;
			return "pages/404.php";
		}
	}

	$include_path = slugToPath($slug);

	if (!isset($skip_document) || $skip_document == false) {
	session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
        <title><?
            if ($thatsa404) {
                echo "404 - Nelation";
            } else {
                echo get_title($slug);
            }
        ?></title>
		<link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="/css/global.css?r=<?=rand(0,999)?>">
		<?= get_css($slug); ?>
	</head>
	<body>
		<header class="width-limiter">
			<section class="header flex-row">
				<a data-ajax="true" href="/music">Music</a>
				<a data-ajax="true" href="/artists">Artists</a>
				<a data-ajax="true" href="/shop">Shop</a>
				<a data-ajax="true" href="/" class="img">
					<img src="/cdn/temp/logo.png"/>
				</a>
				<a data-ajax="true" href="/licensing">Licensing</a>
				<a data-ajax="true" href="/about">About</a>
				<a data-ajax="true" href="/contact">Contact</a>
			</section>
		</header>
		<section id="body" class="body">
			<? include("$include_path"); ?>
		</section>
		<section class="music-player">
			<div class="gradient"></div>
			<audio id="audio" src="" preload="auto">
				Oshit, that happened
			</audio>
			<input class="progress-slider" type="range"></input>
			<div class="controls">
                <div class="middle">
                    <div class="prev"></div>
                    <div class="play-pause paused"></div>
                    <div class="next"></div>
                </div>
				<section class="volume">
					<input class="volume-slider" type="range"></input>
					<div class="volume-icon"></div>
				</section>
			</div>
		</section>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="/js/js.cookie-2.1.3.min.js"></script>
		<script src="/js/rangeSlider.js"></script>
		<script src="/js/music-player.js?r=<?=rand(0,999)?>"></script>
		<script src="/js/ajax.js?r=<?=rand(0,999)?>"></script>
		<script>
            <? include("js/functions.js") ?>
            $(document).on("pageLoad", function() {
                $(function() {
                    <?
                    include("js/home.js");
                    include("js/admin.js");
                    ?>
                });
            });
            $(document).trigger("pageLoad");
		</script>
	</body>
</html>
<? } db_disconnect(); ?>
