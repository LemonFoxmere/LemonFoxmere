<script lang="ts">
	import { PageScrollLoc, navState } from "$route/+layout.svelte";
	import { onMount } from "svelte";

	// UI elements
	let aboutButton: HTMLButtonElement;
	let projectsButton: HTMLButtonElement;
	let artButton: HTMLButtonElement;
	let focusedButton: HTMLButtonElement;

	// UI element controls
	let offset: number = 0;
	let scaling: number = 1.2;
	$: scalingInverse = 1 / scaling;
	let animated: boolean = false;

	// define the button associated with each page
	let navigatorButtonMapping: Record<`${PageScrollLoc}`, HTMLButtonElement>;

	const init = () => {
		// initialize the navigation button mappings
		navigatorButtonMapping = {
			about: aboutButton,
			projects: projectsButton,
			art: artButton
		};

		// the first focused button should be the about button
		focusedButton = aboutButton;

		// add listner to the view port on resize to recalculate button position
		window.addEventListener("resize", () => recalculatePosition(false));

		// finally, recalculate the button position for initial positioning
		recalculatePosition(false);
	};

	const scrollToSection = (name: `${PageScrollLoc}`, scrollHeight: number) => {
		// update global state first
		$navState.name = name;

		// update the position of the mobile navigator
		focusedButton = navigatorButtonMapping[name];

		// update the scaling and offset values
		// animated should be true as this function should only be triggered manually
		recalculatePosition(true);
	};

	const recalculatePosition = (animate: boolean) => {
		animated = animate;
		[offset, scaling] = calcPosition(focusedButton, aboutButton);
	};

	const calcPosition = (button: HTMLButtonElement, anchor: HTMLButtonElement): [number, number] => {
		// get the offset of the button relative to the anchor
		const buttonHeight = button.getBoundingClientRect().height;
		const buttonY = button.getBoundingClientRect().y;
		const anchorY = anchor.getBoundingClientRect().y;

		// calculate the offset and scaling values
		const s = buttonHeight / 100;
		const o = buttonY - anchorY;

		return [o, s];
	};

	onMount(init);
</script>

<main class="only-desktop">
	<div
		id="selector"
		style="transform: translateY({offset}px) scaleY({scaling}); {!animated
			? 'transition: none'
			: ''}"
	>
		<section
			id="selector-content"
			style="transform: scaleY({scalingInverse}) translateY(-{offset}px); {!animated
				? 'transition: none'
				: ''}"
		>
			<p>About</p>
			<p>Projects</p>
			<p>Art</p>
		</section>
	</div>

	<section id="cta">
		<button bind:this={aboutButton} on:click={() => scrollToSection(PageScrollLoc.About, 0)}
			><p>About</p></button
		>
		<button bind:this={projectsButton} on:click={() => scrollToSection(PageScrollLoc.Projects, 0)}
			><p>Projects</p></button
		>
		<button bind:this={artButton} on:click={() => scrollToSection(PageScrollLoc.Art, 0)}
			><p>Art</p></button
		>
	</section>

	<!-- vertical line -->
	<hr />
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
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

		z-index: 100;

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

				transition: opacity 150ms ease-in-out;

				cursor: pointer;

				p {
					writing-mode: vertical-rl;
					margin: 0px;
					line-height: 0px;

					font-size: 22px;
					transform: scale(-1, -1); // flip it right side up
				}

				&:hover {
					opacity: 0.5;
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

		@media screen and (max-width: $small-desktop-width) {
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
</style>
