import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, Subject }  from 'rxjs';
import { Categoria } from 'src/app/modelos/categoria/categoria';
import { Producto } from 'src/app/modelos/factura/producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaConProductoService {
  public url = environment.url
  //categoria
  public todo$= new Subject<Categoria[]>();
  public uno$= new Subject <Categoria>();
  public todo:Categoria[]=[];
  public uno= new Categoria()

  alltodo$():Observable<Categoria[]>{
    return this.todo$.asObservable();
    console.log(this.todo$)
  }
  getuno$():Observable<Categoria>{
    return this.uno$.asObservable();
  }
  constructor() { }

//Crud todo articulos y categorias
async Createcategoria(categoria:String){
  const { value } = await Preferences.get({ key: 'token' });
  const options = {
    url: this.url+'/categorias',
    headers: { "Content-Type": "application/json",
    "Authorization": 'Bearer ' + value
  },
    data:{nombre: categoria}
    };
  const response: HttpResponse = await CapacitorHttp.post(options);
};

async all():Promise<Categoria[]>{
  const { value } = await Preferences.get({ key: 'token' });
  this.todo=[]
  const options = {
    url: this.url+'/CategoriasConProductos',
    headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
  }
  };

const response: HttpResponse = await CapacitorHttp.get(options);

      response.data.forEach((item:any)=> {
        this.uno=new Categoria();
        this.uno.setvalues(item)
        this.todo.push(this.uno)
      });
      this.todo$.next(this.todo)
      return this.todo
}


//Crud articulo

async Createarticulo(articulo:Producto){
  const { value } = await Preferences.get({ key: 'token' });
  const options = {
    url: this.url+'/productos',
    headers: { "Content-Type": "application/json",
    "Authorization": 'Bearer ' + value
  },
    data: articulo
    };
  const response: HttpResponse = await CapacitorHttp.post(options);
 };
}
