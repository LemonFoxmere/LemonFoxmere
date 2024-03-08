<script lang="ts" context="module">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	export const navState = writable<{
		name: string;
		scrollHeight: number;
		ctaButton: HTMLButtonElement | null;
		selectorProperties: {
			scaling: number;
			scaleInverse: number;
			offset: number;
			animated: boolean;
		};
	}>({
		name: "About",
		scrollHeight: 0,
		ctaButton: null,
		selectorProperties: {
			scaling: 1.2,
			scaleInverse: 0.83333,
			offset: 0,
			animated: false
		}
	});
</script>

<script lang="ts">
	let aboutButton: HTMLButtonElement;
	let projectsButton: HTMLButtonElement;
	let artButton: HTMLButtonElement;

	const scrollToSection = (name: string, scrollHeight: number, button: HTMLButtonElement) => {
		const buttonHeight = button.getBoundingClientRect().height;
		const buttonY = button.getBoundingClientRect().y;

		console.log(buttonY + buttonHeight);

		$navState = {
			name: name,
			scrollHeight: scrollHeight,
			ctaButton: button,
			selectorProperties: {
				scaling: buttonHeight / 100,
				scaleInverse: 100 / buttonHeight,
				offset: buttonY - aboutButton.getBoundingClientRect().y,
				animated: true
			}
		};
	};

	const updateSelector = (animated = true) => {
		if (!$navState.ctaButton) return;

		const buttonHeight = $navState.ctaButton.getBoundingClientRect().height;
		const buttonY = $navState.ctaButton.getBoundingClientRect().y;

		$navState.selectorProperties = {
			scaling: buttonHeight / 100,
			scaleInverse: 100 / buttonHeight,
			offset: buttonY - aboutButton.getBoundingClientRect().y,
			animated: animated
		};
	};

	onMount(() => {
		// initialize the nav state with animation set to false
		const buttonHeight = aboutButton.getBoundingClientRect().height;
		const buttonY = aboutButton.getBoundingClientRect().y;
		$navState = {
			name: "About",
			scrollHeight: 0,
			ctaButton: aboutButton,
			selectorProperties: {
				scaling: buttonHeight / 100,
				scaleInverse: 100 / buttonHeight,
				offset: buttonY - 35,
				animated: false
			}
		};

		// add an event listener to update the selector size when the window is resized so it matches
		window.onresize = () => {
			updateSelector(false);
		};
	});
</script>

<main>
	<!-- side bar navigation (desktop only!!) -->
	<section id="side-bar" class="only-desktop">
		<div
			id="selector"
			style="transform: translateY({$navState.selectorProperties.offset}px) scaleY({$navState
				.selectorProperties.scaling}); {!$navState.selectorProperties.animated
				? 'transition: none'
				: ''}"
		>
			<section
				id="selector-content"
				style="transform: scaleY({$navState.selectorProperties.scaleInverse}) translateY(-{$navState
					.selectorProperties.offset}px); {!$navState.selectorProperties.animated
					? 'transition: none'
					: ''}"
			>
				<p>About</p>
				<p>Projects</p>
				<p>Art</p>
			</section>
		</div>

		<section id="cta">
			<button bind:this={aboutButton} on:click={() => scrollToSection("About", 0, aboutButton)}
				><p>About</p></button
			>
			<button
				bind:this={projectsButton}
				on:click={() => scrollToSection("Projects", 0, projectsButton)}><p>Projects</p></button
			>
			<button bind:this={artButton} on:click={() => scrollToSection("Art", 0, artButton)}
				><p>Art</p></button
			>
		</section>

		<!-- vertical line -->
		<hr />
	</section>

	<section id="content">
		<slot />
	</section>

	<!-- bottom bar nagication (phone and tablet only) -->
	<section id="selector-window" class="exclude-desktop">
		<div id="selector-background" />

		<section id="cta">
			<button><p>About</p></button>

			<button><p>Project</p></button>

			<button><p>Art</p></button>
		</section>

		<section id="fake-cta">
			<button><p>About</p></button>
			<button><p>Project</p></button>
			<button><p>Art</p></button>
		</section>
	</section>
</main>

<section id="footer-container"></section>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		height: 100%;

		#content {
			padding-left: 96px;
			box-sizing: border-box;
		}

		#selector-window {
			position: -webkit-sticky;
			position: sticky;
			bottom: 10px;
			align-self: center;

			// left: 50%;
			// transform: translateX(-50%);

			margin-bottom: 10px;

			width: 245px;
			height: 50px;

			background-color: $translucent-cream;
			-webkit-backdrop-filter: blur(30px) saturate(200%);
			backdrop-filter: blur(30px) saturate(200%);
			border-radius: 25px;

			display: flex;
			justify-content: center;
			align-items: center;

			#selector-background {
				background-color: $black;
			}

			#cta {
				button {
					background: none;
					border: none;

					p {
						font-size: 18px;
					}
				}
			}

			#fake-cta {
				@extend #cta;
				position: absolute;
			}
		}

		#side-bar {
			position: sticky;
			top: 0px;
			margin-top: -100vh;
			// left: 0px;

			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-end;

			width: 96px;
			min-width: 96px;
			height: 100vh;

			#selector {
				width: 100%;
				height: 100px;
				background: $black;

				pointer-events: none;

				position: absolute;
				z-index: 2;
				top: 35px;

				transform-origin: top;
				transition: transform 700ms $out-generic-expo;

				overflow: hidden;

				#selector-content {
					display: flex;
					align-items: flex-end;
					flex-direction: column;
					width: 100%;

					// margin-right: 10px;

					transform-origin: top;
					transition: transform 700ms cubic-bezier(0.28, 1, 0.22, 1);

					p {
						display: flex;
						box-sizing: border-box;
						padding: 30px 0px 30px 26px;

						color: $white;

						writing-mode: vertical-rl;
						margin: 0px;
						line-height: 0px;

						font-size: 22px;

						transform: scale(-1, -1); // flip it right side up
					}
				}
			}

			#cta {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;

				width: 100%;
				height: fit-content;

				margin-top: 35px;

				button {
					display: flex;
					justify-content: flex-end;
					width: 100%;
					box-sizing: border-box;

					border: none;
					background: none;
					padding: 30px 26px 30px 0px;

					p {
						writing-mode: vertical-rl;
						margin: 0px;
						line-height: 0px;

						font-size: 22px;

						transform: scale(-1, -1); // flip it right side up
					}
				}
			}

			hr {
				display: flex;

				width: 2px;
				height: 100%;
				border: none;
				background-color: $black;

				margin: 35px 14px 0px 0px;
			}
		}

		@media screen and (max-width: $small-desktop-width) {
			#content {
				padding-left: 48px;
			}

			#side-bar {
				width: 48px;
				min-width: 48px;

				position: sticky;
				top: 0px;

				#selector {
					#selector-content {
						p {
							font-size: 18px;
						}
					}
				}

				#cta {
					button {
						p {
							font-size: 18px;
						}
					}
				}

				hr {
					display: flex;

					width: 2px;
					height: calc(100%);
					border: none;
					background-color: $black;

					margin: 35px 14px 0px 0px;
				}
			}
		}

		@media screen and (max-width: $tablet-width) {
			#content {
				padding: 0px 25px;
			}

			#selector-window {
				bottom: 35px;
			}
		}

		@media screen and (max-width: $mobile-width) {
			#content {
				padding: 0px 25px;
			}

			#selector-window {
				bottom: 10px;
			}
		}
	}

	#footer-container {
		width: 100%;
		height: 400px;
		background-color: $black;
	}
</style>
