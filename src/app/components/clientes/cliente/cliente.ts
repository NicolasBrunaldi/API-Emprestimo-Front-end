import { Endereco } from "./endereco";

export interface Cliente {

  nome: string;
  cpf: string;
  telefone: string;
  endereco: Endereco;
  rendimentoMensal: string;


}
