import { Endereco } from './endereco';
import { Component, Input } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {


  @Input() endereco : Endereco = {

    logradouro: "",
    numero: 0,
    cep: "",

  }

  @Input() cliente : Cliente = {

    cpf: "",
    nome: "",
    telefone:"",
    rendimentoMensal: "",
    endereco: this.endereco

  }


}
