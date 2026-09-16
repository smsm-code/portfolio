<script lang="ts">
	import './layout.css';
	import { resolve } from '$app/paths';
	let { children } = $props();
</script>

<header class="border-b p-4">
	<nav class="flex gap-4">
		<a href={resolve('/')}>Home</a>
		<a href={resolve('/skills')}>Skills</a>
		<a href={resolve('/logs')}>Logs</a>
	</nav>
</header>

<main class="mx-auto max-w-3xl p-6">
	{@render children()}
</main>
