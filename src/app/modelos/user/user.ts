export class User {
  public cod!:number
  public username:String=""
  public email:String=""
  public password:String=""
  public rol!:number
  setValues(item:any){
    this.cod=item.cod
    this.username=item.username
    this.email=item.email
    this.password=item.password
    this.rol=item.rol
  }

}
