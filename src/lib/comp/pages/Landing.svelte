<script lang="ts">
	import Email from "$lib/comp/Email.svelte";
	import Github from "$lib/comp/Github.svelte";
	import Linkedin from "$lib/comp/Linkedin.svelte";
	import Separator from "$lib/comp/Separator.svelte";
	import Lemon from "../Lemon.svelte";

	type Props = {
		visible: boolean;
		animate: boolean;
	};
	let { visible, animate }: Props = $props();

	// svelte-ignore state_referenced_locally
	let content_visible: boolean = $state(visible);
	// svelte-ignore state_referenced_locally
	let on_page: boolean = $state(visible);

	$effect(() => {
		if (!animate) {
			// initial load: snap to correct state instantly, no animation
			content_visible = visible;
			on_page = visible;
			return;
		}
		if (!visible) {
			// when hidden, hide all contents first before setting pos fixed
			content_visible = false;
			setTimeout(() => {
				on_page = false;
			}, 850); // ~10 frames @ 12 fps
		} else {
			// when shown, wait until the other page has cleared before showing
			setTimeout(() => {
				on_page = visible;
				content_visible = true;
			}, 850); // ~10 frames @ 12 fps
		}
	});
</script>

<section
	id="content"
	class="{!content_visible ? 'hidden' : ''} {!on_page ? 'offpage' : ''} {!animate
		? 'no-transition'
		: ''}"
>
	<section id="text">
		<section id="title">
			<section id="connections" class="phone-hidden">
				<span><Github /></span>
				<span><Linkedin /></span>
				<span><Email /></span>
			</section>
			<section id="heading">
				<h1 class="title">
					<span>L</span><span>e</span><span>m</span><span>o</span><span>n</span>
				</h1>

				<h1 class="title">
					<span>F</span><span>o</span><span>x</span><span>m</span><span>e</span><span
						>r</span
					><span>e</span>
				</h1>
			</section>
			<p id="subheading" class="phone-hidden">
				RL Robotics Researcher &nbsp;~&nbsp; Digital Artist
			</p>
			<p id="subheading" class="phone-only">
				<span style="white-space: nowrap">RL Robotics Researcher</span> &
				<span style="white-space: nowrap">Digital Artist</span>
			</p>
		</section>
		<Separator visible={content_visible} />
		<section id="cta">
			<a class="no-drag" href="#about">Who are you</a>
			<a class="no-drag" href="#projects">Projects</a>
			<a
				class="no-drag"
				href="https://www.instagram.com/lemonfoxmere?igsh=NTc4MTIwNjQ2YQ%3D%3D"
				target="_blank"
			>
				Art gallery
			</a>
		</section>

		<!-- mobile version -->
		<section id="connections" class="phone-only">
			<span><Github /></span>
			<span><Linkedin /></span>
			<span><Email /></span>
		</section>
	</section>

	<!-- graphics -->
	<div id="graphics" class="no-drag">
		<Lemon visible={content_visible} />
	</div>
