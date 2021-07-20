<script context="module">
  const allPosts = import.meta.glob("./*.{md,svx}")
  // console.log(allPosts)

  let body = []
  for (let path in allPosts) {
    body.push(
      allPosts[path]().then(({ metadata }) => {
        return { path, metadata };
      })
    )
  }
 //  console.log(body)

  export const load = async() => {
    const posts = await Promise.all(body);
    // console.log(posts);
    return {
      props: {
        posts,
      }
    }
  }
</script>

<script>
  export let posts

</script>

<ul>
  {#each posts as { path, metadata: { title } }}
  <li>
    <a href={`/blog/${path.replace(".md", "")}`}>{title}</a>
  </li>
  {/each}
</ul>
