<script>
	let message = $state('Hello SvelteKit');
</script>

<h1>Welcome to SvelteKit</h1>
<p class="mr-2.5 flex bg-brand-500 text-2xl shadow-2xs">{message}</p>
<button onclick={() => (message = '')}> Clear </button>
