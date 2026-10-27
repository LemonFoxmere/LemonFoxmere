<script lang="ts">
	import Separator from "$lib/comp/Separator.svelte";
	import BackButton from "../BackButton.svelte";
	import CarouselController from "../projects/CarouselController.svelte";
	import CarouselIndicator from "../projects/CarouselIndicator.svelte";
	import ProjectImageCard from "../projects/ProjectImageCard.svelte";
	import ProjectTextCard from "../projects/ProjectTextCard.svelte";

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

	function noTouchScroll(node: HTMLElement) {
		const prevent = (e: TouchEvent) => {
			// the page scrolls on mobile
			if (!matchMedia("(width <= 600px)").matches) e.preventDefault();
		};
		node.addEventListener("touchmove", prevent, { passive: false });
		return { destroy: () => node.removeEventListener("touchmove", prevent) };
	}

	const num_projects = 4;
	let current_project_idx = $state(0);

	let masked: boolean = $state(false);
</script>

<svelte:window onscroll={() => (masked = scrollY > 1)} />

<main
	use:noTouchScroll
	class="{!content_visible ? 'hidden' : ''} {!on_page ? 'offpage' : ''} {!animate
		? 'no-transition'
		: ''}"
>
	<section id="content">
		<section id="title" class:masked>
			<div id="top-gradient" class="phone-only"></div>

			<div id="nav">
				<BackButton />
			</div>
			<section id="text">
				<section id="heading">
					<h1>
						<span>A</span><span>c</span><span>t</span>
						<span>0</span><span>2</span><span>:</span>
					</h1>
					<h1 class="thin">
						<span>P</span><span>r</span><span>o</span><span>j</span><span>e</span><span
							>c</span
						><span>t</span><span>s</span>
					</h1>
				</section>
				<div class="phone-hidden">
					<Separator visible={content_visible} />
				</div>
			</section>

            <!-- only shows up on overflow scroll -->
            <div id="overflow-carousel-indicator" class="phone-only">
                <CarouselIndicator
                    num_elements={num_projects}
                    bind:current_idx={current_project_idx}
                    scheme="invert"
                />
            </div>
		</section>

		<section id="body">
			<div id="projects">
				<ProjectTextCard
					visible={current_project_idx === 0 && content_visible}
					title="RoboDog Project"
				>
					<div class="project-links">
						<a href="https://www.youtube.com/watch?v=V9yX04EBcFA" class="connections" target="_blank"
							>YOUTUBE</a
						>
                        <div></div>
						<a href="https://arxiv.org/abs/2610.10601" class="connections" target="_blank"
							>ARXIV</a
						>
					</div>

					<p>
						Working with Dr. Steve McGuire and Dr. Leilani Gilpin, I led the
                        development of a multi-task reinforcement learning method that
                        trains a single end-to-end policy to perform multiple distinct
                        tasks. The policy is capable of learning diverse skills such as
                        walking, digging, and hopping, smoothly switching between them,
                        and composing them to produce novel behaviors such as crawling.
					</p>
					<p>
                        To demonstrate real-world performance, we deployed this method on
                        a Unitree B1 quadruped, where it traversed through slopes and bumpy
                        terrain, crawled under obstacles, and lifted its leg to press
                        buttons.
					</p>
				</ProjectTextCard>
				<ProjectTextCard
					visible={current_project_idx === 1 && content_visible}
					title="Autonomous Drone Racing"
				>
					<p>
						Implemented a geometric controller and polynomial trajectory optimizer for a
						drone racing competition as part of ECE 264: Visual Navigation for
						Autonomous Vehicles (based on MIT 16.485).
					</p>
					<p>
						We finished the obstacle course in 8.5 seconds: 1.8 seconds faster than
						MIT's record of 10.3s as of March 2026
					</p>
				</ProjectTextCard>
				<ProjectTextCard
					visible={current_project_idx === 2 && content_visible}
					title="This Website"
				>
                    <div class="project-links">
                        <a href="https://github.com/LemonFoxmere/LemonFoxmere" class="connections" target="_blank"
                            >GITHUB</a
                        >
                    </div>
					<p>
						I built this website with SvelteKit and styled it with lots of SCSS.
                        All the animations and art that you see are also hand-crafted by yours
                        truly on Procreate :)
					</p>
				</ProjectTextCard>
				<ProjectTextCard
					visible={current_project_idx === 3 && content_visible}
					title="DeepFusion"
				>
					<div class="project-links">
						<a href="https://github.com/LemonFoxmere/DeepFusion" class="connections" target="_blank"
							>GITHUB</a
						>
                        <div></div>
						<a href="https://lemonfoxmere.github.io/DeepFusion/" class="connections" target="_blank">APP</a>
					</div>
					<p>
						A WYSIWYG graphical neural network maker. It lets you to create and train
						simple neural networks on custom datasets without any code, which can then
						be exported to be deployed elsewhere.
					</p>
					<p>
						Using a self-built templating engine, DeepFusion uses no UI frameworks and
						has minimal performance overhead. It's also won first place in over 7
						competitions, including the Congressional App Challenge, Conrad Challenge,
						and Raspberry Pi Coolest Project competition.
					</p>
				</ProjectTextCard>
			</div>

			<!-- dock stays still so the fade doesn't animate with the controls -->
			<div id="controls-dock">
			<div class="fade phone-only"></div>
			<section id="controls">
				<CarouselController
					num_elements={num_projects}
					bind:current_idx={current_project_idx}
				/>

				<!-- desktop version -->
				<div class="phone-hidden">
					<CarouselIndicator
						num_elements={num_projects}
						bind:current_idx={current_project_idx}
					/>
				</div>
			</section>
			</div>
		</section>
	</section>

	<div id="graphics">
		<ProjectImageCard
			visible={current_project_idx === 0 && content_visible}
			uri="images/raster/dogs.jpg"
			alt="RoboDog Project"
		/>
		<ProjectImageCard
			visible={current_project_idx === 1 && content_visible}
			uri="images/raster/drone.jpg"
			alt="Autonomous Drone Racing"
		/>
		<ProjectImageCard
			visible={current_project_idx === 2 && content_visible}
			uri="images/raster/landing_page.jpg"
			alt="This Website"
		/>
		<ProjectImageCard
			visible={current_project_idx === 3 && content_visible}
			uri="images/raster/deepfusion.jpg"
			alt="DeepFusion"
			dark={true}
		/>

		<!-- phone version -->
		<div id="mobile-indicator" class="phone-only">
			<CarouselIndicator
				num_elements={num_projects}
				bind:current_idx={current_project_idx}
				scheme={["invert", "primary", "invert", "primary"][current_project_idx]}
			/>
		</div>

        <!-- faster to animate than trying to mess with the project photo opacity -->
		<div id="mask" class="phone-only" class:masked></div>
	</div>
