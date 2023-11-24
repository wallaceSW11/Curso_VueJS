<template>
  <v-container style="min-hight: 100%; max-height: 100vh;">
    <v-flex style="max-height: calc(100vh - 100px);"  d-flex flex-column align-center>
      <v-flex d-flex flex-column px-2 flex-grow-0 style="width: 80%;">
        <v-flex d-flex justify-center flex-grow-0 py-3>
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
              hide-details
            ></v-textarea>
          </v-flex>

          <v-flex d-flex py-2 flex-wrap >
            <v-flex d-flex align-center>
              <v-flex d-flex flex-sm-grow-0 pr-2 justify-end justify-sm-start>
                <v-checkbox
                  label="Importante?"
                  v-model="tarefa.importante"
                  hide-details
                  class="ma-0 pa-0"
                ></v-checkbox>
              </v-flex>
  
              <v-flex>
                <v-checkbox
                  label="Feito?"
                  v-model="tarefa.feito"
                  hide-details
                  class="ma-0 pa-0 mr-2"
                ></v-checkbox>
              </v-flex>
            </v-flex>

            <v-flex d-flex flex-sm-grow-0 pt-2 pt-sm-0>
              <v-flex d-flex flex-sm-grow-0 pr-2 justify-end justify-sm-start>
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
              <v-flex d-flex flex-sm-grow-0>
                <v-btn
                  class="text-none pl-2"
                  color="secondary"
                  @click="cancelarAlteracao"
                >
                  <v-icon class="pr-2">mdi-cancel</v-icon>
                  Cancelar
                </v-btn>
              </v-flex>
  
            </v-flex>
          </v-flex>
        </v-flex>
      </v-flex>

      <v-flex d-flex flex-column pt-5 px-2 align-center class="quadro-tarefas">
        <h2 v-if="!listaTarefa.length">Ainda não existem tarefas</h2>

        <v-card :class="['mb-4', item.feito ? 'borda-tarefa-feita' : 'borda-tarefa-pendente']" width="100%" v-for="item in listaTarefa" :key="item.id">
          <v-flex d-flex flex-wrap>
            <v-flex d-flex>
              <v-flex d-flex flex-grow-0 px-2>
                <titulo-valor
                titulo="Data de criação"
                :valor="item.dataCriacao"
              ></titulo-valor>
              </v-flex>
            
              <v-flex d-flex>
                <titulo-valor
                  titulo="Título:"
                  :valor="item.titulo"
                ></titulo-valor>
              </v-flex>
            </v-flex>

            <v-flex d-flex flex-grow-0>
              <v-flex d-flex flex-column flex-grow-0 px-2 align-center>
                <span class="titulo-card-tarefa">Importante:</span>
                  <v-btn
                    text
                    icon
                    @click="toggleTarefaImportante(item.id)"
                  >
                  <v-icon :color="item.importante ? 'yellow' : 'grey' ">{{ item.importante ? 'mdi-alert-outline' : 'mdi-circle' }} </v-icon>
                  </v-btn>
              </v-flex>

              <v-flex d-flex flex-column flex-grow-0 align-center>
                <span class="titulo-card-tarefa">Feito:</span>
                <v-btn
                  text
                  icon
                  @click="toggleTarefaPronto(item.id)"
                >
                  <v-icon :color="item.feito ? 'green' : 'red' ">{{ item.feito ? 'mdi-check' : 'mdi-alpha-x' }}</v-icon>
                </v-btn>
              </v-flex>
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
                @click="deletarTarefa(item.id)"
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
import TituloValor from '@/components/TituloValor.vue';
import storageAPI from '@/service/storageAPI';

  export default {
    name: 'Home',

    components: {
      TituloValor,
    },

    data() {
      return {
        tarefa: new TarefaModel(),
        listaTarefa: []
          // {
          //     "id": "6a2c86a6-67b1-4441-9d24-df281447f9af",
          //     "dataCriacao": "23-11-2023",
          //     "titulo": "lavar carro",
          //     "importante": true,
          //     "feito": false
          // },
          // {
          //     "id": "73fa03cb-44cf-43c5-8a23-e12221da2f79",
          //     "dataCriacao": "23-11-2023",
          //     "titulo": "estudar vue",
          //     "descricao": "pra ontem",
          //     "importante": true,
          //     "feito": true
          // },
          // {
          //     "id": "1978dc2f-ded3-476d-a770-92a6332b05a4",
          //     "dataCriacao": "23-11-2023",
          //     "titulo": "rtyurturty",
          //     "importante": false,
          //     "feito": false
          // },
          // {
          //     "id": "45d1e823-07b4-4fc9-a840-207513001275",
          //     "dataCriacao": "23-11-2023",
          //     "titulo": "rtyurtyuyurtyuytr",
          //     "importante": false,
          //     "feito": false
          // },
          // {
          //     "id": "f28cb0de-5de6-466d-a9bc-665e5fe5ecf1",
          //     "dataCriacao": "23-11-2023",
          //     "titulo": "rtyurytuuyrt",
          //     "importante": false,
          //     "feito": false
          // },
          // {
          //     "id": "2bd4d991-93b3-4a5c-80cb-b0a88c69770e",
          //     "dataCriacao": "23-11-2023",
          //     "titulo": "rtyurty urtjhrty y",
          //     "importante": false,
          //     "feito": false
          // },
          // {
          //     "id": "f615391b-4879-4b47-8933-8e4615a9237e",
          //     "dataCriacao": "23-11-2023",
          //     "titulo": "rtyurty nurtyurtyurty",
          //     "importante": false,
          //     "feito": false
          // },
          // {
          //     "id": "779e6e15-2c4c-40fc-9735-2e50ec7b6117",
          //     "dataCriacao": "23-11-2023",
          //     "titulo": "ertyert yerty etryre",
          //     "importante": false,
          //     "feito": false
          // }
      //]
        ,
        mensagemTituloObrigatorio: undefined,
        editando: false
      }
    },

    mounted () {
      let tarefas = storageAPI.obter('tarefas');

      if (tarefas) {
        this.listaTarefa = tarefas;
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

        console.log(this.listaTarefa);
      },

      editarTarefa(item){
        this.tarefa = new TarefaModel(item);
        this.editando = true;
      },

      deletarTarefa(id) {
        let indice = this.listaTarefa.findIndex(tarefa => tarefa.id == id);
        this.listaTarefa.splice(indice, 1);
      },

      cancelarAlteracao() {
        if (this.editando) {
          this.editando = false;
        }

        this.tarefa = new TarefaModel();
      },

      toggleTarefaPronto(id) {
        let indice = this.listaTarefa.findIndex(t => t.id == id);
        this.listaTarefa[indice].feito = !this.listaTarefa[indice].feito;
      },

      toggleTarefaImportante(id) {
        let indice = this.listaTarefa.findIndex(t => t.id == id);
        this.listaTarefa[indice].importante = !this.listaTarefa[indice].importante;
      }
    },

    watch: {
      'tarefa.titulo'(valor) {
        if (valor) {
          this.mensagemTituloObrigatorio = '';
        }
      },

      listaTarefa(tarefas) {
        storageAPI.salvar('tarefas', tarefas);
      }
    },
  }
</script>

<style scoped>
.titulo-card-tarefa {
  font-size: 12px;
  color: gray;
}

.borda-tarefa-feita {
  border-left: 6px solid green;
}

.borda-tarefa-pendente {
  border-left: 6px solid red;
}

.quadro-tarefas {
  width: 80%;
  max-height: 640px;
  overflow: auto;
}
</style>
