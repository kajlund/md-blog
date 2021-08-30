<script>
	import { page } from '$app/stores';
</script>

<nav>
	<div class="nav-center">
		<!-- nav header -->
		<div class="nav-header">
			<h4 class="logo">kajlund<span>.com</span></h4>
			<button type="button" class="nav-toggle">
				<i class="fas fa-bars" />
			</button>
		</div>
		<!-- links -->
		<ul class="links">
			<li class:active={$page.path === '/'}>
				<a href="/">home</a>
			</li>
			<li class:active={$page.path.indexOf('/blog') === 0}>
				<a href="/blog">blog</a>
			</li>
			<li class:active={$page.path.indexOf('/resources') === 0}>
				<a href="/resources">resources</a>
			</li>
			<li class:active={$page.path === '/about'}>
				<a href="/about">about</a>
			</li>
		</ul>
		<!-- social media -->
		<ul class="social-icons">
			<li>
				<a href="https://www.facebook.com/kajlund" target="_blank">
					<i class="fab fa-facebook" />
				</a>
			</li>
			<li>
				<a href="https://www.twitter.com/kajlund" target="_blank">
					<i class="fab fa-twitter" />
				</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/in/kajlund/" target="_blank">
					<i class="fab fa-linkedin" />
				</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	.active {
		border-bottom: 2px solid var(--primary-500);
	}
</style>
