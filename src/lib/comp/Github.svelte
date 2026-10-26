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
			width: 32px;
			height: auto;
			aspect-ratio: 1/1;
			background-color: $token-text-secondary;

			-webkit-mask-image: url(/icons/github/1.png);
			mask-image: url(/icons/github/1.png);
			mask-repeat: no-repeat;
			mask-size: 100% 100%;

			cursor: pointer;
			transition: 400ms $out-cubic;
            transition-property: scale, background-color;

			@media screen and (width <= $mobile-width) {
				width: 42px;
			}

			&:hover {
				@media (hover: hover) {
                    transition: 100ms $out-cubic;
					background-color: $token-surface-solid-accent;
				}
			}

			&:active {
                transition: 200ms $out-cubic;
				background-color: $token-surface-solid-accent;
                scale: 1.4;
			}
		}
	}
</style>
