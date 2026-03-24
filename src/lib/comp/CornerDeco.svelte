<script lang="ts">
	type Props = {
		location: "bl" | "tr";
	};
	let { location }: Props = $props();

	const last_updated_date = "March 24th, 2026";
</script>

<main class="{location} phone-hidden no-drag">
	<div id="deco"></div>
	{#if location === "bl"}
		<p>Copyright © Lemon Foxmere {new Date().getFullYear()}</p>
	{:else}
		<p>Content last updated {last_updated_date}</p>
	{/if}
</main>

<!-- <img src="images/raster/separator_deco.png" alt="" /> -->

<style lang="scss">
	@use "$static/stylesheets/guideline" as *;

	$w: var(--width);
	$c: var(--clr);
	$page-margin: 50px;

	main {
		position: fixed;
		display: flex;
		column-gap: 20px;

		z-index: 20;

		pointer-events: none;

		#deco {
			width: 100px;
			height: 100px;
		}

		p {
			font-family: "panchang";
			font-size: 12px;
			line-height: 100%;
		}

		&.bl {
			bottom: $page-margin;
			left: $page-margin;

			align-items: flex-end;

			#deco {
				border-left: 2px solid $token-surface-solid-secondary;
				border-bottom: 2px solid $token-surface-solid-secondary;
			}
			p {
				transform: translateY(40%);
			}
		}
		&.tr {
			top: $page-margin;
			right: $page-margin;

			flex-direction: row-reverse;
			align-items: flex-start;

			#deco {
				border-right: 2px solid $token-surface-solid-secondary;
				border-top: 2px solid $token-surface-solid-secondary;
			}
			p {
				transform: translateY(-40%);
			}
		}
	}
</style>
