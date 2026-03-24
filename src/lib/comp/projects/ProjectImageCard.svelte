<script lang="ts">
	type Props = {
		visible: boolean;
		uri: string;
		alt: string;
		dark?: boolean;
		fit_image?: boolean;
	};
	let { visible, uri, alt, dark = false, fit_image = false }: Props = $props();

	// svelte-ignore state_referenced_locally
	let content_visible: boolean = $state(visible);
	// svelte-ignore state_referenced_locally
	let on_page: boolean = $state(visible);

	$effect(() => {
		if (!visible) {
			// when hidden, hide all contents first before setting pos fixed
			content_visible = false;
			on_page = false;
		} else {
			// when shown, wait until the other page has cleared before showing
			on_page = visible;
			content_visible = true;
		}
	});
</script>

<main
	class="{!content_visible ? 'hidden' : ''} {!on_page ? 'offpage' : ''} {dark
		? 'dark'
		: ''} {fit_image ? 'fit-img' : ''}"
>
	<img src={uri} {alt} />
	<img src={uri} {alt} class="blur-overlay" aria-hidden="true" />
	<div class="gradient-filter" id="orange"></div>
	<div class="gradient-filter" id="white"></div>
</main>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	main {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 50px;
		overflow: hidden;

		transition: opacity 1000ms $out-generic;

		$blur-begin: 70%;

		img {
			object-fit: cover;
			width: 100%;
			height: 100%;

			opacity: 0.9;

			border-radius: 50px 55px 55px 50px;

			mask-image: linear-gradient(90deg, rgb(0, 0, 0) $blur-begin, transparent 100%);
			-webkit-mask-image: linear-gradient(90deg, rgb(0, 0, 0) $blur-begin, transparent 100%);
		}

		.blur-overlay {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;

			object-fit: cover;
			opacity: 1;
			border-radius: 50px 55px 55px 50px;

			filter: blur(50px);
			mask-image: linear-gradient(90deg, transparent $blur-begin, rgb(0, 0, 0) 100%);
			-webkit-mask-image: linear-gradient(90deg, transparent $blur-begin rgb(0, 0, 0) 100%);
		}

		.gradient-filter {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;

			&#white {
				background: linear-gradient(
					270deg,
					$token-surface-solid-primary 0%,
					rgba($token-surface-solid-primary, 0.85) 15%,
					rgba($token-surface-solid-primary, 0.65) 28%,
					rgba($token-surface-solid-primary, 0.4) 42%,
					rgba($token-surface-solid-primary, 0.18) 56%,
					rgba($token-surface-solid-primary, 0.06) 68%,
					transparent 70%
				);
			}
			&#orange {
				opacity: 0.2;
				mix-blend-mode: color;
				background: linear-gradient(
					270deg,
					$token-surface-solid-accent 0%,
					mix($token-surface-solid-primary, $token-surface-solid-accent, 18%) 22%,
					mix($token-surface-solid-primary, $token-surface-solid-accent, 42%) 40%,
					mix($token-surface-solid-primary, $token-surface-solid-accent, 64%) 58%,
					mix($token-surface-solid-primary, $token-surface-solid-accent, 84%) 76%,
					$token-surface-solid-primary 100%
				);
			}

			&::after {
				content: "";
				position: absolute;
				inset: 0;
				background-image: url(/images/raster/noise_texture.png);
				background-repeat: repeat;
				background-size: 150px 150px;
				mix-blend-mode: overlay;
				opacity: 0.5;
				pointer-events: none;
			}
		}

		&.fit-img {
			img {
				width: 80%;
				height: 80%;
				object-fit: contain;
			}
			.blur-overlay {
				display: none;
			}
			.gradient-filter {
				&#orange {
					opacity: 0;
				}
			}
		}

		&.dark {
			img {
				opacity: 0.6;
			}

			.gradient-filter {
				&#white {
					background: linear-gradient(
						270deg,
						$token-surface-solid-primary 0%,
						rgba(
								mix($token-surface-solid-invert, $token-surface-solid-primary, 15%),
								0.85
							)
							15%,
						rgba(
								mix($token-surface-solid-invert, $token-surface-solid-primary, 28%),
								0.65
							)
							28%,
						rgba(
								mix($token-surface-solid-invert, $token-surface-solid-primary, 42%),
								0.4
							)
							42%,
						rgba(
								mix($token-surface-solid-invert, $token-surface-solid-primary, 56%),
								0.18
							)
							56%,
						rgba(
								mix($token-surface-solid-invert, $token-surface-solid-primary, 68%),
								0.06
							)
							68%,
						transparent 70%
					);
				}
				&#orange {
					opacity: 0.2;
					mix-blend-mode: overlay;
				}
			}
		}

		&.hidden {
			opacity: 0;
		}

		&.offpage {
			pointer-events: none;
		}
	}
</style>
