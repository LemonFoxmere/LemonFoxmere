<script lang="ts">
	type Props = {
		current_idx: number;
		num_elements: number;
	};
	let { current_idx = $bindable(), num_elements }: Props = $props();

	function navigate(delta: number) {
		current_idx = (((current_idx + delta) % num_elements) + num_elements) % num_elements;
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
		column-gap: 50px;

		button {
			display: inline-flex;
			border: none;
			background: none;
			padding: 0;
			margin: 0;
			border-radius: 100px;

			cursor: pointer;
			transition: scale 500ms $out-cubic;

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
				opacity: 0.75;
			}

			&#right {
				transform: scaleX(-1);
			}
		}
	}
</style>
