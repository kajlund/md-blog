<script>
  import { pageTitle } from '../stores';
  import BackToTop from '$lib/BackToTop.svelte';
	import Nav from '$lib/Nav.svelte';
	import '../../static/styles/reset.css';
	import '../../static/styles/global.css';
</script>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>

<header>
	<Nav />
</header>
<div class="content">
	<div class="container">
		<slot />
    <BackToTop />
	</div>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 50px auto;
	}
</style>
