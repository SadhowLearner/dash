<script lang="ts">
  import Wallpaper from "$lib/components/Wallpaper.svelte"
  import Timer from "$lib/components/Timer.svelte";
  import {timerModalOpen, time} from "$lib/components/store"
	import { formatTime } from "$lib";
  import timer from "$lib/assets/timer.svg"
</script>

<svelte:head>
  <link href="https://fonts.cdnfonts.com/css/segment7" rel="stylesheet">
</svelte:head>

<div class="min-h-screen relative overflow-hidden">
  <Wallpaper />
  <button on:click={() => {timerModalOpen.update(v => !v)
  }} class="text-white cursor-pointer z-999 absolute top-5 right-5 rounded-2xl mx-3 my-2  hover:drop-shadow-[0_0_12px_currentColor]">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer-icon lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>  
</button>

  <Timer />
  <div on:click={timerModalOpen.update(v => !v)} class="cursor-pointer absolute bottom-8 right-8 m-4">
     <div class="segment7 text-8xl text-white font-bold drop-shadow-[0_0_20px_currentColor]">
          {formatTime($time)}
      </div>
  </div>



  <!-- Overlay gelap untuk readability -->
</div>

