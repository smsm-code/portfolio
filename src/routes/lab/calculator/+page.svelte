<script lang="ts">
	type Operator = '+' | '-' | '×' | '÷';

	type CalcState =
		| { kind: 'entering'; current: string }
		| { kind: 'awaiting'; left: number; operator: Operator }
		| { kind: 'entering2'; left: number; operator: Operator; current: string }
		| { kind: 'result'; value: number };

	let state = $state<CalcState>({ kind: 'entering', current: '0' });

	let display = $derived.by(() => {
		switch (state.kind) {
			case 'entering':
				return state.current;
			case 'awaiting':
				return String(state.left);
			case 'entering2':
				return state.current;
			case 'result':
				return String(state.value);
		}
	});

	function apply(left: number, operator: Operator, right: number): number {
		switch (operator) {
			case '+':
				return left + right;
			case '-':
				return left - right;
			case '×':
				return left * right;
			case '÷':
				return right === 0 ? NaN : left / right;
		}
	}

	function appendDigit(digit: string) {
		switch (state.kind) {
			case 'entering':
			case 'entering2': {
				const next = state.current === '0' ? digit : state.current + digit;
				state = { ...state, current: next };
				break;
			}
			case 'awaiting':
				state = { ...state, kind: 'entering2', current: digit };
				break;
			case 'result':
				state = { kind: 'entering', current: digit };
				break;
		}
	}

	function setOperator(operator: Operator) {
		switch (state.kind) {
			case 'entering':
				state = { kind: 'awaiting', left: Number(state.current), operator };
				break;
			case 'awaiting':
				state = { ...state, operator };
				break;
			case 'entering2': {
				const value = apply(state.left, state.operator, Number(state.current));
				state = { kind: 'awaiting', left: value, operator };
				break;
			}
			case 'result':
				state = { kind: 'awaiting', left: state.value, operator };
				break;
		}
	}

	function equals() {
		if (state.kind !== 'entering2') return;
		const value = apply(state.left, state.operator, Number(state.current));
		state = { kind: 'result', value };
	}

	function clear() {
		state = { kind: 'entering', current: '0' };
	}

	const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
	const operators: Operator[] = ['÷', '×', '-', '+'];
</script>

<h1 class="mb-4 text-2xl font-bold">電卓</h1>

<div class="max-w-xs rounded-lg border p-4">
	<output
		class="mb-3 block overflow-hidden rounded bg-gray-100 px-3 py-4 text-right font-mono text-3xl tabular-nums"
		aria-live="polite"
	>
		{display}
	</output>

	<div class="grid grid-cols-4 gap-2">
		{#each keys as key (key)}
			<button
				type="button"
				onclick={() => appendDigit(key)}
				class="rounded border py-3 hover:bg-gray-100"
			>
				{key}
			</button>
		{/each}

		{#each operators as op (op)}
			<button
				type="button"
				onclick={() => setOperator(op)}
				class="rounded border bg-gray-50 py-3 hover:bg-gray-100"
			>
				{op}
			</button>
		{/each}

		<button type="button" onclick={clear} class="rounded border py-3 hover:bg-gray-100">C</button>
		<button type="button" onclick={equals} class="col-span-2 rounded bg-gray-900 py-3 text-white">
			=
		</button>
	</div>

	<p class="mt-3 text-xs text-gray-400">state: {state.kind}</p>
</div>
