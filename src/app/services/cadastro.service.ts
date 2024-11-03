import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cadastro } from '../models/cadastro';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginDao } from '../models/loginDao';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/usuario";

  constructor() { }

  save(loginDao: LoginDao): Observable<string>{
    return this.http.post<string>(this.API+"/save", loginDao, {responseType: 'text' as 'json'});
  }

  findById(idUsuario: number): Observable<Cadastro>{
    return this.http.get<Cadastro>(this.API+"/findById/"+idUsuario);
  }
}
