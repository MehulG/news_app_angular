export class functions{
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
}
