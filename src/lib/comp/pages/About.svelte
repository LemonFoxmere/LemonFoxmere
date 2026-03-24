<script lang="ts">
	import Separator from "$lib/comp/Separator.svelte";
	import BackButton from "../BackButton.svelte";

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
	<div id="nav">
		<BackButton />
	</div>
	<section id="text">
		<section id="heading">
			<h1>
				<span>A</span><span>c</span><span>t</span>
				<span>0</span><span>1</span><span>:</span>
			</h1>
			<h1 class="thin">
				<span>W</span><span>h</span><span>o</span> <span>A</span><span>r</span><span>e</span
				> <span>Y</span><span>o</span><span>u</span><span>?</span>
			</h1>
		</section>
		<Separator visible={content_visible} />
		<section id="body">
			<p>
				Hey there, I'm Lemon! I'm a robotics researcher and student with a passion for UI/UX
				design and visual art. Currently, I'm studying at UCSC as a Computer Science
				undergrad while working with Dr. Steve McGuire in the Human Aware Robotics
				Exploration (HARE) Lab.
			</p>
			<p>
				My main research interest is in the field of Multi-Task Reinforcement Learning.
				Specifically, how we can train generalized robotics controllers that are capable of
				a multitude of behaviors while maintaining high levels of performance and
				robustness. If this sounds interesting to you, I'd love to have a talk together!
			</p>
			<p>When I'm not playing with robots, I like to cook and draw funny animal people.</p>
		</section>
	</section>

	<!-- graphics -->
	<div id="graphics" class="no-drag">
		<img src="/images/raster/lemon_photo.png" alt="" />
	</div>
</section>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	#content {
		position: relative;

		// border: 1px solid red;

		display: flex;
		flex-direction: column;
		justify-content: center;
		row-gap: 10px;

		width: min(650px + 300px, 100%);

		#nav {
			z-index: 1;
			transition-property: opacity, transform;
			transition: 500ms $out-generic;
		}

		#text {
			display: flex;
			flex-direction: column;
			row-gap: 20px;
			width: 100%;
			padding-right: 35%;

			// border: 1px solid blue;
			// padding-right: 25%;

			z-index: 1; // bring above graphics

			#heading {
				display: inline-flex;
				flex-wrap: wrap;
				column-gap: 1rem;

				width: 100%;

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

				h1 {
					margin: 0;
					padding: 0;
					white-space: nowrap;
					white-space: nowrap;
				}

				h1:nth-child(1) {
					@for $i from 1 through 6 {
						span:nth-child(#{$i}) {
							transition-delay: 20ms * $i;
						}
					}
				}
				h1:nth-child(2) {
					@for $i from 1 through 10 {
						span:nth-child(#{$i}) {
							transition-delay: 20ms * ($i + 6);
						}
					}
				}
			}

			#body {
				display: flex;
				flex-direction: column;
				row-gap: 10px;

				width: 100%;

				text-shadow:
					0px 0px 20px $token-surface-solid-primary,
					0px 0px 20px $token-surface-solid-primary,
					0px 0px 20px $token-surface-solid-primary;

				p {
					transition:
						opacity 500ms $out-generic,
						transform 700ms $out-generic;

					@for $i from 1 through 3 {
						&:nth-child(#{$i}) {
							transition-delay: 100ms * ($i - 1) + 600ms;
						}
					}
				}
			}
		}

		#graphics {
			position: absolute;
			right: 0;
			width: min(650px, 70%);

			transform-origin: 80% 20%;

			// border: 1px solid red;

			transition:
				opacity 700ms $out-generic,
				transform 700ms $out-generic;
			transition-delay: 700ms;

			img {
				width: 100%;
			}
		}

		&.hidden {
			* {
				pointer-events: none;
			}

			#nav {
				opacity: 0;
				pointer-events: none;
				transform: translateX(-10px);
			}

			#text {
				#heading {
					h1 {
						span {
							font-weight: 100;
							opacity: 0;
						}
					}

					h1:nth-child(1) {
						@for $i from 1 through 6 {
							span:nth-child(#{$i}) {
								transform: translateX(-3px * ($i - 1)) scaleX(0.8);
							}
						}
					}

					h1:nth-child(2) {
						@for $i from 1 through 10 {
							span:nth-child(#{$i}) {
								transform: translateX(-3px * ($i + 5)) scaleX(0.8);
							}
						}
					}
				}

				#body {
					p {
						opacity: 0;
						transform: translateY(10px);

						@for $i from 1 through 3 {
							&:nth-child(#{$i}) {
								transition-delay: 100ms * ($i - 1);
							}
						}
					}
				}
			}

			#graphics {
				opacity: 0;
				transform: translate(10px, 10px) rotate(-3deg);
				transition-delay: 0ms;
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