</main>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	main {
		display: inline-block;

		width: 100%;
		height: 100%;

		#content {
			position: relative;

			margin-left: auto;
			padding: 50px;

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			z-index: 1;

			width: min(500px + 100px, 100%);
			height: calc(100% + 100px);
			padding-bottom: 150px;
			min-height: fit-content;

			#title {
				display: flex;
				flex-direction: column;
				row-gap: 12px;

				width: 100%;

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
							@for $i from 1 through 8 {
								span:nth-child(#{$i}) {
									transition-delay: 20ms * ($i + 6);
								}
							}
						}
					}
				}
			}

			#body {
				width: 100%;

				display: flex;
				flex-direction: column;
				row-gap: 32px;
				margin-top: 24px;

				#controls {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;

					transition:
						opacity 400ms $out-generic,
						transform 700ms $out-generic;

					transition-delay: 700ms;
				}

				#projects {
                    .project-links {
                        margin-bottom: 12px;
						display: flex;
                        align-items: center;
						column-gap: 12px;

                        a{
                            transition: scale 600ms $out-generic-expo;
                            &:active {
                                transition: scale 400ms $out-generic-expo;
                                scale: 1.2;
                            }
                        }

                        div {
                            width: 4px;
                            height: 4px;
                            background-color: $token-surface-solid-accent;
                            border-radius: 4px;
                            pointer-events: none;
                        }
					}
				}
			}
		}

		#graphics {
			position: fixed;
			top: 50%;
			left: 100px;

			display: flex;
			justify-content: center;
			align-items: center;

			width: calc(100% - 100px - 450px);
			height: calc(100% - 200px);
			transform: translateY(-50%);

            min-width: $mobile-width - 100px;

			pointer-events: none;

			transition:
				opacity 600ms $out-generic,
				filter 700ms $out-generic,
				transform 700ms $out-generic;
		}

        @media screen and ($mobile-width < width <= calc($mobile-width * 2)) {
            #graphics {
                opacity: 0.3;
            }
        }

		@media screen and (width <= $mobile-width) {
			// svh so the layout doesn't jump when the browser bars hide
			$graphics-height: min(max(100vw, 300px), 100svh - 200px);
			$content-padding-top: 24px;

			position: relative;
			display: flex;
			flex-direction: column;
			align-self: flex-start;
			height: auto;
			min-height: 100%;

			#content {

                padding: 0;
				padding-top: $graphics-height;

				width: calc(100% + 20px);
				margin-left: -10px;
				height: auto;
				flex: 1;
				z-index: 2;

				#title {
					position: fixed;
					top: $content-padding-top;
                    left: 0px;
                    padding: 0px 24px;
					z-index: 2;

                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;

					#text {
                        width: fit-content;
                        align-items: center;

                        #heading{
                            column-gap: 0.5rem;

                            h1{
                                font-size: 18px;
                            }
                        }
					}

                    #overflow-carousel-indicator{
                        position: absolute;
                        right: 24px;
                        bottom: -100%;

                        transform: translateY(-10px);

                        opacity: 0;
                        pointer-events: none;
                        transition:
                            opacity 300ms $out-generic,
                            transform 300ms $out-generic;
                    }

                    #top-gradient {
                        position: absolute;
                        top: -$content-padding-top;
                        left: 0;
                        right: 0;
                        height: 140px;
                        z-index: -1;
                        pointer-events: none;

                        background: linear-gradient(
                            to bottom,
                            rgba($token-surface-solid-primary, 1) 0%,
                            rgba($token-surface-solid-primary, 1) 45%,
                            rgba($token-surface-solid-primary, 0.91) 55%,
                            rgba($token-surface-solid-primary, 0.81) 65%,
                            rgba($token-surface-solid-primary, 0.66) 75%,
                            rgba($token-surface-solid-primary, 0.45) 85%,
                            rgba($token-surface-solid-primary, 0) 100%
                        );

                        opacity: 0;
                        transition: opacity 300ms $out-generic;
                    }

                    &.masked {
                        #overflow-carousel-indicator {
                            opacity: 1;
                            transition-delay: 300ms;
                            transform: translateY(0px);
                            pointer-events: auto;
                        }
                        #top-gradient {
                            opacity: 1;
                        }
                    }
				}
				#body {
					flex: 1;
					margin-top: 0px;

					row-gap: 10px;
					justify-content: space-between;

					padding-top: 20px;

					#projects {
						padding-bottom: 100px;
					}

					#controls-dock {
						position: sticky;
						bottom: 0;

						#controls {
							position: relative; // paint above the fade
							padding: 0px 20px 6px 12px;
                            
                            justify-content: center;
                            
                            // need more space on normal browsers
                            @include non-mobile-safari {
                                padding: 0px 20px 24px 12px;
                            }
						}

						.fade {
							$solid-height: 30px;

							position: absolute;
							left: 0;
							right: 0;
							bottom: $solid-height; // gradient sits on top of the solid part
							height: 100px;
							pointer-events: none;

							&::after {
								content: "";
								position: absolute;
								left: 0;
								right: 0;
								top: 100%;
								height: $solid-height;
								background-color: $token-surface-solid-primary;
							}

							background: linear-gradient(
								to bottom,
								rgba($token-surface-solid-primary, 0) 0%,
								rgba($token-surface-solid-primary, 0) 10%,
								rgba($token-surface-solid-primary, 0.45) 30%,
								rgba($token-surface-solid-primary, 0.66) 60%,
								rgba($token-surface-solid-primary, 0.81) 80%,
								rgba($token-surface-solid-primary, 0.91) 90%,
								rgba($token-surface-solid-primary, 1) 100%
							);
						}
					}
				}
			}

			#graphics {
				// stays put while the text scrolls under it
				top: 0px;
				left: 0px;
				z-index: 1;

				display: flex;
				justify-content: center;
				align-items: center;

				width: 100%;
                min-width: unset; // undo desktop
				height: $graphics-height;
				transform: none;

				pointer-events: none;

				transition:
					opacity 600ms $out-generic,
					transform 700ms $out-generic,
					filter 700ms $out-generic;

				// indicator pinned to bottom-left of the image area
				#mobile-indicator {
					position: absolute;
					bottom: 18px;
					left: 24px;
					z-index: 1;
				}

				#mask {
					position: absolute;
					inset: 0;
					z-index: 1;

					background-color: $token-surface-solid-primary;
					opacity: 0;

					transition: opacity 300ms $out-generic;

					&.masked {
						opacity: 1;
					}
				}
			}

			&.hidden {
				#graphics {
					transform: none !important;

					transform: scale(1.05) !important;
					filter: blur(5px);

					transition:
						opacity 1000ms $in-out-cubic,
						transform 600ms $in-cubic,
						filter 600ms $out-generic !important;
				}
			}
		}

		&.hidden {
			* {
				pointer-events: none;
			}

			#content {
				#title {
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
								@for $i from 1 through 8 {
									span:nth-child(#{$i}) {
										transform: translateX(-3px * ($i + 5)) scaleX(0.8);
									}
								}
							}
						}
					}
				}

				#body {
					#controls {
						opacity: 0;
                        transform: translateY(-20px);
						transition-delay: 300ms;
					}
				}
			}

			#graphics {
				opacity: 0;
				transform: translate(-20px, -50%);

				transition:
					opacity 1000ms $in-out-cubic,
					transform 600ms $in-cubic;
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
