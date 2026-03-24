<script lang="ts">
	import { untrack } from "svelte";

	type Props = {
		location: "tl" | "br";
		hash: string;
	};
	let { location, hash }: Props = $props();

	const page_titles: Map<string, string> = new Map([
		["about", "01. Who Are You"],
		["projects", "02. Projects"]
	]);

	let current_text = $state(untrack(() => page_titles.get(hash) ?? ""));
	let hidden = $state(untrack(() => !page_titles.has(hash)));

	let text_width = $state(0);
	let win_height = $state(0);

	let too_short = $derived(text_width > win_height - 220);

	$effect(() => {
		win_height = window.innerHeight;
		const onResize = () => (win_height = window.innerHeight);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	});

	$effect(() => {
		const text = page_titles.get(hash);
		if (text) {
			current_text = text;
			hidden = true;
			requestAnimationFrame(() => {
				hidden = false;
			});
		} else {
			hidden = true;
		}
	});
</script>

<main class="{location} phone-hidden no-drag">
	<h1 bind:clientWidth={text_width} class={hidden || too_short ? "hidden" : ""}>
		{#each current_text as letter}
			{#if letter !== " "}
				<span>
					{letter}
				</span>
			{:else}
				&nbsp;
			{/if}
		{/each}
	</h1>
</main>

<!-- <img src="images/raster/separator_deco.png" alt="" /> -->

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	$page-margin: 50px;

	main {
		position: fixed;
		display: flex;

		z-index: 20;

		pointer-events: none;

		h1 {
			$len: var(--length);

			font-weight: 400;
			font-size: 20px;
			line-height: 100%;

			color: $token-surface-solid-secondary;

			span {
				display: inline-block;
				padding: 0;
				margin: 0;

				transform-origin: left;

				transition:
					font-weight 400ms $out-generic,
					opacity 300ms $out-generic,
					transform 500ms $out-generic;
			}

			@for $i from 1 through 50 {
				span:nth-child(#{$i}) {
					transition-delay: 30ms * $i;
				}
			}

			&.hidden {
				span {
					opacity: 0;
					transform: scale(0.5);
				}
			}
		}

		&.br {
			bottom: $page-margin - 15px;
			right: $page-margin;

			h1 {
				transform-origin: right;
				transform: rotate(90deg);
			}
		}
		&.tl {
			top: $page-margin - 15px;
			left: $page-margin;

			h1 {
				transform-origin: left;
				transform: rotate(-90deg) translateX(-100%);
			}
		}
	}
</style>
