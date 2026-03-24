<script lang="ts">
	import type { Snippet } from "svelte";
	import BackButton from "$lib/comp/BackButton.svelte";

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

	let modal_open: boolean = $state(false);
	let modal_visible: boolean = $state(false);
	let modal_hide_timer: NodeJS.Timer;

	export function openModal() {
		clearTimeout(modal_hide_timer);
		modal_open = true;
		// wait for mount before starting transition
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				modal_visible = true;
			});
		});
	}

	function closeModal() {
		modal_visible = false;
		modal_hide_timer = setTimeout(() => {
			modal_open = false;
		}, 400);
	}

	// Prevent body scroll while modal is open
	$effect(() => {
		if (typeof document !== "undefined") {
			document.body.style.overflow = modal_open ? "hidden" : "";
		}
	});
</script>

<main class="{!content_visible ? 'hidden' : ''} {!on_page ? 'offpage' : ''}">
	<h2>{title}</h2>
	<section id="body">
		{@render children?.()}
	</section>
</main>

{#if modal_open}
	<div id="modal" class="phone-only {!modal_visible ? 'hidden' : ''}">
		<section id="content">
			<div>
				<BackButton onclick={closeModal} label="Close" />
			</div>
			<h2>{title}</h2>
			<div id="body">
				{@render children?.()}
			</div>
			<div>
				<BackButton onclick={closeModal} label="Close" />
			</div>

			<div class="gradient-filter top" id="white"></div>
			<div class="gradient-filter bottom" id="white"></div>
		</section>
	</div>
{/if}

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	main {
		display: flex;
		flex-direction: column;
		row-gap: 20px;

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
			row-gap: 10px;

			:global(*) {
				transition:
					opacity 400ms $out-generic,
					transform 500ms $out-generic;
			}

			@for $i from 1 through 5 {
				:global(*:nth-child(#{$i})) {
					transition-delay: 100ms * $i;
				}
			}
		}

		@media screen and (width <= $mobile-width) {
			height: 100%;

			#body {
				position: relative;

				flex: 1;
				min-height: 0;
				overflow: hidden;

				&::after {
					content: "";
					position: absolute;
					inset: 0;
					pointer-events: none;
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

		&.hidden {
			h2 {
				opacity: 0;
				transform: translate(-10px, -10px);
			}
			#body :global(*) {
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

	#modal {
		position: fixed;
		inset: 0;
		z-index: 30;

		display: flex;
		flex-direction: column;
		row-gap: 20px;

		background-color: $token-surface-solid-primary;

		opacity: 1;
		transition:
			opacity 600ms $out-generic,
			filter 600ms $out-generic,
			transform 700ms $out-generic;

		&.hidden {
			opacity: 0;
			transform: scale(1.05);
			filter: blur(2px);
			pointer-events: none;
		}

		#content {
			display: flex;
			flex-direction: column;
			row-gap: 20px;

			padding: 50px 30px;
			margin: auto 0px;

			overflow: scroll;

			#body {
				display: flex;
				flex-direction: column;
				row-gap: 10px;
			}

			.gradient-filter {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 100px;

				pointer-events: none;

				&#white {
					background: linear-gradient(
						0deg,
						$token-surface-solid-primary 0%,
						rgba($token-surface-solid-primary, 0.85) 15%,
						rgba($token-surface-solid-primary, 0.65) 28%,
						rgba($token-surface-solid-primary, 0.4) 42%,
						rgba($token-surface-solid-primary, 0.18) 56%,
						rgba($token-surface-solid-primary, 0.06) 68%,
						transparent 70%
					);
				}

				&.top {
					bottom: unset;
					top: 0;
					transform: rotate(180deg);
				}
			}
		}
	}
</style>
