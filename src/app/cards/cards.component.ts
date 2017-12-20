import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {news} from '../news'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']

})
export class CardsComponent implements OnInit {

  key:string ;
  query:string;
  category:number;
  language:number;
  country:string;

  News:Array<news> = [];
  i:number;

  constructor() {
    this.i = 0;
    this.key = "8018bf1b41aa47d28f1df2bda8e80138";
  }

  ngOnInit() {
    axios.get('https://ipinfo.io/json')
    .then(response => {
//      console.log(response.data.country.toLowerCase());
    this.country = response.data.country.toLowerCase();
    this.defaultfetch();
    })
    .catch(function (error) {
      console.log(error);
    });

    }

  fetchResponse(){
      if(this.query == null || ''){
        axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey='+this.key)
        .then(response => {
          console.log(response);
          this.ResponseFunction(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        console.log(123321);
        axios.get('https://newsapi.org/v2/everything?language=en&q='+this.query+'&apiKey='+this.key)
        .then(response => {
          console.log(response);
          this.ResponseFunction(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }

  ResponseFunction(response){
      response.data.articles.forEach(a => {
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
      this.i = 0;
    }

  refreshQuery(newQuery:string){
      this.query = newQuery;
      console.log(this.query);
      this.fetchResponse();
    }
  defaultfetch(){
    axios.get('https://newsapi.org/v2/top-headlines?country='+this.country+'&apiKey='+this.key)
    .then(response => {
      console.log(response);
      if(response.data.totalResults == 0){
        console.log('no results');
      }
      this.ResponseFunction(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
