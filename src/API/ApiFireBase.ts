import { addDoc, collection, getDocs, writeBatch, query, where, QuerySnapshot, DocumentData, CollectionReference, DocumentReference, Firestore, getDoc } from 'firebase/firestore';
import Firebase from '../DataBase/FireBase';

export default class ApiFireBase {
  private readonly collectionRef: CollectionReference<DocumentData>;
  database;
  auth;
  constructor(table:string) {
    const db = new Firebase();
    this.database = db.db;
    this.auth = db.auth;
    this.collectionRef = collection(this.database, table);
  }

  async get(): Promise<any[]> {
    try {

      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(this.collectionRef);
      const data: any[] = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return data;
    } catch (error) {
      console.error('Falha na busca', error);
      return [];
    }
  }

  async getOrder(commands: number): Promise<any> {
    try {
      const q = query(this.collectionRef, where("commands", "==", commands),where("status","==",true));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const data: any[] = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      return data[0];       
    } catch (error) {
      console.error('Falha na busca', error);
      return [];
    }
  }


  async post(object: any): Promise<any | null> {
    console.log(object)
    try {
      const docRef: DocumentReference<DocumentData> = await addDoc(this.collectionRef, object);
      return { id: docRef.id, ...object };
    } catch (error) {
      console.error('Erro ao criar produto', error);
      return null;
    }
  }

  async put(id: string, description: string): Promise<void> {
    try {
      const q = query(this.collectionRef, where("description", "==", id));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const batch = writeBatch(this.database);

      querySnapshot.forEach(doc => {
        batch.update(doc.ref, { description: description });
      });

      await batch.commit();
      console.log('Atualizado com sucesso.');
    } catch (error) {
      console.error('Falha ao atualizar.', error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const q = query(this.collectionRef, where("description", "==", id));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const batch = writeBatch(this.database);

      querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log('Deletado com sucesso.');
    } catch (error) {
      console.error('Falha ao deletar.', error);
    }
  }
}

function doc(database: Firestore, table: any, itemId: string): DocumentReference<DocumentData, DocumentData> {
  throw new Error('Function not implemented.');
}
