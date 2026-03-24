<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<div id="noise-bg"></div>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	#noise-bg {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: $token-surface-solid-secondary;
		mix-blend-mode: multiply;

		z-index: 100;
		pointer-events: none;

		opacity: 0.75;

		-webkit-mask-image: url(/images/raster/noise_texture.png);
		mask-image: url(/images/raster/noise_texture.png);
		mask-repeat: repeat;
		mask-position: 50% 50%;
		mask-size: 300px 300px;
	}
</style>
