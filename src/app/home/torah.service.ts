import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AngularFireDatabase } from '@angular/fire/database';

const routes = {
  sefaria: 'https://www.sefaria.org/api/texts/'
};

export interface RandomPerekContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class TorahService {
  sfarimHash = environment.readsHash;
  prakimArray: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedPerek: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.initialize();
  }

  initialize() {
    let readsHashRef = this.db.database.ref('items/readsHash');
    readsHashRef.on('value', snapshot => {
      this.prakimArray.next(snapshot.val());
      let randomSefer = this.prakimArray.value[Math.floor(Math.random() * this.prakimArray.value.length)];
      let randomPerek = Math.floor(Math.random() * randomSefer.numOfPrakim) + 1;

      this.getPerekInfo(randomSefer, randomPerek);
    });
  }
  getPrakim() {
    let readsHashRef = this.db.database.ref('items/readsHash');
    readsHashRef.on('value', snapshot => {
      this.prakimArray.next(snapshot.val());
      let randomSefer = this.prakimArray.value[Math.floor(Math.random() * this.prakimArray.value.length)];
      let randomPerek = Math.floor(Math.random() * randomSefer.numOfPrakim) + 1;

      this.getPerekInfo(randomSefer, randomPerek);
    });
  }
  getRandomPerek() {
    let randomSefer = this.prakimArray.value[Math.floor(Math.random() * this.prakimArray.value.length)];
    let randomPerek = Math.floor(Math.random() * randomSefer.numOfPrakim) + 1;
    this.getPerekInfo(randomSefer, randomPerek);
  }

  getPerekInfo(randomSefer: any, randomPerek: any) {
    this.httpClient.get(routes.sefaria + randomSefer.seferEnName + '.' + randomPerek).subscribe(res => {
      this.selectedPerek.next(res);
    });
  }

  perekHaveReaded(perek: any) {
    debugger;
  }
}
