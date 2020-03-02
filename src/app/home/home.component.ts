import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { TorahService } from './torah.service';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { env } from '@env/.env';
import { BehaviorSubject } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  perek: BehaviorSubject<any> = new BehaviorSubject({});
  isLoading = false;
  isSuccess = false;
  items: any;

  constructor(
    private httpClient: HttpClient,
    private quoteService: QuoteService,
    private torahService: TorahService,
    public db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.torahService.selectedPerek.subscribe(res => {
      debugger;
      this.perek.next(res);
      this.isLoading = false;
    });
  }

  anotherPerek() {
    this.isLoading = true;
    this.torahService.getRandomPerek();
    this.perek.subscribe(res => {
      this.isLoading = false;
    });
  }
  iHaveDoneReading() {
    this.isSuccess = true;
    this.torahService.perekHaveReaded(this.perek);
  }
}
