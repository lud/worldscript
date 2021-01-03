<script>
  import GameUI from '$components/GameUI.svelte'
  import game from '$game/main.ts'
  console.log('game', JSON.stringify(game, 0, 2))
</script>

<main>
  <GameUI {game} />
</main>
