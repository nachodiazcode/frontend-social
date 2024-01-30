import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import { FollowService } from 'src/app/service/follow.service';
import { GLOBAL } from 'src/app/service/global';
import { PublicationService } from 'src/app/service/publication.service';
import { UploadService } from 'src/app/service/upload.service';
import { UserService } from 'src/app/service/user.service';

declare var $:any;

@Component({
  selector: 'publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
  providers: [UserService, UploadService, FollowService, PublicationService]
})

export class PublicationsComponent implements OnInit {

  public title: string;
  public users: any;
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
  public noMore = false ;

  @Input() public user : any ;

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
    this.getPublications( this.user, this.page);
  }

  onSubmit(){
    this.getPublications(this.user, this.page);
  }

  actualPage(){
    this._route.params.subscribe( params => {


      let page = +params['page'] ;
      this.page = page ;

      if(!page){
        page = 1 ;
      }else{
        this.next_page = page+1;
        this.prev_page = page-1;
      }
      if(this.prev_page <= 0 ){
        this.prev_page = 1 ;
      }


    });
  }

  deletePublication(id:any){
    this.ps.deletePublications(this.token, id).subscribe(
      response => {
        console.log(response);
        this.refresh();
      },
      error => {
        console.log(<any>error);
      });
  }

  getPublications(user:any, page:any, adding = false){

    this.ps.getPublicationsUser(this.token, user, page).subscribe(

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

          $("html").animate({scrollTop:$("html").prop("scrollHeight")}, 500);
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

  viewMore(){

    this.page += 1 ;

    if(this.page == this.pages){
      this.noMore = true ;
    }

    this.getPublications(this.user,this.page, true);

  }

  refresh(){
    this.getPublications(this.user, this.page);
  }

}
