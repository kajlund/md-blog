  import { derived } from 'svelte/store';
	import { page } from '$app/stores';

  export const pageTitle = derived(page, store => {
    let site = 'kajlund.com'
    let pg = store && store.path ? store.path.slice(store.path.lastIndexOf('/') + 1) : ''

    return pg ? site + ' - ' + pg : site
  });

