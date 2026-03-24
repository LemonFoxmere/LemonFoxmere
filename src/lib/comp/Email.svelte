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
			width: 28px;
			height: auto;
			aspect-ratio: 1/1;
			background-color: $token-text-secondary;

			-webkit-mask-image: url(/icons/email/1.png);
			mask-image: url(/icons/email/1.png);
			mask-repeat: no-repeat;
			mask-size: 100% 100%;

			cursor: pointer;
			transition: scale 300ms $out-cubic;

			&:hover {
				@media (hover: hover) {
					background-color: $token-surface-solid-accent;
					// -webkit-mask-image: url(/icons/email/2.png);
					// mask-image: url(/icons/email/2.png);
				}
			}

			&:active {
				background-color: $token-surface-solid-accent;
				opacity: 0.7;
			}
		}
	}
</style>
