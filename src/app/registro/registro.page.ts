import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from '../modelos/user/user';
import { UserService } from '../servicios/user/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public user!:User
  constructor(
    public userService: UserService,
    private alertController: AlertController,
    public route:Router
    ) { }

  ngOnInit() {
    this.user=new User()

  }

  async presentAlert(msn:String) {

    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: ""+msn,
      buttons: ['OK'],
    });
//redirecionar al inicio de sesión
    await alert.present();

  }

  OnSave(){
    this.user.rol=Number(this.user.rol)
    console.log(this.user)

    if(this.user.cod>0 && this.user.username!=null && this.user.email!=null && this.user.password!=null && this.user.rol>0){
        let status=this.userService.CreateFactura(this.user)
        //corregir eso
        if(200==200){
        this.presentAlert("Usuario creado!")
        this.route.navigate(['/login'])
        }else{
          this.presentAlert("Error en el servidor")
        }

    }else{
        this.presentAlert("Error en los datos, verifica")
    }
  }
}
