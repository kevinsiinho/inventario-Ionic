import { Producto } from "../factura/producto";

export class Categoria {
  public id!:Number
  public nombre!:String
  public productos:Producto[]=[];
  setvalues(item:Categoria){
    this.id=item.id
    this.nombre=item.nombre
    this.productos=item.productos
  }
}
