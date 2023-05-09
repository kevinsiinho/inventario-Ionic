export class Login {
  email!:string
  password!:string

  setvalues(item:any){
    this.email=item.email
    this.password=item.password
  }
}
