<script lang="ts">
	type Props = {
		current_idx: number;
		num_elements: number;
	};
	let { current_idx = $bindable(), num_elements }: Props = $props();

	function navigate(delta: number) {
		current_idx = (((current_idx + delta) % num_elements) + num_elements) % num_elements;
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
</script>

<section id="cta">
	<button id="left" aria-label="button" onclick={() => navigate(-1)}>
		<div></div>
	</button>

	<button id="right" aria-label="button" onclick={() => navigate(1)}>
		<div></div>
	</button>
</section>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	#cta {
		display: flex;
		column-gap: 32px;

		button {
			display: inline-flex;
			border: none;
			background: none;
			padding: 0;
			margin: 0;
			border-radius: 100px;

			cursor: pointer;
			transition: scale 600ms $out-generic-expo;

			div {
				width: 24px;
				height: 24px;
				background-color: $token-surface-solid-accent;

				-webkit-mask-image: url(/icons/arrow_left.png);
				mask-image: url(/icons/arrow_left.png);
				mask-mode: luminance;
				mask-repeat: no-repeat;
				mask-size: 100% 100%;
			}

			&:active {
				transition: scale 400ms $out-generic-expo;
				scale: 1.6;
			}

			&#right {
				transform: scaleX(-1);
			}
		}
	}

    @media screen and (width <= $mobile-width) { 
        #cta{
            column-gap: 16vw;

            button{
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
