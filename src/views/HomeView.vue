<template>
  <v-container style="border: 1px solid black">
    <v-flex d-flex flex-column align-center>
      <v-flex d-flex flex-column style="width: 80%; border: 1px solid orange">
        <v-flex d-flex justify-center>
          <h1>Lista de Tarefas</h1>
        </v-flex>
        <v-flex d-flex flex-column>
          <v-flex d-flex>
            <v-text-field
              label="Título"
              v-model="tarefa.titulo"
              :error-messages="mensagemTituloObrigatorio"
            ></v-text-field>
          </v-flex>
          <v-flex d-flex>
            <v-textarea
              label="Descrição"
              hint="Detalhe melhor a tarefa"
              rows="2"
              v-model="tarefa.descricao"
            ></v-textarea>
          </v-flex>
          <v-flex d-flex>
            <v-checkbox
              label="Importante?"
              v-model="tarefa.importante"
            ></v-checkbox>
          </v-flex>
          <v-flex d-flex>
            <v-checkbox
              label="Feito?"
              v-model="tarefa.feito"
            ></v-checkbox>
          </v-flex>
          <v-flex d-flex>
            <v-flex d-flex justify-end pr-2>
              <v-btn
                class="text-none"
                color="primary"
                @click="botaoSalvarAdicionar()"
              >
                <v-icon v-if="editando" class="pr-2">mdi-check</v-icon>
                <v-icon v-else class="pr-2">mdi-plus</v-icon>
                {{ editando ? 'Salvar' : 'Adicionar' }}
              </v-btn>
            </v-flex>
            <v-flex d-flex pl-2 pb-5>
              <v-btn
                class="text-none pl-2"
                color="secondary"
                @click="() => {}"
              >
                <v-icon class="pr-2">mdi-cancel</v-icon>
                Cancelar
              </v-btn>
            </v-flex>

          </v-flex>


        </v-flex>
      </v-flex>

      <v-flex d-flex flex-column align-center style="width: 80%; border: 1px solid red">
        <h2 v-if="!listaTarefa.length">Ainda não existem tarefas</h2>

        <v-card class="mb-4" width="100%" v-for="item in listaTarefa" :key="item.id">
          <v-flex d-flex>
            <v-flex d-flex flex-column>
              <span>Data de criação:</span>
              <span>{{ item.dataCriacao }}</span>
            </v-flex>
            <v-flex d-flex flex-column>
              <span>Título:</span>
              <span>{{ item.titulo }}</span>
            </v-flex>
            <v-flex d-flex flex-column>
              <span>Importante:</span>
              <span>{{ item.importante }}</span>
            </v-flex>
            <v-flex d-flex flex-column>
              <span>Feito:</span>
              <span>{{ item.feito }}</span>
            </v-flex>
            <v-flex d-flex flex-grow-0 align-center>
              <v-btn
                icon
                text
                color="primary"
                @click="editarTarefa(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                icon
                text
                color="primary"
                @click="() => {}"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-flex>
          </v-flex>
        </v-card>
      </v-flex>


    </v-flex>
  </v-container>
</template>

<script>
import TarefaModel from '@/model/TarefaModel';

  export default {
    name: 'Home',

    data() {
      return {
        tarefa: new TarefaModel(),
        listaTarefa: [],
        mensagemTituloObrigatorio: undefined,
        editando: false
      }
    },

    methods: {
      botaoSalvarAdicionar() {
        if (this.editando) {
          if (!this.tarefa.valido()) {
            this.mensagemTituloObrigatorio = 'Obrigatório';
            return;
          }

          let indice = this.listaTarefa.findIndex(t => t.id == this.tarefa.id);
          this.listaTarefa.splice(indice, 1, this.tarefa);

          this.editando = false;
          this.tarefa = new TarefaModel();
          return;
        }

        this.adicionarTarefa()
      },

      adicionarTarefa() {
        if (!this.tarefa.valido()) {
          this.mensagemTituloObrigatorio = 'Obrigatório';
          return;
        }

        this.listaTarefa.push(this.tarefa);
        this.tarefa = new TarefaModel();
      },

      editarTarefa(item){
        this.tarefa = new TarefaModel(item);
        this.editando = true;
      }
    },

    watch: {
      'tarefa.titulo'(valor) {
        if (valor) {
          this.mensagemTituloObrigatorio = '';
        }
      }
    },
  }
</script>
