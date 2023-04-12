import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspacoEmBrancoValidator } from '../espacoEmBrancoValidator';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit{

  classeErro!: string
  mostrarMsgCpfInvalido = false
  mostararMsgCpfJaCadastrado = false
  msgCpfInvalido!: string
  msgCpfJaCadastrado!: string
  formulario!: FormGroup

  constructor(private service: ClienteService,private router: Router, private formBuilder: FormBuilder){

  }

  ngOnInit(): void {

// CRIA O FORMULÁRIO E SUAS DEVIDAS VALIDAÇÕES

      this.formulario = this.formBuilder.group({
      endereco: this.formBuilder.group({
        numero: [0, Validators.compose([Validators.required, Validators.min(1), Validators.max(999999), Validators.pattern(/^\d*[1-9]\d*$/)])],

        rua: ['', Validators.compose([Validators.required, EspacoEmBrancoValidator])],

        cep: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)])]
      }),
      cpf: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)])],

      nome: ['', Validators.compose([Validators.required, Validators.minLength(3),EspacoEmBrancoValidator])],

      telefone: ['', Validators.compose([Validators.required, Validators.pattern(/^\(\d{2}\)(?:\d{4}-\d{4}|\d{5}-\d{4})$/)])],

      rendimentoMensal: ['', Validators.compose([Validators.required, Validators.maxLength(13), Validators.pattern(/^\d+(\.\d{1,2})?$/)])]
    })
  }

  registrarCliente(){
      this.service.registrarCliente(this.formulario.value).subscribe(
        (sucesso) =>{
        this.router.navigate(['/listarClientes'], {queryParams: {cadastroConcluido: true}})

        },

//    CAPTURA MENSAGENS DE ERRO DO BACK END E EXIBE PARA O USUÁRIO NO FORMULÁRIO

        (erro) =>{
        if (erro.error[0] && erro.error[0].message && erro.error[0].message.includes('Insira um CPF válido')) {
          this.mostrarMsgCpfInvalido = true;
          this.msgCpfInvalido = erro.error[0].message;
          this.mostararMsgCpfJaCadastrado = false
        }

        if (erro.error[0] && erro.error.includes('CPF já cadastrado')) {
          this.mostararMsgCpfJaCadastrado = true;
          this.msgCpfJaCadastrado = erro.error;
          this.mostrarMsgCpfInvalido = false
        }
        }

      )
  }

}
