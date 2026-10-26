<script lang="ts">
	import { onMount } from "svelte";

	type Props = {
		visible: boolean;
		ondone?: () => void; // called when the smokescreen starts fading away
	};
	let { visible, ondone }: Props = $props();

	let frame = $state(0);
    let smokeScreenVisible = $state(true);

	let animate: string | number | NodeJS.Timeout | undefined;

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

    $effect(() => {
        if (visible) {
            setTimeout(() => {
                clearInterval(animate);
                animate = setInterval(() => {
                    if (frame <= 0) {
                        // total 7 frames
                        clearInterval(animate);
                        smokeScreenVisible = false;
                        ondone?.();
                        return;
                    }
                    frame--;
                }, 1000 / 13);
            }, 1000);
        }
    })

</script>

<main id="loading" class={!smokeScreenVisible ? "hidden" : ""}>
	<div id="fox" style="--frame: {frame}" class={!smokeScreenVisible ? "hidden" : ""}></div>
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
		transition-delay: 200ms;
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
