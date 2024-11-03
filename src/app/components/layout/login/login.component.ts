import { Component, inject } from '@angular/core';import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Autenticador } from '../../../auth/autenticador';
import { LoginService } from '../../../auth/login.service';
import { CadastroService } from '../../../services/cadastro.service';
import { LoginDao } from '../../../models/loginDao';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink] 
})

export class LoginComponent {
  loginData: Autenticador = new Autenticador() // Certifique-se de que o modelo Usuario está importado corretamente

  loginservice = inject(LoginService);
  private cadastroService = inject(CadastroService);
  erroLogin: boolean = false;
  

  constructor(private loginService: LoginService, public router: Router) {
    loginService.removerToken();
  }
  
  // savedb(){
  //   const usuarioLogado = this.loginservice.extractPayload();

  //   // Verifique se usuarioLogado não é nulo antes de continuar
  //   if (usuarioLogado) {
  //     // Busca o usuário no banco de dados para ver se ele já existe
  //     console.log(usuarioLogado);
  //     this.cadastroService.findById(usuarioLogado.idUsuario).subscribe({
  //       next: (cadastro) => {
  //         // Se o usuário já existe, nada é feito
  //         if (cadastro) {
  //           console.log('Usuário já está registrado no banco de dados');
  //           return;
  //         }
  //       },
  //       error: () => {
  //         // Se o usuário não existe, salva o novo usuário
  //         this.cadastroService.save(usuarioLogado).subscribe({
  //           next: () => {
  //             console.log(usuarioLogado);
  //             console.log('Usuário salvo no banco de dados com sucesso');
  //           },
  //           error: (err) => {
  //             console.error('Erro ao salvar usuário no banco de dados:', err);
  //           }
  //         });
  //       }
  //     });
  //   } else {
  //     console.error('Erro: usuário logado é nulo');
  //   }
  // }
  // savedb() {
  //   const usuarioLogado = this.loginservice.extractPayload();
  
  //   if (usuarioLogado) {
  //     // Verifica se o usuário já está registrado no banco de dados
  //     this.cadastroService.findById(usuarioLogado.idUsuario).subscribe({
  //       next: (cadastro) => {
  //         if (cadastro) {
  //           console.log('Usuário já está registrado no banco de dados');
  //         } else {
  //           // Caso o cadastro seja `null`, significa que o usuário não foi encontrado
  //           this.cadastrarNovoUsuario(usuarioLogado);
  //         }
  //       },
  //       error: (error) => {
  //         // O erro pode significar que o usuário não existe, portanto tentamos salvar
  //         if (error.status === 404) {
  //           // 404 indica que o usuário não foi encontrado
  //           this.cadastrarNovoUsuario(usuarioLogado);
  //         } else {
  //           // Outro tipo de erro
  //           console.error('Erro ao buscar usuário:', error);
  //         }
  //       }
  //     });
  //   } else {
  //     console.error('Erro: usuário logado é nulo');
  //   }
  // }
  
  // // Função para cadastrar um novo usuário
  // cadastrarNovoUsuario(usuarioLogado: LoginDao) {
  //   this.cadastroService.save(usuarioLogado).subscribe({
  //     next: () => {
  //       console.log('Usuário salvo no banco de dados com sucesso:', usuarioLogado);
  //     },
  //     error: (err) => {
  //       console.error('Erro ao salvar usuário no banco de dados:', err);
  //     }
  //   });
  // }

  savedb() {
    const usuarioLogado = this.loginservice.extractPayload();
  
    if (usuarioLogado) {
      // Chama diretamente o método para cadastrar o novo usuário sem verificar se já existe
      this.cadastrarNovoUsuario(usuarioLogado);
    } else {
      console.error('Erro: usuário logado é nulo');
    }
  }
  
  // Função para cadastrar um novo usuário
  cadastrarNovoUsuario(usuarioLogado: LoginDao) {
    this.cadastroService.save(usuarioLogado).subscribe({
      next: () => {
        console.log('Usuário salvo no banco de dados com sucesso:', usuarioLogado);
      },
      error: (err) => {
        console.error('Erro ao salvar usuário no banco de dados:', err);
      }
    });
  }

  logar() {
    this.loginService.login(this.loginData).subscribe({
      next: token => {
        console.log(token);
        Swal.fire({
          title: 'Bem vindo',
          icon: 'success',
          confirmButtonText: 'Ok',
        });      
      if(token){
        this.loginService.addToken(token);
        this.savedb();
      }


            //obs: verificar
      this.router.navigate(['']);
      },
      error: error => {
        Swal.fire({
          title: 'Ocorreu um erro, login inexistente',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
    
  }
}