<template>
  <minimap :height="250" />
</template>

<script>
import { Minimap } from 'vue-flowchart-editor'

export default {
  name: 'EditorMinimap',
  components: { Minimap }
}
</script>
