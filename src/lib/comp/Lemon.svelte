<script lang="ts">
	type Props = {
		visible?: boolean;
	};
	let { visible = true }: Props = $props();

	// svelte-ignore state_referenced_locally
	let frame = $state(visible ? 8 : 0);

	let animate_up_id: NodeJS.Timer;
	let animate_down_id: NodeJS.Timer;

	$effect(() => {
		if (visible) {
			clearInterval(animate_down_id);
			animate_up_id = setInterval(() => {
				if (frame >= 8) {
					clearInterval(animate_up_id);
					return;
				}
				frame++;
			}, 1000 / 12); // 12 fps
		} else {
			clearInterval(animate_up_id);
			animate_down_id = setInterval(() => {
				if (frame <= 0) {
					clearInterval(animate_down_id);
					return;
				}
				frame--;
			}, 1000 / 12);
		}
	});
</script>

<div style="--frame: {frame}"></div>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	$f: var(--frame);

	div {
		width: 100%;
		height: auto;
		aspect-ratio: 2800 / 1750;

		background-image: url(/animation/lemon_light.png);
		background-size: 100% auto;
		background-position: 0% calc(#{100 / 8} * 1% * var(--frame));

		image-rendering: pixelated;
	}
</style>
