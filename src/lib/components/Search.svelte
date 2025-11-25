<script lang="ts">
	import { isDomain, isFullURL} from '$lib';
	import { onMount } from 'svelte';

	let query = $state('');
	let showSearch = $state(false);
	let searchInp: HTMLInputElement;
	onMount(() => {
		setTimeout(() => {
			showSearch = true;
			searchInp.focus();
		}, 1000);
	});

	const enterEvent = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (isFullURL(query)) {
				window.open(query, "_blank")
			} else if (isDomain(query)) {
				window.open(`https://${query}`, '_blank');
			} else {
				window.open(`https://google.com/search?q=${query}`, '_blank');
			}
			query = '';
		}
	};
</script>

<div
	class="relative mt-[0.08rem] flex h-max flex-col items-center justify-center text-white shadow-lg shadow-slate-700"
>
	<button
		onclick={() => {
			showSearch = !showSearch;
			searchInp.focus();
		}}
		title="search"
		class="cursor-pointer transition-shadow hover:drop-shadow-[0_0_12px_currentColor]"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="28"
			height="28"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide me lucide-search-icon lucide-search -translate-x-10"
			><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg
		>
	</button>
	<input
		bind:value={query}
		bind:this={searchInp}
		onkeydown={enterEvent}
		type="text"
		placeholder="Search"
		class={(showSearch ? 'opacity-100' : 'opacity-0') +
			' absolute top-full right-0 mt-3 h-8 w-46 -translate-x-10 rounded-xl border-sky-50/20 bg-sky-400/10 text-white shadow-sm shadow-white/10 backdrop-blur-lg transition-opacity focus:border-none focus:shadow-md'}
	/>
</div>

<style>
</style>
