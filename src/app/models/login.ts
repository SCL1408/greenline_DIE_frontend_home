export class Login {
  idUsuario!: number;
  emailUsuario: string;
  usernameUsuario: string;
  role!: string;

  constructor(idUsuario: number, emailUsuario: string, usernameUsuario: string, role: string) {
    this.idUsuario = idUsuario;
    this.emailUsuario = emailUsuario;
    this.usernameUsuario = usernameUsuario;
    this.role = role;
  }
}