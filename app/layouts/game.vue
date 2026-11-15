<template>
  <!-- Pełny ekran gry: bez menu i stopki strony, tylko plansza. -->
  <main class="game-layout">
    <slot />
  </main>
</template>

<style scoped>
.game-layout { min-height: 100vh; }
</style>
