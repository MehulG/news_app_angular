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
  language:string;
  country:string;
  position:string;

  News:Array<news> = [];
  i:number;
  i_prev:number;
  constructor() {
    this.i = 0;
    this.i_prev = 0;
    this.key = "8018bf1b41aa47d28f1df2bda8e80138";
    this.language = 'en';
    this.query = null;
  }

  ngOnInit() {
    axios.get('https://ipinfo.io/json')
    .then(response => {
    this.country = response.data.country.toLowerCase();
    this.position=this.country;
    this.fetchResponse(this.query,this.language,this.country,this.category,this.key);
    })
    .catch(function (error) {
      console.log(error);
    });

    }

  ResponseFunction(response){
    //clearing prev Array
    var j = 0;
    for(j = 0; j<= this.i_prev; j++){
      this.News.pop();
    }
    //pushing freshly
    if(response.data.totalResults == 0){
      this.removedisp('loading');
      console.log('No result');
      var test = document.getElementById('NoResults');
      test.classList.remove("blank");
    }
    else{
      var test = document.getElementById('NoResults');
      test.classList.add("blank");
      response.data.articles.forEach(a => {
        this.News[this.i] = {
        source: a.source.name ,
        author : a.author,
        title : a.title,
        url : a.url,
        img_url : a.urlToImage,
        description : a.description,
        time : a.publishedAt
        };
        this.i+=1;
      });
      this.i_prev = this.i;
      this.i = 0;
      this.removedisp('loading');
      this.adddisp('content');
    }
    }

  removedisp(id:string){
    var test = document.getElementById(id);
    test.classList.add("removedisp");
  }

  adddisp(id:string){
    var test = document.getElementById(id);
    test.classList.remove("removedisp");
  }


  refreshQuery(newQuery:string){
      this.query = newQuery;
      console.log(this.query);
      this.country = null;
      this.fetchResponse(this.query,this.language,this.country,this.category,this.key);
    }

  fetchResponse(query:string, lang:string, country:string, category:number, key:string){
    this.adddisp('loading');
    this.removedisp('content');
    var api_url = 'https://newsapi.org/v2/top-headlines?';
    if(country == ''||country ==null||country == undefined){
      api_url += 'apiKey='+key;
      }else{
      api_url += 'apiKey='+key+'&country='+country;
    }
    if(category ==null||category == undefined){
      }else{
      api_url += '&category='+category;
    }
    if(lang == '' ||lang == null ||lang == undefined){
      api_url+= '&language=en';
      }else{
      api_url+= '&language='+lang;
    }
    if(query == '' || query == null|| query == undefined){
      }else{
      api_url+= '&q='+query;
    }
    this.get_info(api_url);
  }

  get_info(api_url:string){
    axios.get(api_url)
    .then(response => {
      console.log(api_url);
      console.log(response);
      this.ResponseFunction(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

//Selectors
  langselect(value:string){
    if(value!= 'lang'){
      this.language = value;
      this.country = null;
      console.log(this.language);
      this.fetchResponse(this.query,this.language,this.country,this.category,this.key);
    }
  }

//Home
  setHome(){
    this.query = null;
    this.country = this.position;
    this.language = 'en';
    this.category = null;
    this.fetchResponse(this.query,this.language,this.country,this.category,this.key);
  }

}
