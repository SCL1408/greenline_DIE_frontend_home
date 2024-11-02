export class LoginDao {
    idUsuario: number;
    usernameUsuario: string;
    emailUsuario: string;
    role!: string;
  
    constructor(id: number, username: string, email: string, role: string) {
      this.idUsuario = id;
      this.usernameUsuario = username;
      this.emailUsuario = email;
      this.role = role;
    }

}