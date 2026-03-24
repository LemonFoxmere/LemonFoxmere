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

	const num_projects = 4;
	let current_project_idx = $state(0);
</script>

<main
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
						<span>0</span><span>2</span><span>:</span>
					</h1>
					<h1 class="thin">
						<span>P</span><span>r</span><span>o</span><span>j</span><span>e</span><span
							>c</span
						><span>t</span><span>s</span>
					</h1>
				</section>
				<Separator visible={content_visible} />
			</section>
		</section>

		<section id="body">
			<div id="projects">
				<ProjectTextCard
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
					visible={current_project_idx === 2 && content_visible}
					title="This Website"
				>
					<p>
						Built with SvelteKit and SCSS, all the contents and animations that you see
						are hand-crafted by yours truly :)
					</p>
					<p>No AI was used in any part of this website.</p>
				</ProjectTextCard>
				<ProjectTextCard
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
				<CarouselController
					num_elements={num_projects}
					bind:current_idx={current_project_idx}
				/>
				<CarouselIndicator
					num_elements={num_projects}
					bind:current_idx={current_project_idx}
				/>
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
			uri="images/raster/lemon_light.png"
			alt="This Website"
			fit_image={true}
		/>
		<ProjectImageCard
			visible={current_project_idx === 3 && content_visible}
			uri="images/raster/deepfusion.jpg"
			alt="DeepFusion"
			dark={true}
		/>
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
