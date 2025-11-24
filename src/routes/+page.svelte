<script lang="ts">
	import Wallpaper from '$lib/components/Wallpaper.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { timerModalOpen, time } from '$lib/components/store';
	import { formatTime } from '$lib';
  import Search from "$lib/components/Search.svelte";
</script>

<svelte:head>
	<link href="https://fonts.cdnfonts.com/css/segment7" rel="stylesheet" />
</svelte:head>

<div class="relative min-h-screen overflow-hidden">
	<Wallpaper />
	<button
		on:click={() => {
			timerModalOpen.update((v) => !v);
		}}
		class="absolute top-8 left-8 z-999 cursor-pointer rounded-2xl text-white hover:drop-shadow-[0_0_12px_currentColor]"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-timer-icon lucide-timer"
			><line x1="10" x2="14" y1="2" y2="2" /><line x1="12" x2="15" y1="14" y2="11" /><circle
				cx="12"
				cy="14"
				r="8"
			/></svg
		>
	</button>
	<Timer />
	<div
		on:click={timerModalOpen.update((v) => !v)}
		class="absolute right-8 bottom-8 m-4 cursor-pointer"
	>
		<div class="segment7 text-8xl font-bold text-white drop-shadow-[0_0_20px_currentColor]">
			{formatTime($time)}
		</div>
	</div>

  <Search />

	<!-- Overlay gelap untuk readability -->
</div>
