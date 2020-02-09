import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Movie } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private dbPath = '/movies';
 
  moviesRef: AngularFirestoreCollection<Movie> = null;
 
  constructor(private db: AngularFirestore) {
    this.moviesRef = this.db.collection(this.dbPath);
  }
 
  createMovie(movie: Movie): void {
    this.moviesRef.add({...movie});
  }
 
  updateMovie(key: string, value: any): Promise<void> {
    return this.moviesRef.doc(key).update(value);
  }
 
  deleteMovie(key: string): Promise<void> {
    return this.moviesRef.doc(key).delete();
  }
 
  getMoviesList(): AngularFirestoreCollection<Movie> {
    return this.moviesRef;
  }
 
  deleteAll() {
    this.moviesRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      });
  }
}
