import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HostListener } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from './services/api.service';
import { Comment } from './models/comment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = ['Compromiso de la dirección', 'Capacidades internas', 'Capacidad de exploración y relación con el exterior', 'Procesos y herramientas', 'Modelo de gestión'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartDataSector: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56], label: 'Grupo Pana', backgroundColor: '#52B9EA ', hoverBackgroundColor: "#00ABFC",
      hoverBorderColor: "#E2EDFE", borderWidth: 1, borderColor: '#f2f7ff', hoverBorderWidth: 1,
    },
    {
      data: [28, 48, 40, 19, 86], label: 'Sector', backgroundColor: ' #FAB163', hoverBackgroundColor: '#FF8400',
      hoverBorderColor: "#E2EDFE", borderWidth: 1, borderColor: '#f2f7ff', hoverBorderWidth: 1,
    }
  ];
  public barChartDataPais: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56], label: 'Grupo Pana', backgroundColor: '#52B9EA ', hoverBackgroundColor: "#00ABFC",
      hoverBorderColor: "#E2EDFE", borderWidth: 1, borderColor: '#f2f7ff', hoverBorderWidth: 1,
    },
    {
      data: [28, 48, 40, 19, 86], label: 'País', backgroundColor: ' #FAB163', hoverBackgroundColor: '#FF8400',
      hoverBorderColor: "#E2EDFE", borderWidth: 1, borderColor: '#f2f7ff', hoverBorderWidth: 1,
    }
  ];
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;
  scrHeight: any;
  scrWidth: any;
  showGraphs = false;
  lstCommentsT1: Comment[] = [];
  lstCommentsT2: Comment[] = [];
  lstCommentsT3: Comment[] = [];
  lstCommentsT4: Comment[] = [];
  comment1: string = '';
  comment2: string = '';
  comment3: string = '';
  comment4: string = '';
  constructor(private authService: SocialAuthService, private api: ApiService, private spinner: NgxSpinnerService) { }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event: any) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    this.barChartOptions = this.getConfig();
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (succes) => {
        console.log(succes);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  signOut(): void {
    this.authService.signOut();
  }
  getComments() {
    this.api.getCommentsByCompanyId('6256385fd6faab4c4fc541c4').subscribe(
      (response: Comment[]) => {
        console.log(response)
        this.lstCommentsT1 = response.filter(x => x.type === 1);
        this.lstCommentsT2 = response.filter(x => x.type === 2);
        this.lstCommentsT3 = response.filter(x => x.type === 3);
        this.lstCommentsT4 = response.filter(x => x.type === 4);
      },
      (error) => {
        console.log(error);
      },
      () => {

      }
    );
  }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.getComments();
  }
  ngAfterViewInit(): void {
    this.barChartOptions = this.getConfig();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 2000);
  }
  getConfig(): ChartOptions {
    const fontSize = this.getFontSize();
    const options = {
      responsive: true,
      legend: {
        labels: {
          fontSize,
          fontColor: '#7c8db5'
        }
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              fontSize,
              fontColor: '#7c8db5',
              beginAtZero: fontSize <= 10,
            },
          }
        ],
        xAxes: [
          {
            display: true,
            ticks: {
              fontSize,
              fontColor: '#7c8db5'
            }
          }
        ],
      }
    };
    return options;
  }
  getFontSize(): number {
    if (window.innerWidth >= 1200) {
      return 16;
    } else if (window.innerWidth >= 992) {
      return 14
    } else if (window.innerWidth >= 768) {
      return 12
    } else if (window.innerWidth >= 576) {
      return 10
    } else {
      return 6
    }
  }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
  }
  getHeight(px: boolean = true) {
    return this.getFontSize() <= 12 ? (px ? '250px !important' : '250') : '';
  }
  btnCreateComment(type: number, comment: string) {
    console.log(comment);
    if (this.loggedIn) {
      this.spinner.show();
      let body = new Comment();
      body.comment = comment;
      body.email_account = this.user.email;
      body.id_empresa = '6256385fd6faab4c4fc541c4';
      body.image_profile = this.user.photoUrl;
      body.type = type;
      body.user_name = this.user.name;
      this.api.createComment(body).subscribe(
        (response: Comment) => {
          console.log(response);
          this.getComments();
          this.comment1 = '';
          this.comment2 = '';
          this.comment3 = '';
          this.comment4 = '';
          this.spinner.hide();
        },
        (error: any) => {
          this.spinner.hide();
        },
        () => {

          this.spinner.hide();
        }
      );
    }
  }
}
