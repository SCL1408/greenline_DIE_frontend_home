import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Usuario } from './usuario';
import { Autenticador } from './autenticador';
import { Login } from '../models/login';
import { LoginDao } from '../models/loginDao';
import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API = environment.SERVIDOR+"/api/usuario";


  constructor() { }


  // login(loginData: Autenticador): Observable<string> {
  //   console.log('Dados de login:', loginData);
  //   return this.http.post<string>(this.API+"/login", loginData, {responseType: 'text' as 'json'}); // Envie o objeto Login completo no corpo da solicitação
  // }
  login(loginData: { username: string, password: string }): Observable<any> {
    const tokenEndpoint = `http://localhost:8080/realms/greenline/protocol/openid-connect/token`;
  
    const body = new HttpParams()
      .set('client_id', 'greenline')
      .set('grant_type', 'password')
      .set('username', loginData.username)
      .set('password', loginData.password);
  
    return this.http.post<any>(tokenEndpoint, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  findByLoginId(idLoginLogado: number): Observable<Login>{
    return this.http.get<Login>(this.API+"/findByLoginId/"+idLoginLogado);
  }


  // addToken(token: string) {
  //   localStorage.setItem('token', token);
  // }
  addToken(token: any) {
    let accessToken;
  
    // Verifica se `token` é um objeto ou uma string
    if (typeof token === 'string') {
      try {
        const objeto = JSON.parse(token); // Tenta converter para objeto
        accessToken = objeto.access_token; // Acessa o 'access_token'
      } catch (error) {
        console.error('Erro ao fazer parse do token:', error);
        return;
      }
    } else if (typeof token === 'object' && token.access_token) {
      // Caso `token` já seja um objeto e tenha `access_token`
      accessToken = token.access_token;
    } else {
      console.error('Formato de token inesperado:', token);
      return;
    }
  
    // Armazena apenas o `access_token` no localStorage
    if (accessToken) {
      localStorage.setItem('token', accessToken);
    } else {
      console.error('Token de acesso não encontrado no objeto:', token);
    }
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // jwtDecode() {
  //   let token = this.getToken();
  //   if (token) {
  //     return jwtDecode<JwtPayload>(token);
  //   }
  //   return "";
  // }
  
 
jwtDecode() {
    const token = localStorage.getItem('token'); // Obtém o token armazenado
    if (token) {
        try {
            const decodedToken: any = jwtDecode<JwtPayload>(token); // Decodifica o token

            const roles = decodedToken.realm_access?.roles || [];
            //console.log(decodedToken);
            //console.log(decodedToken.realm_access?.roles [0]);

            return decodedToken;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return false; // Retorna false em caso de erro
        }
    } else {
        console.error('Token não encontrado');
        return false;
    }
}

extractPayload(){
   const token = this.jwtDecode();
   if(token){
     let id = token.ID;
     let username = token.preferred_username;
     let email = token.email;
     let role = token.resource_access.greenline?.roles [0];
      //console.log(id);
    //  console.log(username);
    //  console.log(email);
    //  console.log(role);
     const usuarioLogado = new LoginDao(id, username, email, role);
     return usuarioLogado;
   }else {
    console.error('Token não encontrado ou inválido');
    return null;
  }

}


hasPermission(role: string) {
  let user = this.extractPayload() as LoginDao;
  if (user.role == role)
    return true;
  else
    return false;
}

  getUsuarioLogado(){
    return this.extractPayload() as Login;
  }


}
