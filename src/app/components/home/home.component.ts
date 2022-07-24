import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HostListener } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from './../../services/api.service';
import { Comment } from './../../models/comment';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  /**
   * opciones de configuración de las graficas de barras
   */
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  /**
   * los segmentos de la grafica de barras
   */
  public barChartLabels: Label[] = ['Compromiso de la dirección', 'Capacidades internas', 'Capacidad de exploración y relación con el exterior', 'Procesos y herramientas', 'Modelo de gestión'];
  /**
   * tipo de gráfica 
   */
  public barChartType: ChartType = 'bar';
  /**
   * leyenda para diferenciar la comparativa de cada segmento 
   */
  public barChartLegend = true;
  /** pugins que se quieran agregar para dibujar algo despues de haber cargado la grafica */
  public barChartPlugins = [];
  /**
   * datos para la grafica por sector
   */
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
  /**
   * Datos para la gráfica por sector
   */
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
  /**
   * objeto usuario para el login con la cuenta de Google
   */
  user: SocialUser = new SocialUser();
  /**
   * bandera para identificar cuando el usuario este logueado con su cuenta de Google
   */
  loggedIn: boolean = false;
  /**
   * Comentarios Horizontes de innovación - vista sector
   */
  lstCommentsT1: Comment[] = [];
  /**
   * Comentarios Horizontes de innovación - vista país
   */
  lstCommentsT2: Comment[] = [];
  /**
   * Comentarios Aspectos de innovación - vista sector
   */
  lstCommentsT3: Comment[] = [];
  /**
   * Comentarios Aspectos de innovación - vista país
   */
  lstCommentsT4: Comment[] = [];
  /**
   * modelo para el textarea Horizontes de innovación - vista sector
   */
  comment1: string = '';
  /**
   * modelo para el textarea Horizontes de innovación - vista país
   */
  comment2: string = '';
  /**
   * modelo para el textarea Aspectos de innovación - vista sector
   */
  comment3: string = '';
  /**
   * modelo para el textarea Aspectos de innovación - vista país
   */
  comment4: string = '';
  idCompany = '';
  /**
   * @summary metodo constructor para la inyección de dependencias e inicialización de variables
   * @param authService servicio para la autenticación para las redes sociales - Google
   * @param api servicio para consumir la API de la Encuesta
   * @param spinner servicio para el spinner al hacer peticiones
   */
  constructor(private authService: SocialAuthService, private api: ApiService, private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute, private router: Router) { }
  /**
   * @summary se encar de cachar el estado de un usuario logueado con su cuenta de Google y cargar los comentarios al cargar la aplicación
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idCompany = params['idcompany'];

      this.api.getCompanyById(this.idCompany).subscribe(
        (response: Company) => {
          console.log(response)
          this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
          });
          this.getComments();
        },
        (error) => {
          console.log(error);
          this.router.navigate(['500']);
        },
        () => {

        }
      )
    })
  }
  /**
   * @summary despues de renderizar la vista cargamos las opciones de configuración de la grafica
   */
  ngAfterViewInit(): void {
    this.barChartOptions = this.getConfig();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 2000);
  }
  /**
   * @summary evento accionado cada que se cambia el tamaño de la ventana del navegador
   * @param event 
   */
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.barChartOptions = this.getConfig();
  }
  /**
   * @summary evento para el boton de logueo con cuenta de Google
   */
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
  /**
   * @summary evento para cerrar sesión de la cuenta de Google
   */
  signOut(): void {
    this.authService.signOut();
  }
  /**
   * @summary consulta de comentarios por id de compania
   */
  getComments() {
    this.api.getCommentsByCompanyId(this.idCompany).subscribe(
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
  /**
   * @summary se encarga de regresar la opciones de configuración para nuestra grafica
   * @description es util para cuando hay un cambio en la vista o cuando se cambia la rosolución y que la grafica sea responsiva o se ajuste al tamaño ideal de acuerdo a la resolución del disposivo
   * @returns configuración que se aplicará a la gráfica
   */
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
  /**
   * @summary se encarga de regresar el tamaño del texto de las graficas
   * @description ademas de regresar el tamaño de texto ideal que llevaran las graficas servirá tambien para evaluar la altura de la grafica
   * @returns tamaño de texto de las graficas
   */
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
  /**
   * @summary se encarga de general el valor de la altura
   * @param $event 
   * @returns la altura pueda generarse de 2 maneras distintas:  1.- '250' (valor de la altura que se le asignará al canva que contendrá la grafica) | 2.- ''
   */
  getHeight(): string {
    return this.getFontSize() <= 12 ? '250' : '';
  }
  /**
   * @summary evento accionado por el usuario cuando hace un comentario en alguna de las secciones
   * @param type el tipo de sección al que pertennece
   * @param comment valor que contiene el comentario realizado por el usuario
   */
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
