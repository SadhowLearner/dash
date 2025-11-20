<script lang="ts">
	import wallpaper from '$lib/assets/night-ship.gif';
	let timeInput = $state(0);
	let inter: NodeJS.Timeout;

	const setTime = () => {
		if (inter) {
			clearInterval(inter);
		}
		inter = setInterval(() => {
			timeInput--;
			if (timeInput <= 0) {
				clearInterval(inter!);
				timeInput = 0;
			}
		}, 1000);
	};
</script>

<div>
	<!-- style="width:100%;height:0;padding-bottom:55%;position:relative;" -->
	<div class="absolute inset-0 h-dvh w-dvw overflow-hidden">
		<iframe
			src="https://giphy.com/embed/pVGsAWjzvXcZW4ZBTE"
			title="gif"
			class="giphy-embed pointer-events-none absolute  h-[112%] w-[135%] top-1/2 left-1/2 
           -translate-x-1/2 -translate-y-1/2 overflow-hidden"
			frameBorder="0"
			allowFullScreen
		></iframe>
		<div class="absolute inset-0 bg-black/10 pointer-events-none"></div>
	</div>
	<!-- <input
		type="number"
		class="m-30 border-4 border-amber-950"
		bind:value={timeInput}
		onchange={setTime}
	/>
	<h1 class="ms-30 text-4xl font-bold">{timeInput}</h1> -->
</div>

<style>
</style>
