<header class="music-filter flex-row">
	<input class="search" type="text" placeholder="Search"></input>
	<div class="dropdown type">
		<p class="metadata original-text">Any Type</p>
		<p class="dropdown-text" tabindex="0">Type</p>
		<div class="menu">
			<div class="item default">Any</div>
			<div class="item">Single</div>
			<div class="item">EP</div>
		</div>
	</div>
	<div class="dropdown genre">
		<p class="metadata original-text">Any Genre</p>
		<p class="dropdown-text" tabindex="0">Genre</p>
		<div class="menu">
			<div class="item default">Any</div>
			<div class="item">Bounce</div>
			<div class="item">Trap</div>
		</div>
	</div>
	<div class="dropdown sort">
		<p class="metadata original-text">Sort by</p>
		<p class="dropdown-text" tabindex="0">Sort by</p>
		<div class="menu">
			<div class="item">Release date</div>
			<div class="item">Popularity</div>
			<div class="item">Title</div>
		</div>
	</div>
	<!-- View -->
</header>
<section class="music-tracks flex-row">
	<?
		$query = "SELECT * FROM tracks ORDER BY release_date";
		$result = db_query($query);
		while ($track = mysqli_fetch_assoc($result)) {
			$track_id = $track["track_id"];
			$artist = $track["artist_format"];
			$title = $track["title_format"];

			$query2 = "SELECT * FROM track_artists WHERE track_id = $track_id";
			$result2 = db_query($query2);
			while ($artist_track = mysqli_fetch_array($result2)) {
				$artist = str_replace("{".$artist_track["artist_index"]."}", $artist_track["artist_name"], $artist);
				$title = str_replace("{".$artist_track["artist_index"]."}", $artist_track["artist_name"], $title);
			}
			mysqli_free_result($result2);
			?>
				<div class="item">
					<a data-ajax="true" href="/<?=urlify("$artist - $title")?>">
						<div class="cover-overlay" tabindex="0" title="<?="$artist - $title"?>">
							<div class="play-button" tabindex="0" title="<?="Play $artist - $title"?>"></div>
						</div>
					</a>
					<img class="cover" src="/cdn/covers/<?=$track_id?>.jpg"/>
					<p class="metadata track-id"><?=$track_id?></p>
				</div>
			<?
		}
		mysqli_free_result($result);
	?>
</section>
