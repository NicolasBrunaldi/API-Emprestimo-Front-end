import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Cliente } from './cliente/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private readonly uri = 'http://localhost:8080/clientes'

  constructor(private http: HttpClient) { }

  registrarCliente(cliente: Cliente): Observable<Cliente> {


    const clienteFormatado = this.formataDadosDoClienteParaEnviar(cliente)
    console.log(clienteFormatado)
    return this.http.post<Cliente>(this.uri, clienteFormatado)
  }

  atualizarCliente(cliente: Cliente, cpf:string): Observable<Cliente> {
    console.log(cpf)
    const uriComCpf = `${this.uri}/${cpf}`
    console.log(uriComCpf)
    const clienteFormatado = this.formataDadosDoClienteParaEnviar(cliente)
    return this.http.put<Cliente>(uriComCpf, cliente)
  }

  listarClientes(): Observable<Cliente[]>{

    return this.http.get<Cliente[]>(this.uri)
  }

  excluirCliente(cpf: string): Observable<Cliente>{

    const uriComCpf = `${this.uri}/${cpf}`
    return this.http.delete<Cliente>(uriComCpf)

  }

  buscarPeloCpf(cpf: string): Observable<Cliente>{

    const uriComCpf = `${this.uri}/${cpf}`
    return this.http.get<Cliente>(uriComCpf)
  }

//  FORMATA OS DADOS DO CLIENTE PARA ENVIAR AO BACK END

  private formataDadosDoClienteParaEnviar(cliente: Cliente){

    if(cliente.cpf){

      cliente.cpf = cliente.cpf.replace(/[^\d]+/g, '')
    }
    cliente.telefone = cliente.telefone.replace(/[-\s()]/g, '')
    cliente.endereco.cep = cliente.endereco.cep.replace('-', '')
    cliente.nome = cliente.nome.toUpperCase()
    cliente.nome = cliente.nome.replace(/\s{2,}/g, " ")
    cliente.endereco.rua = cliente.endereco.rua.toUpperCase()
    cliente.endereco.rua = cliente.endereco.rua.replace(/\s{2,}/g, " ")


    return cliente

  }

// FORMATA DOS DADOS DO CLIENTE PARA EXIBIR NA TELA DE ATUALIZAÇÃO

   formataDadosDoClienteParaExibir(cliente: Cliente){

    cliente.telefone = cliente.telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1)$2-$3')
    cliente.endereco.cep = cliente.endereco.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')

    return cliente;
  }

}
