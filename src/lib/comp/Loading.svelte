<script lang="ts">
	import { onMount } from "svelte";

	type Props = {
		visible: boolean;
	};
	let { visible }: Props = $props();

	let frame = $state(0);

	let animate: NodeJS.Timer;

	onMount(() => {
		animate = setInterval(() => {
			if (frame >= 6) {
				// total 7 frames
				clearInterval(animate);
				return;
			}
			frame++;
		}, 1000 / 13);
	});
</script>

<main id="loading" class={!visible ? "hidden" : ""}>
	<div id="fox" style="--frame: {frame}" class={!visible ? "hidden" : ""}></div>
</main>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	#loading {
		position: fixed;
		inset: 0;
		z-index: 50;

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: $token-surface-solid-primary;

		opacity: 1;
		transition: opacity 700ms $out-generic;
		transition-delay: 1000ms;
		pointer-events: all;

		#fox {
			$f: var(--frame);

			width: min(300px, calc(100% - 40px));
			height: auto;
			aspect-ratio: 1/1;

			background-image: url(/animation/small_lemon_light.png);
			background-size: 100% auto;
			background-position: 0% calc(#{100 / 6} * 1% * var(--frame));

			transform: translateY(-20px);

			transition:
				opacity 400ms $out-generic,
				transform 400ms $in-cubic;
			transition-delay: 800ms;

			&.hidden {
				opacity: 0;
				transform: translateY(-20px) scale(0.9);
				pointer-events: none;
			}
		}

		&.hidden {
			opacity: 0;
			pointer-events: none;
		}
	}
</style>
