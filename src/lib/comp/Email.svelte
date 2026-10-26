<script lang="ts">
	const e = atob("bGVtb25mb3htZXJlQHVjc2MuZWR1");
	function openEmail() {
		window.location.href = `mailto:${e}`;
	}
</script>

<button class="wrapper no-drag" aria-label="Email me" on:click={openEmail}>
	<div class="no-drag"></div>
</button>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	button {
		all: unset;
		border-radius: 100%;

		div {
			width: 32px;
			height: auto;
			aspect-ratio: 1/1;
			background-color: $token-text-secondary;

			-webkit-mask-image: url(/icons/email/1.png);
			mask-image: url(/icons/email/1.png);
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
