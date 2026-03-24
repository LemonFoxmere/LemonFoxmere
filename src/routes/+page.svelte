<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";

	import CornerDeco from "$lib/comp/CornerDeco.svelte";
	import About from "$lib/comp/pages/About.svelte";
	import Landing from "$lib/comp/pages/Landing.svelte";
	import Loading from "$lib/comp/Loading.svelte";
	import Projects from "$lib/comp/pages/Projects.svelte";
	import CornerTextDeco from "$lib/comp/CornerTextDeco.svelte";

	let hash = $derived(page.url.hash.slice(1, page.url.hash.length));
	let animate = $state(false);

	onMount(() => {
		// Wait two frames so the initial hash has been read and state has settled
		// before enabling transition animations.
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				animate = true;
			});
		});
	});
</script>

<Loading visible={!animate} />

<main>
	<Landing visible={!hash} {animate} />
	<About visible={hash === "about"} {animate} />
	<Projects visible={hash === "projects"} {animate} />
</main>

<!-- corner deco -->
<CornerDeco location="bl"></CornerDeco>
<CornerDeco location="tr"></CornerDeco>
<CornerTextDeco location="tl" {hash}></CornerTextDeco>
<CornerTextDeco location="br" {hash}></CornerTextDeco>

<!-- top and bottom gradients -->
<div id="top-gradient"></div>
<div id="bottom-gradient"></div>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	main {
		width: 100%;
		height: 100%;
		min-height: fit-content;

		padding: 100px 100px;

		display: flex;
		justify-content: center;
		align-items: center;

		@media screen and (width <= $mobile-width) {
			padding: 100px 30px;
		}
	}

	#top-gradient,
	#bottom-gradient {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;

		pointer-events: none;

		width: 100%;
		height: 150px;

		// log scale to look more natural
		background: linear-gradient(
			#fcefe8ff 0%,
			#fcefe8e6 15%,
			#fcefe8bf 30%,
			#fcefe88c 45%,
			#fcefe859 60%,
			#fcefe82e 73%,
			#fcefe812 85%,
			#fcefe800 100%
		);
	}
	#bottom-gradient {
		top: unset;
		bottom: 0;
		transform: rotate(180deg);
	}
</style>
