<script lang="ts">
	import Landing from "$lib/comp/pages/Landing.svelte";
	import Projects from "$lib/comp/pages/Projects.svelte";
</script>

<main>
	<Landing />

	<Projects />
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		height: 100%;
	}
</style>
