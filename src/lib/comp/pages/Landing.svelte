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
			<section id="connections">
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
			<p id="subheading">RL Robotics Researcher &nbsp;~&nbsp; Digital Artist</p>
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
	</section>

	<!-- graphics -->
	<div id="graphics" class="no-drag">
		<Lemon visible={content_visible} />
	</div>
</section>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

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
