import { Component, OnDestroy, OnInit } from '@angular/core';
import { Factura } from '../modelos/factura/factura';
import { FacturaService } from '../servicios/factura/factura.service';
import { Observable, Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { UserService } from '../servicios/user/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy{
  facturas$!: Observable<Factura[]>;
  isModalOpen = false;
  isAlertOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async presentAlert(id: string) {

    this.facturasService.DeleteFactura(id)
    const alert = await this.alertController.create({
      header: 'Mensaje',
      subHeader: 'id: '+id,
      message: 'Factura eliminada con exito!',
      buttons: ['OK'],
    });

    await alert.present();

  }
  public facturas:Factura[]=[];
  public facturaSubscription= new Subscription()
  public userSubscription= new Subscription()
  constructor(
    public facturasService: FacturaService,
    public userService:UserService,
    private alertController: AlertController
  ) {}

  ngOnDestroy(): void {
    this.facturaSubscription.unsubscribe();
    console.log("eliminó")
  }

  ngOnInit(): void {
    this.facturas$ = this.facturasService.allFacturas$();
   this.facturaSubscription=this.facturasService.allFacturas$().subscribe((res:Factura[])=>{
      this.facturas=res;
      console.log(this.facturas)
    })
        this.facturasService.allFacturas().then()
  }


}
