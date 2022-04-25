import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HostListener } from "@angular/core";
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
  constructor(private authService: SocialAuthService) { }
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

      }
    )
  }
  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
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
              fontColor: '#7c8db5'
            }
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
}
