import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, Subject, map, pipe, shareReplay }  from 'rxjs';
import { Factura } from 'src/app/modelos/factura/factura';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  public url = environment.url
  public facturas$= new Subject<Factura[]>();
  public factura$= new Subject <Factura>();
  public facturas:Factura[]=[];
  public factura= new Factura()

  constructor(
  ) { }



allFacturas$():Observable<Factura[]>{
  return this.facturas$.asObservable().pipe(shareReplay(1));
}

get$():Observable<Factura>{
  return this.factura$.asObservable();
}

async allFacturas(): Promise<Factura[]>{
  const { value } = await Preferences.get({ key: 'token' });
    this.facturas=[]
    const options = {
      url: this.url+'/facturas',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
   }
    };

  const response: HttpResponse = await CapacitorHttp.get(options);

        response.data.forEach((item:any)=> {
          this.factura=new Factura();
          this.factura.setValues(item)
          this.facturas.push(this.factura)
        });
        this.facturas$.next(this.facturas)
        console.log(this.facturas$)
        return this.facturas;
  }



 async CreateFactura(factura:Factura){
  const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'/facturas',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data: factura
      };
    const response: HttpResponse = await CapacitorHttp.post(options);

          this.factura=new Factura()
          this.factura.setValues(response.data)
          this.factura$.next(this.factura)
          return response.data
   };

  async DeleteFactura(id:String){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'/facturas/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      };
    const response: HttpResponse = await CapacitorHttp.delete(options);
  };

  async GetFactura(id:String){
    const { value } = await Preferences.get({ key: 'token' });
    this.facturas=[]
    const options = {
      url: this.url+'/facturas/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };

  const response: HttpResponse = await CapacitorHttp.get(options);

          this.factura=new Factura();
          this.factura.setValues(response.data)
          this.factura$.next(this.factura)
        return this.facturas$
  }

  async UpdateFactura(factura:Factura){
    const { value } = await Preferences.get({ key: 'token' });
    this.facturas=[]
    const options = {
      url: this.url+'/facturas/'+factura.id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:factura
    };

  const response: HttpResponse = await CapacitorHttp.put(options);

          this.factura=new Factura();
          this.factura.setValues(response.data)
          this.factura$.next(this.factura)
        return this.facturas$
  }


}
