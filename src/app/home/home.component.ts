import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { TorahService } from './torah.service';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { env } from '@env/.env';
import { BehaviorSubject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  perek: BehaviorSubject<any> = new BehaviorSubject({});
  thePerek: any;
  numOfPrakim: number;

  isLoading = false;
  items: any;

  constructor(private httpClient: HttpClient, private torahService: TorahService, public db: AngularFireDatabase) {}

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.torahService.getRandomPerek().subscribe(res => {
        this.thePerek = res;
        this.isLoading = false;
      });
      this.numOfPrakim = this.torahService.getNumOfPrakimReaded();
    }, 2500);
  }

  anotherPerek() {
    this.isLoading = true;
    this.torahService.getRandomPerek().subscribe(res => {
      this.thePerek = res;
      this.isLoading = false;
    });
  }
  iHaveDoneReading() {
    this.numOfPrakim++;
    this.torahService.perekHaveReaded(this.thePerek);
    let timeNow = Date();
    this.db.list('items').push({ perekReadedInfo: this.thePerek.heSectionRef, time: timeNow.toString() });
    this.anotherPerek();
  }
}
