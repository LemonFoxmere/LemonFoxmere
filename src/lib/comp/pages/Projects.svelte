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
		const prevent = (e: TouchEvent) => e.preventDefault();
		node.addEventListener("touchmove", prevent, { passive: false });
		return { destroy: () => node.removeEventListener("touchmove", prevent) };
	}

	const num_projects = 4;
	let current_project_idx = $state(0);

	let card_ref_0: any = null;
	let card_ref_1: any = null;
	let card_ref_2: any = null;
	let card_ref_3: any = null;

	function openActiveModal() {
		[card_ref_0, card_ref_1, card_ref_2, card_ref_3][current_project_idx]?.openModal?.();
	}
</script>

<main
	use:noTouchScroll
	class="{!content_visible ? 'hidden' : ''} {!on_page ? 'offpage' : ''} {!animate
		? 'no-transition'
		: ''}"
>
	<section id="content">
		<section id="title">
			<div id="nav">
				<BackButton />
			</div>
			<section id="text">
				<section id="heading">
					<h1>
						<span>A</span><span>c</span><span>t</span>
						<span>0</span><span>2</span><span class="phone-hidden">:</span>
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
				<div class="phone-only">
					<Separator visible={content_visible} clr="secondary" />
				</div>
			</section>
		</section>

		<section id="body">
			<div id="projects">
				<ProjectTextCard
					bind:this={card_ref_0}
					visible={current_project_idx === 0 && content_visible}
					title="RoboDog Project"
				>
					<!-- <div class="project-links">
						<a href="https://github.com/harelab-ucsc/b1_rl_locomotion" target="_blank"
							>Github</a
						>
					</div> -->
					<p>
						Working with Dr. Steve McGuire at UCSC's HARE Lab and Dr. Leilani Gilpin at
						the AIEA Lab, our goal is to develop a robust, unified MTRL controller
						capable of smoothly switching between multiple behaviors using Nvidia's
						IsaacSim and IsaacLab.
					</p>
					<p>
						Using ROS2 and Gazebo, we aim to validate our controller on a physical
						Unitree B1 quadruped and demonstrate real-world robustness through
						sim-to-real transfer.
					</p>
				</ProjectTextCard>
				<ProjectTextCard
					bind:this={card_ref_1}
					visible={current_project_idx === 1 && content_visible}
					title="Autonomous Drone Racing"
				>
					<p>
						Implemented a geometric controller and polynomial trajectory optimizer for a
						drone racing competition as part of ECE 264: Visual Navigation for
						Autonomous Vehicles (based on MIT 16.485).
					</p>
					<p>
						We finished the obstacle course in 8.5 seconds — 1.8 seconds faster than
						MIT's record of 10.3s as of March 2026
					</p>
				</ProjectTextCard>
				<ProjectTextCard
					bind:this={card_ref_2}
					visible={current_project_idx === 2 && content_visible}
					title="This Website"
				>
					<p>
						Built with SvelteKit, all the contents and animations that you see are
						hand-crafted by yours truly with SCSS or Procreate :)
					</p>
					<p>No AI was used in any part of this website.</p>
				</ProjectTextCard>
				<ProjectTextCard
					bind:this={card_ref_3}
					visible={current_project_idx === 3 && content_visible}
					title="DeepFusion"
				>
					<!-- <div class="project-links">
						<a href="https://github.com/LemonFoxmere/DeepFusion" target="_blank"
							>Github</a
						>
						<a href="https://lemonfoxmere.github.io/DeepFusion/" target="_blank">App</a>
					</div> -->
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

			<section id="controls">
				<!-- phone readmore -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a
					id="read-more"
					class="phone-only"
					onclick={(e) => {
						e.preventDefault();
						openActiveModal();
					}}>Read More</a
				>
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

			width: min(450px + 100px, 100%);
			height: calc(100% + 100px);
			padding-bottom: 150px;
			min-height: fit-content;

			#title {
				display: flex;
				flex-direction: column;
				row-gap: 10px;

				width: 100%;

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
				row-gap: 40px;
				margin-top: 20px;

				#controls {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;

					transition:
						opacity 400ms $out-generic,
						transform 700ms $out-generic;

					transition-delay: 700ms;

					#read-more {
						font-weight: 600;
						color: $token-surface-solid-accent;
						text-decoration: underline;
						cursor: pointer;

						&:active {
							opacity: 0.7;
						}
					}
				}

				#projects {
					.project-links {
						display: flex;
						column-gap: 0.5rem;

						a {
							color: $token-text-invert;
							text-decoration: none;
							background-color: $token-surface-solid-invert;

							font-size: 14px;
							padding: 2px 12px;
							border-radius: 50px;
							margin: 0px;

							-webkit-user-drag: none;
							-moz-user-select: none;
							user-select: none;
							-webkit-user-select: none;
							-ms-user-select: none;

							&:active {
								transition: none;
								opacity: 0.75;
							}
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

			pointer-events: none;

			transition:
				opacity 600ms $out-generic,
				transform 700ms $out-generic;
		}

		@media screen and (width <= $mobile-width) {
			$text-content-gap: 250px;

			#content {
				padding: 0;
				padding-top: 20px;

				width: calc(100% + 20px);
				margin-left: -10px;
				height: 100%;

				#title {
					z-index: 1;
					#text {
						align-items: center;
						#heading {
							justify-content: center;

							h1:nth-child(2) {
								@for $i from 1 through 8 {
									span:nth-child(#{$i}) {
										transition-delay: 20ms * ((8-$i) + 5);
									}
								}
							}
						}
					}
				}
				#body {
					height: $text-content-gap;
					max-height: $text-content-gap;
					margin-top: 0px;

					row-gap: 10px;
					justify-content: space-between;

					padding: 20px 0px;

					#controls {
						padding: 0px 20px 10px 10px;
					}

					#projects {
						flex: 1;
						min-height: 0;
					}
				}
			}

			#graphics {
				top: 0px;
				left: 0px;

				display: flex;
				justify-content: center;
				align-items: center;

				width: 100%;
				height: calc(100% - $text-content-gap);
				transform: none;

				pointer-events: none;

				transition:
					opacity 600ms $out-generic,
					transform 700ms $out-generic,
					filter 700ms $out-generic;

				// Indicator pinned to bottom-left of the image area
				#mobile-indicator {
					position: absolute;
					bottom: 20px;
					left: 25px;
					z-index: 1;
				}
			}

			&.hidden {
				#content {
					#title {
						#text {
							#heading {
								h1:nth-child(2) {
									@for $i from 1 through 8 {
										span:nth-child(#{$i}) {
											transform: translateX(3px * (8-$i))
												scaleX(0.8) !important;
										}
									}
								}
							}
						}
					}
				}

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
