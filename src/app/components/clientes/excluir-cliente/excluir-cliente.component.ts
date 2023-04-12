import { Endereco } from './../cliente/endereco';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente/cliente';

@Component({
  selector: 'app-excluir-cliente',
  templateUrl: './excluir-cliente.component.html',
  styleUrls: ['./excluir-cliente.component.css']
})
export class ExcluirClienteComponent implements OnInit{


  endereco: Endereco = {
    cep: "",
    logradouro: "",
    numero: 0
  }

  cliente: Cliente = {
    cpf: "",
    endereco: this.endereco,
    nome: "",
    rendimentoMensal: "",
    telefone: ""


    }

  constructor(private service: ClienteService,private router: Router,private route: ActivatedRoute){

  }

  ngOnInit(): void {

      const cpf = this.route.snapshot.paramMap.get('cpf')
      this.service.buscarPeloCpf(cpf!).subscribe((cliente) =>{
         this.cliente = cliente;
      })
  }

  excluirCliente(){
    this.service.excluirCliente(this.cliente.cpf).subscribe(() =>{
      this.router.navigate(['/listarClientes'], {queryParams: {deletadoSucesso: true}})

    })
  }

  cancelar(){

  }
}
