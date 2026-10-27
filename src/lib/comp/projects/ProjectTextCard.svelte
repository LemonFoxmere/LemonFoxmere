<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		visible: boolean;
		title: string;
		children?: Snippet;
	};
	let { visible, title, children }: Props = $props();

	// svelte-ignore state_referenced_locally
	let content_visible: boolean = $state(visible);
	// svelte-ignore state_referenced_locally
	let on_page: boolean = $state(visible);

	let show_timer: NodeJS.Timer;
	let hide_timer: NodeJS.Timer;

	$effect(() => {
		if (!visible) {
			// when hidden, hide all contents first before setting pos fixed
			content_visible = false;
			clearTimeout(show_timer);
			hide_timer = setTimeout(() => {
				on_page = false;
			}, 500); // 500ms allocation per project transition
		} else {
			// when shown, wait until the other page has cleared before showing
			clearTimeout(hide_timer);
			show_timer = setTimeout(() => {
				on_page = visible;
				content_visible = true;
			}, 500);
		}
	});
</script>

<main class="{!content_visible ? 'hidden' : ''} {!on_page ? 'offpage' : ''}">
	<h2>{title}</h2>
	<section id="body">
		{@render children?.()}
	</section>
</main>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	main {
		display: flex;
		flex-direction: column;
		row-gap: 8px;

		h2 {
			transition:
				opacity 300ms $out-generic,
				transform 500ms $out-generic;

			// make the glyphs bound inside because safari cant render anything properly
			padding: 0px 10px;
			transform: translateX(-10px);
		}

		#body {
			display: flex;
			flex-direction: column;
			row-gap: 12px;

			> :global(*) {
				transition:
					opacity 400ms $out-generic,
					transform 500ms $out-generic;
			}

			@for $i from 1 through 5 {
				> :global(*:nth-child(#{$i})) {
					transition-delay: 100ms * $i;
				}
			}
		}

		&.hidden {
			h2 {
				opacity: 0;
				transform: translate(-10px, -10px);
			}
			#body > :global(*) {
				opacity: 0;
				transform: translateY(-10px);
			}
		}

		&.offpage {
			opacity: 0;
			pointer-events: none;
			position: fixed;
		}
	}
</style>
