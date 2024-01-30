import { Component, OnInit, DoCheck } from "@angular/core";

@Component({
  selector: "main",
  templateUrl:'./main.component.html'
})

export class MainComponent  implements OnInit {
  public title: string ;

  public identity: any ;
  public token: any;
  public url: string ;

  public   showFiller = false;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  constructor(){
    this.title = 'Mensajes privados';
  }

  ngOnInit(): void {
  }

}
