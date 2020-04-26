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
  randomSefer: any;
  randomPerek: any;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.initialize();
  }

  initialize() {
    let readsHashRef = this.db.database.ref('items/readsHash');
    readsHashRef.on('value', snapshot => {
      this.prakimArray.next(snapshot.val());
      this.getRandomPerek();
      this.getPerekInfo();
      this.isAllPrakimReaded();
    });
  }
  getPrakim() {
    let readsHashRef = this.db.database.ref('items/readsHash');
    readsHashRef.on('value', snapshot => {
      this.prakimArray.next(snapshot.val());
      this.randomSefer = this.prakimArray.value[Math.floor(Math.random() * this.prakimArray.value.length)];
      this.randomPerek = Math.floor(Math.random() * this.randomSefer.numOfPrakim) + 1;

      this.getPerekInfo();
    });
  }
  getRandomPerek() {
    if (this.prakimArray.value && this.prakimArray.value.length > 0) {
      do {
        this.randomSefer = this.prakimArray.value[Math.floor(Math.random() * this.prakimArray.value.length)];
        this.randomPerek = Math.floor(Math.random() * this.randomSefer.numOfPrakim) + 1;
      } while (this.randomSefer.readedPrakim[this.randomPerek - 1]);
    } else {
      this.randomSefer = null;
      this.randomPerek = null;
    }
  }
  getAnotherPerek() {
    this.getRandomPerek();
    this.getPerekInfo();
  }

  getPerekInfo() {
    if (this.randomSefer && this.randomPerek) {
      this.httpClient.get(routes.sefaria + this.randomSefer.seferEnName + '.' + this.randomPerek).subscribe(res => {
        this.selectedPerek.next(res);
      });
    }
  }

  perekHaveReaded(perek: any) {
    if (this.randomSefer && this.randomSefer.sefer > 0 && this.randomPerek && this.randomPerek > 0) {
      const currentSefer = this.prakimArray.value.find((p: any) => p.sefer === this.randomSefer.sefer);
      this.db.database
        .ref(`items/readsHash/${currentSefer.sefer - 1}/readedPrakim/`)
        .update({ [this.randomPerek - 1]: true });
    } else {
      console.log('Invalid sefer/perek num');
    }
  }

  isAllPrakimReaded() {
    this.prakimArray.subscribe(sfarim => {
      let prakim: any[] = [];
      for (const sefer in sfarim) {
        prakim = prakim.concat(sfarim[sefer].readedPrakim);
      }
      if (prakim.findIndex(x => x === false) == -1) {
        this.prakimArray.next({});
        alert('All prakim has been taken');
      }
    });
  }
}
