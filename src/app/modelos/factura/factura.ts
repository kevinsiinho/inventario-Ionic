import { Producto } from "./producto";

export class Factura {
  public id?: string;
  public idVendedor!:number
  public fecha!: Date;
  public subtotal?: number;
  public iva?: number;
  public descuento?: number;
  public total?: number;
  public productos:Producto[]=[];
  setValues(item:any){
    this.id=item.id;
    this.idVendedor=item.idVendedor
    this.fecha=item.fecha;
    this.subtotal=item.subtotal;
    this.iva=item.iva;
    this.descuento=item.descuento;
    this.total=item.total;
    this.productos=item.productos
  }

}
