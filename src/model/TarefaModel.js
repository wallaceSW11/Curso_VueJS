import { novoId } from "@/utils/guid";
import moment from "moment";

export default class TarefaModel {
  constructor(dados){
    dados = dados || {};

    this.id = dados.id || novoId();
    this.dataCriacao = dados.dataCriacao || moment().format('DD-MM-YYYY');
    this.titulo = dados.titulo;
    this.descricao = dados.descricao;
    this.importante = !!dados.importante;
    this.feito = !!dados.feito;
  }

  valido() {
    return !!(this.titulo);
  }
}