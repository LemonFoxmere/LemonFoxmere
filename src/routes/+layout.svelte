<script lang="ts">
	// import favicon_dark from "$lib/assets/favicon_dark.png";
	import favicon_light from "$lib/assets/favicon_light.png";

	import { dev } from "$app/environment";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";

	injectAnalytics({ mode: dev ? "development" : "production" });

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon_light} />
	<!-- <link rel="icon" href={favicon_light} media="(prefers-color-scheme: dark)" /> -->
	<!-- <link rel="icon" href={favicon_dark} media="(prefers-color-scheme: light)" /> -->
	<title>Lemon Foxmere</title>
	<meta name="theme-color" content="#FCEFE8" />
</svelte:head>

{@render children()}

<div id="noise-bg"></div>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	#noise-bg {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;

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

		-webkit-transform: translateZ(0);
		transform: translateZ(0);

		isolation: isolate;

		@media screen and (width <= $mobile-width) {
			width: calc(100% - 10px);
			height: calc(100% - 10px);
			top: 5px;
			left: 5px;
		}
	}
</style>
