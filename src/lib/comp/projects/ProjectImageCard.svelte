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
		$blur-end: 100%;

		img {
			object-fit: cover;
			width: 100%;
			height: 100%;

			border-radius: 50px 55px 55px 50px;

			mask-image: linear-gradient(90deg, rgb(0, 0, 0) $blur-begin, transparent $blur-end);
			-webkit-mask-image: linear-gradient(
				90deg,
				rgb(0, 0, 0) $blur-begin,
				transparent $blur-end
			);
		}

		.blur-overlay {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;

			object-fit: cover;
			opacity: 1;
			border-radius: 50px 55px 55px 50px;

			filter: blur(5px);
			mask-image: linear-gradient(90deg, transparent $blur-begin, rgb(0, 0, 0) $blur-end);
			-webkit-mask-image: linear-gradient(
				90deg,
				transparent $blur-begin rgb(0, 0, 0) $blur-end
			);

            transition: filter 600ms $out-generic;
		}

		.gradient-filter {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;

            transition: opacity 600ms $out-generic;

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
					transparent 100%
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
                &#orange{
                    background: none;
                }
			}
		}

        @media screen and ($mobile-width < width <= calc($mobile-width + 120px)) {
            .gradient-filter {
                transition: opacity 400ms $out-generic;

                &#white {
                    opacity: 0;
                }
                &#orange {
                    opacity: 0;
                }
            }

            .blur-overlay {
                transition: filter 400ms $out-generic;
                filter: blur(0px);
            }
        }

		@media screen and (width <= $mobile-width) {
			border-radius: 0px 0px 100px 0px;

			$blur-begin: 80%;
			$blur-end: 100%;

			img {
				border-radius: 0px 0px 100px 0px;

				mask-image: linear-gradient(
					0deg,
					rgb(0, 0, 0) $blur-begin,
					transparent $blur-end
				) !important;
				-webkit-mask-image: linear-gradient(
					0deg,
					rgb(0, 0, 0) $blur-begin,
					transparent $blur-end
				) !important;
			}

			.blur-overlay {
				border-radius: 0px 0px 100px 0px;

				filter: blur(10px);

				mask-image: linear-gradient(
					0deg,
					transparent $blur-begin,
					rgb(0, 0, 0) $blur-end
				) !important;
				-webkit-mask-image: linear-gradient(
					0deg,
					transparent $blur-begin rgb(0, 0, 0) $blur-end
				) !important;
			}

			.gradient-filter {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 70%;

				&#white {
					background: linear-gradient(
						180deg,
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
					height: 100%;
                    opacity: 0.3;
                    mix-blend-mode: normal;
					background: linear-gradient(
						0deg,
						$token-surface-solid-accent 0%,
						transparent 20%
					);
				}
			}

			&.fit-img {
				img {
					width: 90%;
					height: 90%;
					object-fit: contain;
				}
			}

			&.dark {
				img {
					opacity: 0.7;
				}
				.gradient-filter {
					&#white {
						height: 100%;
						background: linear-gradient(
							180deg,
							$token-surface-solid-primary 0%,
							rgba(
									mix(
										$token-surface-solid-invert,
										$token-surface-solid-primary,
										15%
									),
									0.85
								)
								15%,
							rgba(
									mix(
										$token-surface-solid-invert,
										$token-surface-solid-primary,
										28%
									),
									0.65
								)
								28%,
							rgba(
									mix(
										$token-surface-solid-invert,
										$token-surface-solid-primary,
										42%
									),
									0.4
								)
								42%,
							rgba(
									mix(
										$token-surface-solid-invert,
										$token-surface-solid-primary,
										56%
									),
									0.18
								)
								56%,
							rgba(
									mix(
										$token-surface-solid-invert,
										$token-surface-solid-primary,
										68%
									),
									0.06
								)
								68%,
							transparent 70%
						);
					}
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
