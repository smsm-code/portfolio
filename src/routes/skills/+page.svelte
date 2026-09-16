<script lang="ts">
	import { skills, type Level } from '$lib/data/skills';
	import LevelBadge from '$lib/components/LevelBadge.svelte';

	let filter: Level | 'all' = $state('all');

	let visible = $derived(filter === 'all' ? skills : skills.filter((s) => s.level === filter));

	const options: (Level | 'all')[] = ['all', 'L0', 'L1', 'L2', 'L3'];
</script>

<h1 class="mb-6 text-2xl font-bold">習得状況</h1>

<div class="mb-4 flex gap-2">
	{#each options as option (option)}
		<button
			type="button"
			onclick={() => (filter = option)}
			class="rounded border px-3 py-1 text-sm {filter === option
				? 'bg-gray-900 text-white'
				: 'hover:bg-gray-100'}"
		>
			{option}
		</button>
	{/each}
</div>

<ul class="divide-y">
	{#each visible as skill (skill.id)}
		<li class="flex items-center gap-3 py-2">
			<span class="w-12 text-sm text-gray-500">{skill.id}</span>
			<span class="flex-1">{skill.name}</span>
			<LevelBadge level={skill.level} />
		</li>
	{:else}
		<li class="py-4 text-gray-500">該当する項目がありません</li>
	{/each}
</ul>
