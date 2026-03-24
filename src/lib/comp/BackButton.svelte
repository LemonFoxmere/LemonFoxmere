<a href="/">
	<div id="icon"></div>
	Back
</a>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	a {
		display: flex;
		align-items: center;
		column-gap: 10px;

		text-decoration: none;
		font-weight: 600;

		z-index: 20;

		cursor: pointer;

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
