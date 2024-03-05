<script lang="ts" context="module">
	import { writable } from "svelte/store";

	export const navState = writable<{
		name: string;
		scrollHeight: number;
		selectorProperties: {
			scaling: number;
			scaleInverse: number;
			offset: number;
		};
	}>({
		name: "About",
		scrollHeight: 0,
		selectorProperties: {
			scaling: 1.2,
			scaleInverse: 0.83333,
			offset: 0
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
			selectorProperties: {
				scaling: buttonHeight / 100,
				scaleInverse: 100 / buttonHeight,
				offset: buttonY - 35
			}
		};
	};
</script>

<main>
	<!-- side bar -->
	<section id="side-bar">
		<div
			id="selector"
			style="transform: translateY({$navState.selectorProperties.offset}px) scaleY({$navState
				.selectorProperties.scaling})"
		>
			<section
				id="selector-content"
				style="transform: scaleY({$navState.selectorProperties.scaleInverse}) translateY(-{$navState
					.selectorProperties.offset}px)"
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

	<slot />
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		display: flex;

		#side-bar {
			position: relative;

			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-end;

			min-width: 96px;

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
					transition: transform 700ms cubic-bezier(0.25, 1, 0.22, 1);

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
				height: calc(100%);
				border: none;
				background-color: $black;

				margin: 35px 14px 0px 0px;
			}
		}
	}
</style>
