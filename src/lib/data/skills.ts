export type Level = 'L0' | 'L1' | 'L2' | 'L3';
export type Priority = '◎' | '○' | '△';

export interface Skill {
	id: string;
	name: string;
	priority: Priority;
	level: Level;
	note?: string;
}

export const skills: Skill[] = [
	{ id: '2-5', name: 'Svelte 5: Runes', priority: '◎', level: 'L2' },
	{ id: '2-10', name: 'Tailwind v4: CSSファースト設定', priority: '◎', level: 'L2' },
	{ id: '3-1', name: 'SvelteKit: ルーティング / レイアウト', priority: '◎', level: 'L1' },
	{
		id: '6-1',
		name: 'Zed(Svelte拡張 / Tailwind LSP)',
		priority: '◎',
		level: 'L3',
		note: '言語サーバーの差し替えまで理解'
	},
	{ id: '6-5', name: 'pnpm', priority: '◎', level: 'L2' },
	{ id: '6-6', name: 'Vite', priority: '◎', level: 'L2' }
];
