import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {news} from '../news'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
//  mango:string;

  News:Array<news> = [];
  i:number;
  constructor() {
    this.i = 0;
  }

  ngOnInit() {
    axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=8018bf1b41aa47d28f1df2bda8e80138')
    .then(response => {
      console.log(response);
//      this.mango = response.data.articles["0"].description.replace(/^"(.*)"$/, '$1');
      response.data.articles.forEach(a => {
//        console.log(a);
        this.News[this.i] = {
        source: a.source.name ,
        author : a.author,
        title : a.title,
        description : a.description,
        url : a.url,
        img_url : a.urlToImage,
        time : a.publishedAt
        };
        this.i+=1;
      });
      console.log(this.News);
    })
    .catch(function (error) {
      console.log(error);
    });
    }
}
