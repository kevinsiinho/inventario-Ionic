import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../modelos/categoria/categoria';
import { Subscription } from 'rxjs';
import { CategoriaConProductoService } from '../servicios/CategoriaConProducto/categoria-con-producto.service';
import { Producto } from '../modelos/factura/producto';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public todo:Categoria[]=[];
  public producto = new Producto()
  public categoria= new Categoria()
  public todoSubscription= new Subscription()
  constructor(
    public todoService: CategoriaConProductoService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.todoSubscription=this.todoService.alltodo$().subscribe((res:Categoria[])=>{
      this.todo=res;
    })
    this.todoService.all().then()
  }


  addCategoria(){
    this.todoService.Createcategoria(this.categoria.nombre)
    this.presentAlert("Registrada")
  }
  addArticulo(){
    this.producto.cantidad=0
    this.producto.categoriaId=Number(this.producto.categoriaId)
    console.log(this.producto)
    this.todoService.Createarticulo(this.producto)
    this.presentAlert("Registrado")
  }

  async presentAlert(msn:string) {

    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: ''+msn,
      buttons: ['Ok'],
    });
    await alert.present();
  }
}
