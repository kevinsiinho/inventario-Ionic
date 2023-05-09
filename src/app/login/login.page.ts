import { Component, OnInit } from '@angular/core';
import { User } from '../modelos/user/user';
import { Subscription } from 'rxjs';
import { UserService } from '../servicios/user/user.service';
import { AlertController } from '@ionic/angular';
import { Login } from '../modelos/login/login';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public users:User[]=[];
  public user= new User()
  public login= new Login()
  public token:string=""
  public userSubscription= new Subscription()
  constructor(
    public userService: UserService,
    private alertController: AlertController,
    private route:Router,
    ) { }
  async presentAlert(msn:String) {

    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: ''+msn,
      buttons: ['Reintentar'],
    });
//redirecionar a la pagina principal
    await alert.present();
  }
  ngOnInit() {
    this.userSubscription=this.userService.getUser$().subscribe((res)=>{
      this.user=res;

    })


  }

  Verificar(){

    if(this.login.email!=null && this.login.password!=null){
      this.userService.Login(this.login).then(async(res)=>{
        console.log(res.data.userProfile)
        await Preferences.set({
          key: 'user',
          value:res.data.userProfile.name,
        });
         await Preferences.set({
          key: 'token',
          value: res.data.token,
        });
        if(res.data.token){
           this.OnQuien()
        }else{
          this.presentAlert("Usuario no encontrado, verifaca los campos")
        }
     })
    }else{
      this.presentAlert("Faltan campos por llenar")
    }

  }

async OnQuien(){
  const { value } = await Preferences.get({ key: 'token' });
  if(value)
    this.userService.Quien(value).then((res)=>{ })
    this.route.navigate(['/tabs/tab2'])
  }

}
