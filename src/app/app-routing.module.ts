import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './components/clientes/cadastro-cliente/cadastro-cliente.component';
import { ListaClientesComponent } from './components/clientes/lista-clientes/lista-clientes.component';
import { HomeComponent } from './components/home/home.component';
import { ExcluirClienteComponent } from './components/clientes/excluir-cliente/excluir-cliente.component';
import { AtualizarClienteComponent } from './components/clientes/atualizar-cliente/atualizar-cliente.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'

  },
  {path: 'cadastrarCliente',
    component: CadastroClienteComponent
  },
  {path: 'listarClientes',
    component: ListaClientesComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'excluirCliente/:cpf',
    component: ExcluirClienteComponent
  },
  {
    path: 'atualizarCliente/:cpf',
    component: AtualizarClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
