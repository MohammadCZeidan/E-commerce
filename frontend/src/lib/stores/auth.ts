import { writable } from 'svelte/store';
import type { User } from '$lib/types';

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
}

function createAuthStore() {
	const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

	const { subscribe, set, update } = writable<AuthState>({
		user: storedUser ? JSON.parse(storedUser) : null,
		token: storedToken,
		isAuthenticated: !!storedToken
	});

	return {
		subscribe,
		login: (token: string, user: User) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
			}
			set({ user, token, isAuthenticated: true });
		},
		logout: () => {
			if (typeof window !== 'undefined') {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
			}
			set({ user: null, token: null, isAuthenticated: false });
		},
		updateUser: (user: User) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('user', JSON.stringify(user));
			}
			update(state => ({ ...state, user }));
		}
	};
}

export const authStore = createAuthStore();
