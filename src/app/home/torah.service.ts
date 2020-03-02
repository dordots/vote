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
  randomSeferNum: number;
  randomPerek: number;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.initialize();
  }

  initialize() {
    let readsHashRef = this.db.database.ref('items/readsHash');
    readsHashRef.on('value', snapshot => {
      this.prakimArray.next(snapshot.val());
      // let randomSefer = this.prakimArray.value[Math.floor(Math.random() * this.prakimArray.value.length)];
      // let randomPerek = Math.floor(Math.random() * randomSefer.numOfPrakim) + 1;
      // this.getPerekInfo(randomSefer, randomPerek);
    });
  }

  getRandomPerek() {
    this.randomSeferNum = Math.floor(Math.random() * this.prakimArray.value.length);
    let randomSefer = this.prakimArray.value[this.randomSeferNum];
    this.randomPerek = Math.floor(Math.random() * randomSefer.numOfPrakim) + 1;
    if (this.prakimArray.value[this.randomSeferNum].readedPrakim[this.randomPerek - 1] == false) {
      return this.httpClient
        .cache()
        .get(routes.sefaria + randomSefer.seferEnName + '.' + this.randomPerek)
        .pipe(
          map(body => body),
          catchError(() => of('Error, could not load joke :-('))
        );
    } else {
      this.getRandomPerek();
    }
  }

  getNumOfPrakimReaded() {
    let numberOfReadedPrakim = 0;
    this.prakimArray.value.forEach((allBooks: any) => {
      numberOfReadedPrakim += allBooks.readedPrakim.filter((perek: any) => perek == true).length;
    });

    return numberOfReadedPrakim;
  }

  getPerekInfo(randomSefer: any, randomPerek: any) {
    this.httpClient
      .cache()
      .get(routes.sefaria + randomSefer.seferEnName + '.' + randomPerek)
      .pipe(
        map((body: any) => this.selectedPerek.next(body)),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  perekHaveReaded(perek: any) {
    this.db.database
      .ref('items/readsHash/' + this.randomSeferNum + '/readedPrakim/' + (this.randomPerek - 1))
      .set(true, function(error) {
        if (error) {
          return 'bad';
        } else {
          return 'good';
        }
      });
  }
}
