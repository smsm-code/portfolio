export interface Todo {
	id: string;
	text: string;
	done: boolean;
}

class TodoStore {
	items = $state<Todo[]>([]);

	get remaining() {
		return this.items.filter((t) => !t.done).length;
	}

	add(text: string) {
		const trimmed = text.trim();
		if (!trimmed) return;
		this.items.push({ id: crypto.randomUUID(), text: trimmed, done: false });
	}

	remove(id: string) {
		this.items = this.items.filter((t) => t.id !== id);
	}

	toggle(id: string) {
		const target = this.items.find((t) => t.id === id);
		if (target) target.done = !target.done;
	}
}

export const todoStore = new TodoStore();
