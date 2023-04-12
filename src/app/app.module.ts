import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { HomeComponent } from './components/home/home.component';
import { ListaClientesComponent } from './components/clientes/lista-clientes/lista-clientes.component';
import { CadastroClienteComponent } from './components/clientes/cadastro-cliente/cadastro-cliente.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExcluirClienteComponent } from './components/clientes/excluir-cliente/excluir-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtualizarClienteComponent } from './components/clientes/atualizar-cliente/atualizar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    HomeComponent,
    ListaClientesComponent,
    CadastroClienteComponent,
    ClienteComponent,
    ExcluirClienteComponent,
    AtualizarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
