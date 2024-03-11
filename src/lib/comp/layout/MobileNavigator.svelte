<script lang="ts">
	import { PageScrollLoc, navState } from "$route/+layout.svelte";
	import { onMount } from "svelte";

	// UI elements
	let navContainer: HTMLElement;
	let aboutButton: HTMLButtonElement;
	let projectsButton: HTMLButtonElement;
	let artButton: HTMLButtonElement;
	let focusedButton: HTMLButtonElement;

	// UI element controls
	let insetL: number = 4;
	let insetR: number = 4;
	let totalContainerWidth: number;
	let totalContentWidth: number;
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

		// get the total container width
		totalContainerWidth = navContainer.getBoundingClientRect().width;
		// get the total content width
		totalContentWidth =
			aboutButton.getBoundingClientRect().width +
			projectsButton.getBoundingClientRect().width +
			artButton.getBoundingClientRect().width;

		// the first focused button should be the about button
		focusedButton = aboutButton;

		// add listner to the view port on resize to recalculate button position
		window.addEventListener("resize", () => recalculateInset(false));

		// finally, recalculate the button position for initial positioning
		recalculateInset(true);
	};

	const scrollToSection = (name: `${PageScrollLoc}`, scrollHeight: number) => {
		// update global state first
		$navState.name = name;

		// update the position of the mobile navigator
		focusedButton = navigatorButtonMapping[name];

		// update the inset values
		// animated should be true as this function should only be triggered manually
		recalculateInset(true);
	};

	const recalculateInset = (animate: boolean) => {
		animated = animate;
		[insetL, insetR] = calcInset(focusedButton, aboutButton);
	};

	const calcInset = (button: HTMLButtonElement, anchor: HTMLButtonElement): [number, number] => {
		// get the necessary width and X position of the button
		const buttonWidth = button.getBoundingClientRect().width;
		const buttonX = button.getBoundingClientRect().x;
		const anchorX = anchor.getBoundingClientRect().x;

		// calculate the relative inset values based on offsets
		const inL = buttonX - anchorX + 4;
		const inR =
			totalContainerWidth -
			(buttonX - anchorX) -
			buttonWidth -
			(totalContainerWidth - totalContentWidth) / 2;

		return [inL, inR];
	};

	onMount(init);
</script>

<main class="exclude-desktop">
	<section bind:this={navContainer} id="cta">
		<button bind:this={aboutButton} on:click={() => scrollToSection(PageScrollLoc.About, 0)}
			><p>About</p></button
		>

		<button bind:this={projectsButton} on:click={() => scrollToSection(PageScrollLoc.Projects, 0)}
			><p>Project</p></button
		>

		<button bind:this={artButton} on:click={() => scrollToSection(PageScrollLoc.Art, 0)}
			><p>Art</p></button
		>
	</section>

	<section
		id="fake-cta"
		style="clip-path: inset(4px {insetR}px 4px {insetL}px round 46px); {!animated
			? 'transition: none'
			: ''}"
	>
		<button><p>About</p></button>
		<button><p>Project</p></button>
		<button><p>Art</p></button>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: -webkit-sticky;
		position: sticky;
		bottom: 10px;
		align-self: center;

		margin-bottom: 10px;

		width: 245px;
		height: 46px;

		background-color: $translucent-cream;
		-webkit-backdrop-filter: blur(30px) saturate(200%);
		backdrop-filter: blur(30px) saturate(200%);
		border-radius: 25px;

		display: flex;
		justify-content: center;
		align-items: center;

		overflow: hidden;

		#cta {
			display: flex;
			justify-content: space-evenly;

			width: 100%;
			height: 100%;
			padding: 0px 4px;
			box-sizing: border-box;

			display: flex;
			justify-content: space-evenly;
			align-items: center;

			color: $black;

			button {
				background: none;
				border: none;
				color: inherit;

				height: calc(100% - 8px);
				box-sizing: border-box;

				border-radius: 46px;

				p {
					font-size: 16px;
					color: inherit;
				}

				transition: opacity 0.3s ease-in-out;

				&:active {
					opacity: 0.3;

					transition: none;
				}
			}
		}

		#fake-cta {
			@extend #cta;
			position: absolute;

			color: $white;
			background-color: $black;

			z-index: 10;

			transition: clip-path 700ms cubic-bezier(0.28, 1, 0.22, 1);

			pointer-events: none;
		}

		@media screen and (max-width: $tablet-width) {
			bottom: 35px;
		}

		@media screen and (max-width: $mobile-width) {
			bottom: 20px;
		}
	}
</style>
