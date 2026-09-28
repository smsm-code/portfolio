<script lang="ts">
	import { todoStore } from '$lib/stores/todos.svelte';

	type Filter = 'all' | 'active' | 'done';

	const filters: Filter[] = ['all', 'active', 'done'];

	let draft = $state('');
	let filter = $state<Filter>('all');

	let visible = $derived(
		filter === 'all'
			? todoStore.items
			: todoStore.items.filter((t) => (filter === 'done' ? t.done : !t.done))
	);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		todoStore.add(draft);
		draft = '';
	}
</script>

<h1 class="mb-4 text-2xl font-bold">ToDo</h1>

<form onsubmit={handleSubmit} class="mb-4 flex gap-2">
	<input
		bind:value={draft}
		placeholder="やること"
		aria-label="新しいタスク"
		class="flex-1 rounded border px-3 py-2"
	/>
	<button type="submit" class="rounded bg-gray-900 px-4 py-2 text-white">追加</button>
</form>

<div class="mb-3 flex items-center gap-2 text-sm">
	{#each filters as f (f)}
		<button
			type="button"
			onclick={() => (filter = f)}
			aria-pressed={filter === f}
			class="rounded border px-2 py-1 {filter === f
				? 'bg-gray-900 text-white'
				: 'hover:bg-gray-100'}"
		>
			{f}
		</button>
	{/each}
	<span class="ml-auto text-gray-500">残り {todoStore.remaining} 件</span>
</div>

<ul class="divide-y">
	{#each visible as todo (todo.id)}
		<li class="flex items-center gap-3 py-2">
			<input type="checkbox" id={todo.id} bind:checked={todo.done} />
			<label for={todo.id} class="flex-1 {todo.done ? 'text-gray-400 line-through' : ''}">
				{todo.text}
			</label>
			<button
				type="button"
				onclick={() => todoStore.remove(todo.id)}
				class="text-sm text-red-600 hover:underline"
			>
				削除
			</button>
		</li>
	{:else}
		<li class="py-4 text-gray-500">まだ何もありません</li>
	{/each}
</ul>
