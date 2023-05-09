import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/factura/producto';
import { Factura } from '../modelos/factura/factura';
import { FacturaService } from '../servicios/factura/factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from '../modelos/categoria/categoria';
import { CategoriaConProductoService } from '../servicios/CategoriaConProducto/categoria-con-producto.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  public id!:String
  public producto?:Producto;
  public producto2 = new Producto()
  public factura = new Factura();
  public fecha=new Date()
  public descuento=10
  public todo:Categoria[]=[];
  public productos:Producto[]=[];
  public facturaSubcription:Subscription=new Subscription
  public todoSubscription= new Subscription()
  public op1:boolean=false
  public idCategoria!:number
  constructor(
    public facturasService: FacturaService,
    private router:ActivatedRoute,
    private route:Router,
    public todoService:CategoriaConProductoService
  ) { }

  seleccionado(v:boolean, idC:number) {
    this.op1=v
    this.productos=[]
    this.todo.forEach((item:Categoria)=> {
      item.productos.forEach(element => {
      if(item.id==idC){
      this.producto2=new Producto();
      this.producto2.setValues(element.nombre,element.detalle,element.precio,element.cantidad,element.totalProducto,element.id,element.categoriaId)
      this.productos.push(this.producto2)
      }
      });

    });

    }

  ngOnInit() {
    this.id=this.router.snapshot.paramMap.get('id')!
    this.facturasService.GetFactura(this.id)
    this.facturaSubcription=this.facturasService.get$().subscribe((item:Factura)=>{
      this.factura=item
    })

    this.todoSubscription=this.todoService.alltodo$().subscribe((res:Categoria[])=>{
      this.todo=res;
    })

    this.todoService.all().then()
  }

 add(){
    this.producto2.totalProducto=this.producto2.precio!*this.producto2.cantidad!
    console.log(this.producto2)
    this.factura.productos.push(this.producto2)
    this.factura.subtotal=0

    this.factura.productos.forEach(element => {
      this.factura.subtotal=this.factura.subtotal!+element.totalProducto!
    });

    this.factura.iva=(19*this.factura.subtotal)/100
    this.factura.descuento=((this.factura.subtotal+this.factura.iva)*this.descuento)/100
    this.factura.total=this.factura.iva+this.factura.subtotal-this.factura.descuento!

 }

 Update(){
  this.facturasService.UpdateFactura(this.factura)
  this.route.navigate(['/tabs/tab2'])
 }

editar(art:Producto,x:number){
  art.totalProducto=art.cantidad*art.precio
  this.factura.productos[x]=art
}

 deleteproducto(x:number){
  this.factura.productos.splice(x,1)
 }

}
