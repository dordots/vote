import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { TorahService } from './torah.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  perek: BehaviorSubject<any> = this.torahService.selectedPerek;
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
    this.perek.subscribe(res => {
      this.isLoading = false;
    });
  }

  anotherPerek() {
    this.isLoading = true;
    this.torahService.getAnotherPerek();
    this.perek.subscribe(res => {
      this.isLoading = false;
    });
  }
  iHaveDoneReading() {
    this.isSuccess = true;
    this.torahService.perekHaveReaded(this.perek);
  }
}
