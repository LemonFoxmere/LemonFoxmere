<script lang="ts">
	import { textHex } from "./utils/colors";

	type Props = {
		width?: number;
		clr?: Color.Text;
		visible?: boolean;
	};
	let { width = 200, clr = "quaternary", visible = true }: Props = $props();

	// svelte-ignore state_referenced_locally
	let frame = $state(visible ? 10 : 0);

	let animate_up_id: NodeJS.Timer;
	let animate_down_id: NodeJS.Timer;

	$effect(() => {
		if (visible) {
			clearInterval(animate_down_id);
			animate_up_id = setInterval(() => {
				if (frame >= 10) {
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
			}, 1000 / 12); // 12 fps
		}
	});
</script>

<div style="--width: {width}px; --clr: {textHex(clr)}; --frame: {frame}" class="no-drag"></div>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	$w: var(--width);
	$c: var(--clr);
	$f: var(--frame);

	div {
		width: $w;
		height: auto;
		aspect-ratio: 6498 / 667;
		background-color: $c;

		-webkit-mask-image: url(/animation/separator.png);
		mask-image: url(/animation/separator.png);
		mask-repeat: no-repeat;
		mask-size: 100% auto;
		mask-position: 0% calc(#{100 / 10} * 1% * var(--frame));
	}
</style>
