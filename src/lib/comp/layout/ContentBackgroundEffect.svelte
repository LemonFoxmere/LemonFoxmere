<script lang="ts">
	import { onMount } from "svelte";

	// set the Y translation to half of the scroll height for a parallax effect
	let image: HTMLImageElement;

	onMount(() => {
		// define parallax effect
		const updateParallax = () => {
			image.style.transform = `translate3d(0, ${window.scrollY / 6}px, -0.5px`;

			requestAnimationFrame(updateParallax);
		};
		// start parallax effect
		requestAnimationFrame(updateParallax);
	});
</script>

<main>
	<img bind:this={image} src="/images/raster/background-pattern.png" alt="" />
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: absolute;
		top: 0px;
		right: calc(50vw - 850px);

		z-index: -1;
		pointer-events: none;

		width: 1760px;
		height: 100%;

		overflow: hidden;

		box-sizing: border-box;

		img {
			width: 100%;
			height: auto;
		}

		@media screen and (max-width: $small-desktop-width) {
			width: 1200px;
			right: calc(50vw - 550px);
		}

		@media screen and (max-width: $tablet-width) {
			right: calc(50vw - 650px);
		}

		@media screen and (max-width: $mobile-width) {
			display: none;
		}
	}
</style>
