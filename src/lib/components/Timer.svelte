<script lang="ts">
	import { timerModalOpen, time } from "./store";
  import { formatTime } from "$lib";

  let workMinutes = $state(25);
  let breakMinutes = $state(5);
  let isActive = $state(false);
  let isBreak = $state(false);
  let showSettings = $state(false);
  let intervalId: NodeJS.Timeout

  // initialize time based on workMinutes and react to changes
  $effect(() => {
    time.set(workMinutes * 60);

  });

  $effect(() => {
    if (isActive && $time > 0) {
      intervalId = setInterval(() => {
        time.update(v => v = v - 1);
      }, 1000);
    } else if ($time === 0) {
      // Waktu habis  
      if (isBreak) {
        isBreak = false;
        $time = workMinutes * 60;
      } else {
        isBreak = true;
        $time = breakMinutes * 60;
      }
    }

    return () => {
      if (intervalId ) clearInterval(intervalId);
    };
  });

  function toggleTimer() {
    isActive = !isActive;
  }
  function resetTimer() {
    isActive = false;
    isBreak = false;
    time.update(v => v = workMinutes * 60);
  }



  function applySettings() {
    time.update(v => v = workMinutes * 60);
    isBreak = false;
    isActive = false;
    showSettings = false;
  }
</script>

<div class={($timerModalOpen ? "opacity-100" : "opacity-0") + " transition-opacity"}>
  
  <!-- Content -->
  <div class="absolute inset-0 bg-black/30"></div>
  <div class="relative z-10 flex items-center justify-center  min-h-screen p-4">
    <div class="w-full max-w-2xl">
      <!-- Main Timer Card -->
      <div class="timer-card bg-black/50 backdrop-blur-xl border-2 border-cyan-500/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,255,255,0.3)]">
        <!-- Status -->
        <div class="text-center mb-6">
          <div class="status-badge inline-block px-6 py-2 rounded-full border-2 {isBreak ? 'border-pink-500 bg-pink-500/20 text-pink-300' : 'border-cyan-500 bg-cyan-500/20 text-cyan-300'}">
            <span class="text-sm font-bold tracking-wider segment7 uppercase">
              {isBreak ? 'Break Time' : 'Work Time'}
            </span>
          </div>
        </div>

        <!-- Timer Display -->
        <div class="relative mb-8">
          <div class="timer-display text-center py-8 px-4 bg-black/70 rounded-2xl border border-cyan-500/30">
            <div class="segment7 text-8xl font-bold {isBreak ? 'text-pink-400' : 'text-cyan-400'} drop-shadow-[0_0_20px_currentColor]">
              {formatTime($time)}
            </div>
          </div>
          <!-- Glow effect -->
          <div class="glow-effect absolute inset-0 blur-2xl opacity-40 {isBreak ? 'bg-pink-500' : 'bg-cyan-500'} rounded-2xl -z-10"></div>
        </div>

        <!-- Controls -->
        <div class="flex gap-4 segment7 justify-center mb-6 flex-wrap">
          <button
            onclick={toggleTimer}
            class="control-btn px-8 py-4 flex gap-4 items-center justify-center rounded-xl font-bold tracking-widest text-lg transition-all {isActive ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(255,0,0,0.5)]' : 'bg-green-500/70 hover:bg-green-600 text-white shadow-[0_0_20px_rgba(0,255,0,0.5)]'}"
          >
            <span class="text-xl mb-1">{isActive ? "⏸": "▶" }</span> {isActive ? ' Pause' : 'Start'}
          </button>
          <button
            onclick={resetTimer}
            class="control-btn px-8 py-4 rounded-xl font-bold text-lg bg-gray-700/20 hover:bg-gray-600/40 text-white transition-all"
          >
            Reset
          </button>
          <button
            onclick={() => showSettings = !showSettings}
            class="control-btn px-8 py-4 rounded-xl font-bold text-lg bg-purple-600/40 hover:bg-purple-700 text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.5)]"
          >
            Settings
          </button>
        </div>

        <!-- Settings Panel -->
        {#if showSettings}
          <div class="settings-panel mt-6 p-6 roboto-mono  bg-black/70 rounded-2xl border border-purple-500/50">
            <h3 class="text-xl font-bold text-purple-300 mb-4">Timer Settings</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-cyan-300 mb-2 font-semibold">
                  Work Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  bind:value={workMinutes}
                  class="w-full px-4 py-3 rounded-lg bg-black/50 border border-cyan-500/50 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                />
              </div>
              <div>
                <label class="block text-pink-300 mb-2 font-semibold">
                  Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  bind:value={breakMinutes}
                  class="w-full px-4 py-3 rounded-lg bg-black/50 border border-pink-500/50 text-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50"
                />
              </div>
            </div>
            <button
              onclick={applySettings}
              class="w-full px-6 py-3 rounded-lg font-bold bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.5)]"
            >
              ✓ Apply Settings
            </button>
          </div>
        {/if}

        <!-- Progress Bar -->
        <div class="mt-6">
          <div class="w-full h-2 bg-black/50 rounded-full overflow-hidden">
            <div 
              class="progress-bar h-full rounded-full transition-all duration-1000 bg-linear-to-r {isBreak ? 'from-pink-500 to-purple-500' : ' from-cyan-500 to-blue-500'}"
              style="width: {((isBreak ? breakMinutes * 60 : workMinutes * 60) -  $time) / (isBreak ? breakMinutes * 60 : workMinutes * 60) * 100}%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .timer-card {
    animation: fadeInUp 0.6s ease-out;
  }

  .status-badge {
    animation: pulse 2s ease-in-out infinite;
  }

  .timer-display {
    animation: scaleIn 0.4s ease-out;
  }

  .control-btn {
    animation: fadeIn 0.5s ease-out;
  }

  .control-btn:hover {
    transform: scale(1.05) translateY(-2px);
  }

  .control-btn:active {
    transform: scale(0.98);
  }

  .settings-panel {
    animation: slideDown 0.3s ease-out;
  }

  .glow-effect {
    animation: glowPulse 3s ease-in-out infinite;
  }

  .progress-bar {
    box-shadow: 0 0 20px currentColor;
    animation: shimmer 2s ease-in-out infinite;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes glowPulse {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
  }

  @keyframes shimmer {
    0%, 100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.3);
    }
  }
</style>