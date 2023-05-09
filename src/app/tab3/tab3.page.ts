import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
public nombre!:string
public correo!:string
  constructor(
    private route:Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'user' });
    if(value)
    this.nombre=value

  }


async salir(){
  await Preferences.remove({ key: 'token' });
  await Preferences.remove({ key: 'user' });
  const alert = await this.alertController.create({
    header: 'Mensaje',
    message: 'Vuelve pronto',
    buttons: ['Ok'],
  });
  this.route.navigate(['/login'])
  await alert.present();
}
}
