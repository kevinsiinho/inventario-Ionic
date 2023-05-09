import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Observable, Subject } from 'rxjs';
import { Login } from 'src/app/modelos/login/login';
import { User } from 'src/app/modelos/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url = environment.url
  public usuarios$= new Subject<User[]>();
  public usuario$= new Subject <User>();
  public usuarios:User[]=[];
  public usuario= new User()
  constructor() { }

  allUser$():Observable<User[]>{
    return this.usuarios$.asObservable();
  }

  getUser$():Observable<User>{
    return this.usuario$.asObservable();
  }

  async allusers():Promise<Observable<any>>{
    this.usuarios=[]
    const options = {
      url: this.url+'/signup'
    };

  const response: HttpResponse = await CapacitorHttp.get(options);
    console.log(response.data)
        response.data.forEach((item:any)=> {
          this.usuario=new User();
          this.usuario.setValues(item)
          this.usuarios.push(this.usuario)
        });
        this.usuarios$.next(this.usuarios)
        return this.usuarios$.asObservable()
  }


  async CreateFactura(user:User){
    const options = {
      url: this.url+'/signup',
      headers: { "Content-Type": "application/json" },
      data: user
      };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response.status
  };


  async Login(login:Login){
    const options = {
      url: this.url+'/users/login/',
      headers: { "Content-Type": "application/json" },
      data: login
    };

  const response: HttpResponse = await CapacitorHttp.post(options);
   return response
  }

  async Quien(token:string){
    const options = {
      url: this.url+'/whoAmI',
      headers: { "Content-Type": "application/json",
                  "Authorization": 'Bearer ' + token
               }
    };

  const response: HttpResponse = await CapacitorHttp.get(options);
       return response
  }

}
