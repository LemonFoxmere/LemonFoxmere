<script lang="ts">
	type Props = {
		onclick?: () => void;
		label?: string;
	};
	let { onclick, label = "Back" }: Props = $props();
</script>

{#if onclick}
	<button {onclick}>
		<div id="icon"></div>
		<p>
			{label}
		</p>
	</button>
{:else}
	<a href="/">
		<div id="icon"></div>
		<p>
			{label}
		</p>
	</a>
{/if}

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	a,
	button {
		display: flex;
		align-items: center;
		column-gap: 7px;

		text-decoration: none;
		font-weight: 600;

		z-index: 20;

		cursor: pointer;

		// reset button element defaults
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		color: inherit;

		p {
			color: $token-surface-solid-accent;
			font-weight: 600;
		}

		#icon {
			width: 16px;
			height: auto;
			aspect-ratio: 1/1;
			background-color: $token-surface-solid-accent;

			-webkit-mask-image: url(/icons/arrow_left.png);
			mask-image: url(/icons/arrow_left.png);
			mask-mode: luminance;
			mask-repeat: no-repeat;
			mask-size: 100% 100%;
		}
	}
</style>
