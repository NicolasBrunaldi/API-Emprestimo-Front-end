import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente/cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit{

 // VARIÁVEIS PARA EXIBIR MENSAGENS DE ALTERAÇÃO
  cadastroConcluido = false
  deletadoSucesso = false
  atualizadoSucesso = false
  semAlteracao = false


  clientes: Cliente [] = [];

  constructor(private service: ClienteService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.service.listarClientes().subscribe((listaClientes) =>{
      this.clientes = listaClientes;

//    RECEBE OS PARAMETROS PARA EXIBIR AS MENSAGENS DE ALTERAÇÃO

      this.route.queryParams.subscribe(params => {
        this.cadastroConcluido = params['cadastroConcluido'] === 'true'
        this.deletadoSucesso = params['deletadoSucesso'] === 'true'
        this.atualizadoSucesso = params['atualizadoSucesso'] === 'true'
        this.semAlteracao = params['semAlteracao'] === 'true'

//    TIMER PARA DEIXAR DE EXIBIR AS MENSAGENS DE ALTERAÇÃO

        setTimeout(() => {
        this.cadastroConcluido = false;
        this.atualizadoSucesso = false;
        this.deletadoSucesso = false;
        this.semAlteracao = false;
       }, 60000)
    })
  })
  }

  formatarCpf(cpf: string): string {
    const cpfFormatado = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
    return cpfFormatado;
  }

  formatarCep(cep: string): string {
    const cepFormatado = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
    return cepFormatado;
  }

  formatarTelefone(telefone: string): string {
    const telefoneFormatado = telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
    return telefoneFormatado;
  }
}
