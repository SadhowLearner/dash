<script lang="ts">


    let query = $state("")
    const enterEvent = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            window.open(`https://google.com/search?q=${query}`, "_blank")
        }
    }
</script>

<div class="absolute left-5 bottom-8 flex items-center text-white shadow-lg shadow-slate-700 mb-3">
  <input bind:value={query} onkeydown={enterEvent} type="text" class="backdrop-blur-lg bg-slate-500/20 border-none h-12 w-sm text-white drop-shadow-xs shadow-sm shadow-slate-800 drop-shadow-slate-800 focus:shadow-md focus:border-none rounded-2xl">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide me lucide-search-icon lucide-search -translate-x-10"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
</div>

<style>

</style>