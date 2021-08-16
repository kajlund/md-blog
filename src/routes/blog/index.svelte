<script context="module">
	const allPosts = import.meta.glob('./*.{md,svx}');
	// console.log(allPosts)

	let body = [];
	for (let path in allPosts) {
		body.push(
			allPosts[path]().then(({ metadata }) => {
				return { path, metadata };
			})
		);
	}
	//  console.log(body)

	export const load = async () => {
		const posts = await Promise.all(body);
		// console.log(posts);
		return {
			props: {
				posts
			}
		};
	};
</script>

<script>
	export let posts;

	const dateSortedPosts = posts.slice().sort((p1, p2) => {
		return new Date(p2.metadata.createdAt) - new Date(p1.metadata.createdAt);
	});
</script>

<ul>
	{#each dateSortedPosts as { path, metadata: { title, createdAt } }}
		<li>
			<a href={`/blog/${path.replace('.md', '')}`}>{title}</a>
			{new Date(createdAt).toDateString()}
		</li>
	{/each}
</ul>
