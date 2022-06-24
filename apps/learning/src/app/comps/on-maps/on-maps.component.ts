import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  concatMap,
  exhaustMap,
  interval, map,
  mergeMap,
  switchMap,
  take
} from "rxjs";

const URL = 'https://jsonplaceholder.typicode.com/posts/';

@Component({
  selector: 'lrn-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './on-maps.component.html',
  styleUrls: ['./on-maps.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class OnMapsComponent implements OnInit {
  posts:any[] = [];
  timeTaken = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {



    interval(1)
      .pipe(
        // this.pipeTimer(),
        map(id => id + 1),
        take(5),
        mergeMap(id => this.http.get(URL + id))
        // concatMap(id => this.http.get<Post>(URL + id))
        // exhaustMap(id => this.http.get(URL + id))
        // switchMap(id => this.http.get<Post>(URL + id))
      )
      .subscribe((post:any) => {
        this.posts.push(post);
      });
  }
}
