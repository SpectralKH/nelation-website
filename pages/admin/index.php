<section class="admin flex-row">
	<aside class="menu">
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
				<a href="/admin/tracks/<?=urlify("$artist - $title")?>">
					<div class="track">
							<p class="title"><?=$title?></p>
							<p class="artist"><?=$artist?></p>
					</div>
				</a>
				<?
			}
			mysqli_free_result($result);
		?>
		<div class="drag-bar">
	</aside>
	<main class="main">

	</main>
</section>
