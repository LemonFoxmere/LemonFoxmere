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

	// dim the (sticky) photo once the page has scrolled a bit (mobile only, see css)
	let dimmed: boolean = $state(false);

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

<svelte:window onscroll={() => (dimmed = scrollY > 10)} />

<section
	id="content"
	class="{!content_visible ? 'hidden' : ''} {!on_page ? 'offpage' : ''} {!animate
		? 'no-transition'
		: ''}"
>
	<section id="text-content">
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
					<span>
						<span>W</span><span>h</span><span>o</span>
					</span>
					<span>
						<span>A</span><span>r</span><span>e</span>
					</span>
					<span>
						<span>Y</span><span>o</span><span>u</span><span>?</span>
					</span>
				</h1>
			</section>
			<Separator visible={content_visible} />
			<section id="body">
				<p id="par1">
					Hey there, My name is Lemon! I'm a robotics researcher with a passion in UI/UX design and visual art. Currently, I'm studying Computer Science at UC Santa Cruz as an undergrad and working with Dr. Steve McGuire in the Human Aware Robotics Exploration (HARE) Lab.
				</p>
				<p id="par2">
					My research interest sits at the intersection of reinforcement learning, representation learning, and continual learning. Specifically, I'm interested in how robots can efficiently learn meaningful and generalizable representations of the world around them, as well as adapt to novel environments and dynamics as they explore the real world. If this sounds interesting to you, I'd love to chat!
				</p>
				<p id="par3">
					When I'm not playing with robots, I like to travel and draw funny animal people.
				</p>
			</section>
		</section>
	</section>

	<!-- graphics -->
	<div id="graphics" class="no-drag">
		<img class:dimmed src="/images/raster/lemon_photo.png" alt="" />
	</div>

    <!-- top and bottom gradients -->
    <div id="bottom-gradient"></div>
</section>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	#content {
		position: relative;

		// border: 1px solid red;

		display: flex;
		flex-direction: column;
		justify-content: center;
		row-gap: 12px;

		width: min(650px + 300px, 100%);

		#text-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			row-gap: 12px;

			#nav {
				z-index: 1;
				transition-property: opacity, transform;
				transition: 500ms $out-generic;
			}

			#text {
				display: flex;
				flex-direction: column;
				row-gap: 24px;
				width: 100%;
                min-width: $mobile-width - 40px;
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

						white-space: nowrap;

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
					}

					h1:nth-child(1) {
						@for $i from 1 through 6 {
							span:nth-child(#{$i}) {
								transition-delay: 20ms * $i;
							}
						}
					}
					h1.thin {
						> span {
							transition: none;
						}

						> span:nth-child(1) {
							@for $i from 1 through 3 {
								> span:nth-child(#{$i}) {
									transition-delay: 20ms * ($i + 6);
								}
							}
						}
						> span:nth-child(2) {
							@for $i from 1 through 3 {
								> span:nth-child(#{$i}) {
									transition-delay: 20ms * ($i + 9);
								}
							}
						}
						> span:nth-child(3) {
							@for $i from 1 through 4 {
								> span:nth-child(#{$i}) {
									transition-delay: 20ms * ($i + 12);
								}
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
                    #par1{
                        padding-right: 150px;
                    }
                    #par2{
                        padding-right: 75px;
                    }
				}
			}
		}

		#graphics {
			position: absolute;
			right: 0;
			width: min(650px, 100% + 50px);

			transform-origin: 80% 20%;

            border-top-right-radius: 62px;
            overflow: hidden;

			// border: 1px solid red;

			transition:
                opacity 600ms $out-generic,
                transform 700ms $out-generic;
			transition-delay: 700ms;

			img {
				width: 100%;
                transition:
                        opacity 1000ms $out-generic-expo,
                        filter 1000ms $out-generic-expo;
			}
		}

        #bottom-gradient {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 1;

            pointer-events: none;

            width: 100%;
            height: 50px;
            transform: rotate(180deg);

            // log scale to look more natural
            background: linear-gradient(
                #fcefe8ff 0%,
                #fcefe8e6 15%,
                #fcefe8bf 30%,
                #fcefe88c 45%,
                #fcefe859 60%,
                #fcefe82e 73%,
                #fcefe812 85%,
                #fcefe800 100%
            );
        }

        @media screen and ($mobile-width < width <= 900px) { // this page specific
            #graphics {
                img{
                    opacity: 0.5;
                }
            }
        }

		@media screen and (width <= $mobile-width) {
			flex-direction: column-reverse;
			justify-content: flex-end;
            margin-bottom: auto; // align to top

			#text-content {
                display: flex;
				flex-direction: column;
                justify-content: center;
				row-gap: 10px;
                margin-top: -180px;

				#nav {
					z-index: 1;
					transition-property: opacity, transform;
					transition: 500ms $out-generic;
				}

				#text {
					min-width: unset; // undo desktop min-width
					padding-right: 0;
					padding-bottom: 50px;
                    @include non-mobile-safari {
                        padding-bottom: 75px;
                    }

					#heading {
						h1 {
							white-space: wrap;
						}
					}
                    #body{
                        #par1, #par2{
                            padding-right: 0px;
                        }
                    }
				}
			}

			#graphics {
				$w_extend: 300px;

				position: sticky;
				top: 0;
				width: calc(100% + $w_extend);

				margin-left: -$w_extend + 30px;
                
                transition:
                    opacity 600ms $out-generic,
                    transform 700ms $out-generic,
                    filter 700ms $out-generic;
				transition-delay: 0ms;
                
				@include non-mobile-safari {
                    transform-origin: calc(50% + $w_extend / 2) 50%;
                    border-top-right-radius: 0;
				}
                
				img {
                    width: 100%;
                    
					&.dimmed {
						opacity: 0;
                        filter: saturate(1.25);
					}
				}
			}

            @include non-mobile-safari {
                &.hidden {
                    #graphics {
                        transform: scale(1.1) !important;
                        filter: blur(5px) brightness(1.5);
                    }
                }
            }
		}

		&.hidden {
			* {
				pointer-events: none;
			}

			#text-content {
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

						h1.thin {
							> span {
								opacity: 1;
								font-weight: inherit;
								transform: none;
							}
							> span:nth-child(1) {
								@for $i from 1 through 3 {
									> span:nth-child(#{$i}) {
										transform: translateX(-3px * ($i + 5)) scaleX(0.8);
									}
								}
							}
							> span:nth-child(2) {
								@for $i from 1 through 3 {
									> span:nth-child(#{$i}) {
										transform: translateX(-3px * ($i + 8)) scaleX(0.8);
									}
								}
							}
							> span:nth-child(3) {
								@for $i from 1 through 4 {
									> span:nth-child(#{$i}) {
										transform: translateX(-3px * ($i + 11)) scaleX(0.8);
									}
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
