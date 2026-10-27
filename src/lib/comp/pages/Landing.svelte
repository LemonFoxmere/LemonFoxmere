<script lang="ts">
	import Email from "$lib/comp/Email.svelte";
	import Github from "$lib/comp/Github.svelte";
	import Linkedin from "$lib/comp/Linkedin.svelte";
	import Separator from "$lib/comp/Separator.svelte";
	import Lemon from "../Lemon.svelte";
	import { page } from "$app/state";

	type Props = {
		visible: boolean;
		animate: boolean;
	};
	let { visible, animate }: Props = $props();

	// svelte-ignore state_referenced_locally
	let content_visible: boolean = $state(visible);
	// svelte-ignore state_referenced_locally
	let on_page: boolean = $state(visible);

	let from_smokescreen: boolean = !page.url.hash;

	$effect(() => {
		if (!animate) {
			// snap to correct state instantly, no animation
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
			}, from_smokescreen ? 0 : 850); // ~10 frames @ 12 fps
			from_smokescreen = false;
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
			<p id="subheading">
				Robotics & RL Researcher @ UCSC
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
		<div id="lemon-wrap">
			<Lemon visible={content_visible} />
		</div>
	</div>
</section>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;
	@use "sass:math";

	#content {
        $content-max-width: 800px;

		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
        min-width: calc($mobile-width - 80px);
		max-width: $content-max-width;
        
        min-height: 500px;
        max-height: 100%;

        margin-left: calc(5vw - 0.05 * $mobile-width);
        margin-top: 2vh;

        // border: 1px solid blue; 

		#text {
			display: flex;
			flex-direction: column;
			row-gap: 24px;

			z-index: 1; // bring above graphics
			#title {
				#connections {
					display: flex;
					column-gap: 12px;

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
					flex-direction: column;

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
                    color: $token-surface-solid-accent;
                    font-size: 24px;
                    font-weight: 400;
                    line-height: 110%;

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
				row-gap: 12px;
			}

			#cta {
				* {
					color: $token-text-secondary;
					font-style: italic;

					transition:
						color 400ms $out-generic,
						scale 600ms $out-generic-expo,
						opacity 500ms $out-generic,
						transform 500ms $out-generic;

					&:hover {
						@media (hover: hover) {
                            transition-duration: 100ms, 400ms, 500ms, 500ms;
							color: $token-surface-solid-accent;
						}
					}

					&:active {
						transition-duration: 200ms, 200ms, 500ms, 500ms;
						color: $token-surface-solid-accent;
						opacity: 0.7;
						scale: 1.15;
					}
				}

				@for $i from 1 through 3 {
					$delay: 500ms + 100ms * ($i - 1);
					> *:nth-child(#{$i}) {
						transition-delay: 0ms, 0ms, $delay, $delay;
					}
				}
			}
		}

		#graphics {
            position: absolute;
            container-type: size;
            display: flex;
            align-items: flex-end;

            // border: 1px solid red;
            
            $left: 150px;
            $top: 80px;

			top: $top;
			padding-left: $left;
			width: min($content-max-width, 100%);
            aspect-ratio: 1.6; // height follows width

            // some clever tuning to dodge the subtitle
            $dodge-activ-trig: 200px;
            $dodge: 36px;
            $dodge-rate: 0.8;
            transform: translateY(calc(
                    clamp(
                        0px, ($mobile-width + $dodge-activ-trig) - 100vw, $dodge/$dodge-rate
                    ) * $dodge-rate
                ));

			#lemon-wrap {
				display: contents; // only used for the mobile layout
			}
		}

		@media screen and (width <= $mobile-width) {
			// border: 2px solid blue;

            flex-direction: column-reverse;
			justify-content: flex-end;

			height: 100%;

			// undo desktop sizing
			min-width: unset;
			min-height: unset;
			max-height: unset;
			margin-left: 0;
			margin-top: 0;

			#text {
				position: relative;
				display: flex;
				flex-direction: column;
				margin-bottom: auto;
				
                width: calc(100% - 20px - 42px);

                row-gap: 24px;

				// border: 1px solid magenta;

				z-index: 1; // bring above graphics
				#title {
					#heading {
						flex-direction: row;
						flex-wrap: wrap;

						h1 {
							white-space: nowrap;
						}
					}
                    #subheading{
                        font-size: 18px;
                        line-height: 110%;

                        span {
                            white-space: nowrap;
                        }
                    }
				}

				#cta {
					row-gap: 16px;
					padding-bottom: 12px;

					@include non-mobile-safari { // needs to be bigger on chrome and stuff
						padding-bottom: 32px;
					}
				}

				#connections {
					display: flex;
					position: absolute;
					left: calc(100% + 15px);
					bottom: 6px;

					@include non-mobile-safari { // needs to be bigger on chrome and stuff
						bottom: 24px;
					}

					flex-direction: column;
					row-gap: 12px;

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
                // diag height w.r.t. width=1
				$k: math.sin(math.div($d * 3.1415, 180)) +
					math.div(math.cos(math.div($d * 3.1415, 180)), 1.6);
				$w_extend: 150px;
				$min-height: 250px;
                // how much the rotated graphics overflow the top and bottom
                --overflow-top: 50px;
                $overflow-top: var(--overflow-top);
                $overflow-bottom: 30px;

                @include non-mobile-safari {
                    $overflow-top: 20px;
                }

				// vertical overhang (how much sticks out from the parent)
				$overhang: $k - calc(1 / 1.6);

				// undo desktop absolute positioning and transforms
				position: relative;
				top: auto;
				aspect-ratio: auto;
                transform: none;
				height: 100%;
				min-height: $min-height;
                max-height: 100vw * $k;

				container-type: size;
				display: flex;
				flex-direction: column;
				align-items: center;

				padding-left: unset;
				margin-left: -($w_extend/2);
                margin-top: auto;
				width: calc(100% + $w_extend);

				#lemon-wrap {
                    $w: min(100cqw, (100cqh + $overflow-bottom + $overflow-top) / $k);
					
                    display: block;
					container-type: inline-size;
                    
                    width: $w;

					transform: translateY(calc($w * #{$overhang} / 2 - $overflow-top)) rotate(-#{$d}deg);
				}
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
									transform: translateX(-3px * ($i - 1)) scaleX(0.8);
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
