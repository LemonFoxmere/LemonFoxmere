<script lang="ts" context="module">
	import { writable } from "svelte/store";
	import ContentBackgroundEffect from "./../lib/comp/layout/ContentBackgroundEffect.svelte";
	import MobileNavigator from "./../lib/comp/layout/MobileNavigator.svelte";
	import SideBarNavigator from "./../lib/comp/layout/SideBarNavigator.svelte";

	export enum PageScrollLoc {
		About = "about",
		Projects = "projects",
		Art = "art"
	}

	export const navState = writable<{
		name: `${PageScrollLoc}`;
		scrollHeight: number;
	}>({
		name: PageScrollLoc.About,
		scrollHeight: 0
	});
</script>

<script lang="ts">
</script>

<main>
	<!-- side bar navigation (desktop only!!) -->
	<SideBarNavigator />

	<section id="content">
		<slot />
		<ContentBackgroundEffect />
	</section>

	<!-- bottom bar navigation (phone and tablet only) -->
	<MobileNavigator />
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
			position: relative;

			padding-left: 96px;
			box-sizing: border-box;

			// overflow: hidden;

			z-index: 2;
		}

		@media screen and (max-width: $small-desktop-width) {
			#content {
				padding-left: 48px;
			}
		}

		@media screen and (max-width: $tablet-width) {
			#content {
				padding: 0px 25px;
			}
		}

		@media screen and (max-width: $mobile-width) {
			#content {
				padding: 0px 25px;
			}

			#selector-window {
				bottom: 20px;
			}
		}
	}

	#footer-container {
		position: absolute;

		width: 100%;
		height: 400px;
		background-color: $black;

		z-index: 2;
	}
</style>
