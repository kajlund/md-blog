<script>
	import { ChevronUpIcon } from 'svelte-feather-icons';

	export let showOnPx = 150;
	let hidden = true;

	function goTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}

	function scrollContainer() {
		return document.documentElement || document.body;
	}

	function handleOnScroll() {
		if (!scrollContainer()) {
			return;
		}

		if (scrollContainer().scrollTop > showOnPx) {
			hidden = false;
		} else {
			hidden = true;
		}
	}
</script>

<svelte:window on:scroll={handleOnScroll} />

<div class="back-to-top" on:click={goTop} class:hidden><ChevronUpIcon size="26" /> Back To Top</div>

<style>
	.back-to-top {
		padding: 0.4em 0.8rem;
		border-radius: 0.5rem;
		opacity: 1;
		transition: opacity 0.5s, visibility 0.5s;
		position: fixed;
		z-index: 99;
		right: 20px;
		user-select: none;
		bottom: 20px;
		color: var(--grey-100);
		background-color: var(--primary-500);
	}

	.back-to-top.hidden {
		opacity: 0;
		visibility: hidden;
	}
</style>
