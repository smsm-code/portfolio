<script lang="ts">
	import type { Level } from '$lib/data/skills';

	interface Props {
		level: Level;
		size?: 'sm' | 'md';
	}

	let { level, size = 'md' }: Props = $props();

	const styles: Record<Level, string> = {
		L0: 'bg-gray-200 text-gray-600',
		L1: 'bg-sky-100 text-sky-800',
		L2: 'bg-emerald-100 text-emerald-800',
		L3: 'bg-violet-600 text-white'
	};
</script>

<span
	class="rounded px-2 py-0.5 font-medium {styles[level]} {size === 'sm' ? 'text-xs' : 'text-sm'}"
>
	{level}
</span>
