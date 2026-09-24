<script lang="ts">
	import './layout.css';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { children } = $props();

	const links = [
		{ href: resolve('/'), label: 'Home' },
		{ href: resolve('/skills'), label: 'Skills' }
	];

	let current = $derived(page.url.pathname);
</script>

<header class="border-b p-4">
	<nav class="flex gap-4">
		{#each links as link (link.href)}
			<a
				href={link.href}
				aria-current={current === link.href ? 'page' : undefined}
				class="rounded px-2 py-1 {current === link.href
					? 'bg-gray-900 text-white'
					: 'hover:bg-gray-100'}"
			>
				{link.label}
			</a>
		{/each}
	</nav>
</header>

<main class="mx-auto max-w-3xl p-6">
	{@render children()}
</main>
