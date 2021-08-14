<script context="module">
  const allResources = import.meta.glob("./*.{md,svx}")

  let body = []
  for (let path in allResources) {
    body.push(
      allResources[path]().then(({ metadata }) => {
        return { path, metadata };
      })
    )
  }

  export const load = async() => {
    const resources = await Promise.all(body);
    return {
      props: {
        resources,
      }
    }
  }
</script>

<script>
  export let resources
</script>

<ul>
  {#each resources as { path, metadata: { title } }}
  <li>
    <a href={`/resources/${path.replace(".md", "")}`}>{title}</a>
  </li>
  {/each}
</ul>
