import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private colecaoCliente:AngularFirestoreCollection<Cliente>;

  constructor(
    private afs: AngularFirestore) {
      this.colecaoCliente = this.afs.collection<Cliente>('Cliente');
    }

    listaCliente(){
      return this.colecaoCliente.snapshotChanges().pipe(
        map(actions =>{
          return actions.map(a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id,...data};
          });
        })
      );
    }

    addCliente(cliente:Cliente){
        return this.colecaoCliente.add(cliente);
    }

    mostraCliente(id:string){
      return this.colecaoCliente.doc<Cliente>(id).valueChanges();
    }

    editarCliente(id:string, produto:Cliente){
      return this.colecaoCliente.doc<Cliente>(id).update(produto);
    }

    excluirCliente(id:string){
      return this.colecaoCliente.doc(id).delete();
    }

}

