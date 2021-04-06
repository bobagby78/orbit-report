import { Component } from '@angular/core';
import { Satellite } from './satellite'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';

  sourceList: Satellite[];
  displayList: Satellite[];

  constructor() {
    this.sourceList = [];
    this.displayList = [];
   let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

   window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {

         let fetchedSatellites = data.satellites; //variable for the fetched Satellite data
         console.log (data.satellites)
          for (let i = 0; i < fetchedSatellites.length; i++){ //loop through satellite fetch and ...
            let newSatellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational); //create a satellite object and...
            this.sourceList.push(newSatellite); //add the satellite to the sourceList to be displayed on the webpage
         }
         this.displayList = this.sourceList.slice(0);

      }.bind(this));
   }.bind(this));

  }
    search(searchTerm: string): void {
      let matchingSatellites: Satellite[] = [];
      searchTerm = searchTerm.toLowerCase();
      for(let i=0; i < this.sourceList.length; i++) {
        let name = this.sourceList[i].name.toLowerCase();
        if (name.indexOf(searchTerm) >= 0) {
            matchingSatellites.push(this.sourceList[i]);
        }
      }
      // assign this.displayList to be the array of matching satellites
      // this will cause Angular to re-make the table, but now only containing matches
      this.displayList = matchingSatellites;
    }
 
}
