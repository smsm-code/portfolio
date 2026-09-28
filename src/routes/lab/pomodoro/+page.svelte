<script lang="ts">
	type Mode = 'work' | 'break';
	type Status = 'idle' | 'running' | 'paused';

	const DURATION: Record<Mode, number> = {
		work: 25 * 60 * 1000,
		break: 5 * 60 * 1000
	};

	let mode = $state<Mode>('work');
	let status = $state<Status>('idle');

	// 停止・一時停止中に「あと何ミリ秒か」を保持する
	let leftover = $state(DURATION.work);
	// 動作中の終了予定時刻(絶対時刻)
	let deadline = $state(0);
	// 現在時刻。タイマーが更新する
	let now = $state(Date.now());

	let completed = $state(0);

	let remaining = $derived(status === 'running' ? Math.max(0, deadline - now) : leftover);

	let label = $derived.by(() => {
		const total = Math.ceil(remaining / 1000);
		const m = Math.floor(total / 60);
		const s = total % 60;
		return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	});

	// ★ここが今日の主役
	$effect(() => {
		if (status !== 'running') return;

		const id = setInterval(() => {
			now = Date.now();
			if (now >= deadline) finish();
		}, 250);

		// return () => clearInterval(id);
	});

	function start() {
		now = Date.now();
		deadline = now + leftover;
		status = 'running';
	}

	function pause() {
		leftover = Math.max(0, deadline - Date.now());
		status = 'paused';
	}

	function reset() {
		status = 'idle';
		leftover = DURATION[mode];
	}

	function finish() {
		if (mode === 'work') completed += 1;
		mode = mode === 'work' ? 'break' : 'work';
		leftover = DURATION[mode];
		status = 'idle';
	}
</script>

<h1 class="mb-4 text-2xl font-bold">ポモドーロ</h1>

<div class="rounded-lg border p-6 text-center">
	<p class="mb-1 text-sm text-gray-500">
		{mode === 'work' ? '作業' : '休憩'}
	</p>

	<p class="mb-4 font-mono text-6xl tabular-nums" role="timer" aria-live="off">
		{label}
	</p>

	<div class="flex justify-center gap-2">
		{#if status === 'running'}
			<button type="button" onclick={pause} class="rounded bg-gray-900 px-4 py-2 text-white">
				一時停止
			</button>
		{:else}
			<button type="button" onclick={start} class="rounded bg-gray-900 px-4 py-2 text-white">
				{status === 'paused' ? '再開' : '開始'}
			</button>
		{/if}
		<button type="button" onclick={reset} class="rounded border px-4 py-2">リセット</button>
	</div>

	<p class="mt-4 text-sm text-gray-500">完了 {completed} セット</p>
</div>
