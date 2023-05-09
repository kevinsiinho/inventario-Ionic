export class Producto {
  public nombre!: string;
  public detalle!: string;
  public precio!: number;
  public cantidad!:number;
  public totalProducto!:number
  public id!:number
  public categoriaId!:number
setValues(nombre:string,detalle:string,precio:number,cantidad:number,totalproducto:number,
  id:number,categoriaId:number){
  this.nombre=nombre;
  this.detalle=detalle;
  this.precio=precio;
  this.cantidad=cantidad;
  this.totalProducto=totalproducto
  this.id=id
  this.categoriaId=categoriaId
}
}
