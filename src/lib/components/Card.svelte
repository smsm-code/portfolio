<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<section class="rounded-lg border p-4">
	<h2 class="mb-2 text-lg font-semibold">{title}</h2>
	<div class="text-gray-700">
		{@render children()}
	</div>
</section>
