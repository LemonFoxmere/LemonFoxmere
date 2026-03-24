<a
	href="https://github.com/LemonFoxmere"
	target="_blank"
	class="wrapper no-drag"
	aria-label="button"
>
	<div class="no-drag"></div>
</a>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	a {
		border-radius: 100%;

		div {
			width: 28px;
			height: auto;
			aspect-ratio: 1/1;
			background-color: $token-text-secondary;

			-webkit-mask-image: url(/icons/github/1.png);
			mask-image: url(/icons/github/1.png);
			mask-repeat: no-repeat;
			mask-size: 100% 100%;

			cursor: pointer;
			transition: scale 300ms $out-cubic;

			&:hover {
				@media (hover: hover) {
					background-color: $token-surface-solid-accent;
					// -webkit-mask-image: url(/icons/github/2.png);
					// mask-image: url(/icons/github/2.png);
				}
			}

			&:active {
				background-color: $token-surface-solid-accent;
				opacity: 0.7;
			}
		}
	}
</style>
