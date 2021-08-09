<script>
  import Nav from "$lib/Nav.svelte"
  import "../../static/styles/reset.css"
  import "../../static/styles/global.css"
</script>

<Nav />
<div class="container">
  <slot />
</div>

<style>
  .container {
    max-width: 600px;
    margin: 50px auto;
  }
</style>
