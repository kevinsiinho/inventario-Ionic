import { Component } from '@angular/core';
import { Factura } from '../modelos/factura/factura';
import { Producto } from '../modelos/factura/producto';
import { FacturaService } from '../servicios/factura/factura.service';
import { CategoriaConProductoService } from '../servicios/CategoriaConProducto/categoria-con-producto.service';
import { Categoria } from '../modelos/categoria/categoria';
import { Subscription } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { UserService } from '../servicios/user/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  public producto!: Producto;
  public producto2 = new Producto()
  public factura = new Factura();
  public fecha=new Date()
  public descuento=10
  public todo:Categoria[]=[];
  public productos:Producto[]=[];
  public todoSubscription= new Subscription()
  public userSubscription= new Subscription()
  public op1:boolean=false
  public idCategoria!:number
  public idvendedor:string=""
  constructor(
    public facturasService: FacturaService,
    public todoService:CategoriaConProductoService,
    public userService:UserService,
    private route:Router,
    private alertController: AlertController
    ) {}


    seleccionado(v:boolean, idC:number) {
      this.op1=v
      this.productos=[]
      this.todo.forEach((item:Categoria)=> {
        item.productos.forEach(element => {
        if(item.id==idC){
        this.producto=new Producto();
        this.producto.setValues(element.nombre,element.detalle,element.precio,element.cantidad,element.totalProducto,element.id,element.categoriaId)
        this.productos.push(this.producto)
        }
        });

      });

      }

  ngOnInit(): void {
    this.OnQuien()
    this.todoSubscription=this.todoService.alltodo$().subscribe((res:Categoria[])=>{
      this.todo=res;
      console.log(this.todo)
            })

    this.todoService.all().then()
  }




add(){
    this.producto.cantidad=this.producto2.cantidad
    this.producto.totalProducto=this.producto.cantidad*this.producto.precio
    this.factura.productos.push(this.producto)
    this.factura.subtotal=0

    this.factura.productos.forEach(element => {
      this.factura.subtotal=this.factura.subtotal!+element.totalProducto!
    });

    this.factura.iva=(19*this.factura.subtotal)/100
    this.factura.descuento=((this.factura.subtotal+this.factura.iva)*this.descuento)/100
    this.factura.descuento=Number(this.factura.descuento.toFixed(2))
    this.factura.total=this.factura.iva+this.factura.subtotal-this.factura.descuento!
    this.factura.total=Number(this.factura.total.toFixed(2))
}

  onSave(){
    this.factura.fecha=this.fecha
    this.facturasService.CreateFactura(this.factura)
    this.presentAlert()
  }

  async OnQuien(){
    const { value } = await Preferences.get({ key: 'token' });
    if(value)
    this.userService.Quien(value).then((res)=>{
      this.idvendedor=res.data
      this.factura.idVendedor=res.data
    })
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Factura creada',
      buttons: ['Ok'],
    });
    this.route.navigate(['/tabs/tab2'])
    await alert.present();
  }
}