</section>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;
	@use "sass:math";

	#content {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 730px;

		#text {
			display: flex;
			flex-direction: column;
			row-gap: 25px;

			z-index: 1; // bring above graphics
			#title {
				#connections {
					display: flex;
					column-gap: 7px;

					> * {
						transition-property: opacity transform;
						transition: 300ms $out-generic;
					}

					@for $i from 1 through 3 {
						> *:nth-child(#{$i}) {
							transition-delay: 50ms * $i;
						}
					}
				}

				#heading {
					// border: 1px solid red;
					display: flex;
					flex-wrap: wrap;
					column-gap: 1em;

					span {
						display: inline-block;
						padding: 0;
						margin: 0;

						transform-origin: left;

						transition:
							font-weight 500ms $out-generic,
							opacity 400ms $out-generic,
							transform 700ms $out-generic;
					}

					h1:nth-child(1) {
						@for $i from 1 through 5 {
							span:nth-child(#{$i}) {
								transition-delay: 20ms * $i;
							}
						}
					}

					h1:nth-child(2) {
						@for $i from 1 through 7 {
							span:nth-child(#{$i}) {
								transition-delay: 20ms * ($i + 5);
							}
						}
					}
				}

				#subheading {
					transition:
						font-weight 500ms $out-generic,
						opacity 400ms $out-generic,
						transform 700ms $out-generic;
				}
			}

			#title,
			#cta {
				display: flex;
				flex-direction: column;
				row-gap: 10px;
			}

			#cta {
				* {
					color: $token-text-secondary;
					font-style: italic;

					transition:
						color 0ms,
						opacity 500ms $out-generic,
						transform 500ms $out-generic;

					&:hover {
						@media (hover: hover) {
							color: $token-surface-solid-accent;
						}
					}

					&:active {
						color: $token-surface-solid-accent;
						opacity: 0.7;
					}
				}

				@for $i from 1 through 3 {
					$delay: 500ms + 100ms * ($i - 1);
					> *:nth-child(#{$i}) {
						transition:
							color 0ms,
							opacity 500ms $out-generic $delay,
							transform 500ms $out-generic $delay;
					}
				}
			}
		}

		#graphics {
			margin-top: -180px;
			padding-left: 170px;
			width: min(730px, 100%);
		}

		@media screen and (width <= $mobile-width) {
			flex-direction: column-reverse;
			justify-content: flex-end;

			row-gap: 20px;

			height: 100%;

			#text {
				position: relative;

				display: flex;
				flex-direction: column;
				row-gap: 25px;

				margin-top: auto;

				// border: 1px solid red;

				z-index: 1; // bring above graphics
				#title {
					#heading {
						h1 {
							white-space: nowrap;
						}
					}
				}

				#cta {
					row-gap: 20px;
					padding-bottom: 32px;
				}

				#connections {
					display: flex;
					position: absolute;
					right: 4px;
					bottom: 0px;

					flex-direction: column;
					row-gap: 20px;

					> * {
						transition: 700ms $out-generic;
					}

					@for $i from 1 through 3 {
						> *:nth-child(#{$i}) {
							transition-delay: 700ms + 100ms * (3 - $i);
						}
					}
				}
			}

			#graphics {
				$d: 25; // degrees
				$k: math.sin(math.div($d * 3.1415, 180)) +
					math.div(math.cos(math.div($d * 3.1415, 180)), 1.6);
				$w_extend: 60px;

				margin-top: calc((#{$k} * (100% + $w_extend) - (100% + $w_extend) / 1.6) / 3);
				margin-bottom: calc((#{$k} * (100% + $w_extend) - (100% + $w_extend) / 1.6) / 3);

				padding-left: unset;
				margin-left: -($w_extend/2);
				width: calc(100% + $w_extend);

				transform: rotate(-#{$d}deg);
			}

			&.hidden {
				#text {
					#connections {
						@for $i from 1 through 3 {
							> *:nth-child(#{$i}) {
								opacity: 0;
								transition: 500ms $in-cubic;
								transform: translateY(-20px) scale(0.9, 1.1);
								transition-delay: 100ms * $i;
							}
						}
					}
				}
			}
		}

		&.hidden {
			#text {
				#title {
					#connections {
						> * {
							opacity: 0;
							// transform: translateY(10px) scale(0.8);
						}
					}

					#heading {
						h1:nth-child(1) {
							span {
								font-weight: 100;
								opacity: 0;
							}

							@for $i from 1 through 5 {
								span:nth-child(#{$i}) {
									transform: translateX(-3px * ($i - 1)) scaleX(0.8);
								}
							}
						}

						h1:nth-child(2) {
							span {
								font-weight: 100;
								opacity: 0;
							}

							@for $i from 1 through 7 {
								span:nth-child(#{$i}) {
									transform: translateX(-3px * ($i + 4)) scaleX(0.8);
								}
							}
						}
					}

					#subheading {
						font-weight: 100;
						opacity: 0;
					}

					// > * {
					// 	opacity: 0;
					// 	transform: translateY(20px);
					// }
				}

				#cta {
					> * {
						opacity: 0;
						transform: translateY(-15px);
						transition: 500ms $in-cubic;
					}
					@for $i from 1 through 3 {
						> *:nth-child(#{$i}) {
							transition-delay: 100ms * ($i - 1);
						}
					}
				}
			}
		}

		&.offpage {
			opacity: 0;
			pointer-events: none;
			position: fixed;
		}

		&.no-transition,
		&.no-transition * {
			transition: none !important;
		}
	}
</style>
