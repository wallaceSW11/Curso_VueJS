<template>
  <v-flex d-flex flex-column>
    <span class="titulo-card-tarefa">{{ titulo }}</span>
    <span>{{ valor }}</span>
  </v-flex>
</template>

<script>
export default {
  name: 'TituloValor',

  props: {
    titulo: { type: String, required: true },
    valor: { type: String, default: '...' },
  },

}
</script>

<style scoped>
.titulo-card-tarefa {
  font-size: 12px;
  color: gray;
}
</style>