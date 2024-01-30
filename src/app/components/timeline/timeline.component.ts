import { Component, OnInit } from '@angular/core';
import {  Router, Params, ActivatedRoute } from '@angular/router';
import { Follow } from 'src/app/models/follow';
import { Publication } from 'src/app/models/publication';
import { User } from 'src/app/models/user';
import { FollowService } from 'src/app/service/follow.service';
import { GLOBAL } from 'src/app/service/global';
import { PublicationService } from 'src/app/service/publication.service';
import { UploadService } from 'src/app/service/upload.service';
import { UserService } from 'src/app/service/user.service';

declare var $:any;


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [UserService, UploadService, FollowService, PublicationService]
})

export class TimelineComponent implements OnInit {

  public title: string;
  public users: any;
  public user: any;
  public identity: any;
  public token:any ;
  public status: string;
  public url: string ;
  public page: any ;
  public pages : any ;
  public next_page: any ;
  public prev_page: any ;
  public follows: any;
  public following: any;
  public followed: any;
  public total: any ;
  public _id: any;
  public stats: any ;
  public publication: Publication;
  public itemPerpage: any;
  public publications: any;
  public itemsPerPage: any;

  constructor(private us: UserService,
              private _route: ActivatedRoute,
              private up: UploadService,
              private fs:FollowService,
              private ps: PublicationService,
              private _router:Router,
              ) {

    this.title = 'Sidebar' ;
    this.status = '' ;
    this.identity = this.users;
    this.token = this.us.getToken();
    this.url = GLOBAL.url ;
    this.page = 1 ;
    this.publication = new Publication("", "", "","", "");
  }

  ngOnInit(): void {
    this.identity = this.us.getIdentity();
    this.token = this.us.getToken();
    this.stats = this.us.getStats();
    // console.log(this.identity);
    this.getPublications(this.page);
  }

  onSubmit(){
    this.getPublications(this.page);
  }

  deletePublication(id:any){

    this.ps.deletePublications(this.token, id).subscribe(

      response => {
        console.log(response);
        this.refresh();
      },
      error => {
        console.log(<any>error);
      }

    )

  }

  getPublications(page:any, adding = false){

    this.ps.getPublications(this.token, page).subscribe(

      response => {

        this.total = response.total_items;
        this.pages = response.pages ;
        this.itemsPerPage = response.items_per_page;

        if(!adding){
          this.publications = response.publications ;
        }else{
          var arrayA = this.publications;
          var arrayB = response.publications ;
          this.publications  = arrayA.concat(arrayB);

          $('html').animate({scrollTop:$("html").prop("scrollHeight")},600);

        }

      },

      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  public noMore = false ;

  viewMore(){

    this.page += 1 ;

    if(this.page == this.pages){
      this.noMore = true ;
    }

    this.getPublications(this.page, true);

  }

  refresh(){
    this.getPublications(1);

  }

}
