<script lang="ts">
	type Props = {
		current_idx: number;
		num_elements: number;
		scheme?: string;
	};
	let { current_idx = $bindable(), num_elements, scheme = "accent" }: Props = $props();
</script>

<section id="indicators" data-scheme={scheme}>
	{#each { length: num_elements } as _, i}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			aria-label="button"
			class={current_idx === i ? "active" : ""}
			onclick={() => (current_idx = i)}
		></div>
	{/each}
</section>

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	#indicators {
		$dot: 12px;
		$pill: 42px;
		$gap: 10px;
		$overhang: $pill - $dot;

		display: flex;
		padding-right: $pill - $dot - $gap;

		div {
			width: $pill;
			height: $dot;
			margin-right: $dot + $gap - $pill;
			border-radius: $dot;

			opacity: 0.3;

			@media (min-width: $mobile-width) {
				cursor: pointer;
			}

			@media (max-width: $mobile-width) {
				pointer-events: none;
			}

			-webkit-clip-path: inset(0 #{$overhang} 0 0 round #{$dot});
			clip-path: inset(0 #{$overhang} 0 0 round #{$dot});
			will-change: clip-path, opacity;

			transition:
				opacity 500ms $out-generic,
				clip-path 500ms $out-generic,
				background-color 700ms $out-generic;

			&.active {
				opacity: 1;
				-webkit-clip-path: inset(0 round #{$dot});
				clip-path: inset(0 round #{$dot});
			}

			&.active ~ div {
				-webkit-clip-path: inset(0 0 0 #{$overhang} round #{$dot});
				clip-path: inset(0 0 0 #{$overhang} round #{$dot});
			}
		}

		&[data-scheme="primary"] div {
			background-color: $token-surface-solid-primary;
		}
		&[data-scheme="secondary"] div {
			background-color: $token-surface-solid-secondary;
		}
		&[data-scheme="accent"] div {
			background-color: $token-surface-solid-accent;
		}
		&[data-scheme="invert"] div {
			background-color: $token-surface-solid-invert;
		}
	}
</style>
