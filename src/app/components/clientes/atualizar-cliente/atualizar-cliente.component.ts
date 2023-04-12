
import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-atualizar-cliente',
  templateUrl: './atualizar-cliente.component.html',
  styleUrls: ['./atualizar-cliente.component.css']
})
export class AtualizarClienteComponent implements OnInit{


  formulario!: FormGroup;
  cpf: string = ''


  constructor(private service: ClienteService,private router: Router,private route : ActivatedRoute, private formBuilder: FormBuilder ){

  }

  ngOnInit(): void {

// CRIA O FORMULÁRIO E SUAS DEVIDAS VALIDAÇÕES

    this.formulario = this.formBuilder.group({
      endereco: this.formBuilder.group({
        numero: [0, Validators.compose([Validators.min(1), Validators.max(999999), Validators.pattern(/^\d*[1-9]\d*$/)])],

        logradouro: [''],

        cep: ['', Validators.compose([Validators.pattern(/^\d{5}-\d{3}$/)])]
      }),

      nome: ['', Validators.compose([Validators.minLength(3),])],

      telefone: ['', Validators.compose([Validators.pattern(/^\(\d{2}\)(?:\d{4}-\d{4}|\d{5}-\d{4})$/)])],

      rendimentoMensal: ['', Validators.compose([Validators.maxLength(13), Validators.pattern(/^\d+(\.\d{1,2})?$/)])]
    })

    const cpf = this.route.snapshot.paramMap.get('cpf')
    this.service.buscarPeloCpf(cpf!).subscribe((cliente) =>{
      this.cpf = cliente.cpf
      const clienteFormatado = this.service.formataDadosDoClienteParaExibir(cliente)
      this.formulario.patchValue(clienteFormatado)
    })
  }

  atualizarCliente(){


      if(this.verificarAlteracoes()){

        this.service.atualizarCliente(this.formulario.value, this.cpf).subscribe(() =>{

          this.router.navigate(['/listarClientes'],{queryParams: {atualizadoSucesso: true}})
      })
      }

      this.router.navigate(['/listarClientes'],{queryParams: {semAlteracao: true}})
  }

  private verificarAlteracoes() {
    let haAlteracoes = false;

    for (const campo in this.formulario.controls) {
      if (this.formulario.controls[campo].dirty) {
        haAlteracoes = true;
        break;
      }
    }

    return haAlteracoes;
  }

}
