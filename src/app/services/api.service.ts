import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders().append('Content-Type', environment.CONTENT_TYPE_JSON);
  constructor(private http: HttpClient) { }
  /**
   * Método para consumir el servicio de obtencion de VistaUsuarios
   *
   * @param idEmpresa id de la empresa a filtrar
   */
  getCommentsByCompanyId(idEmpresa: string): Observable<Comment[]> {
    const urlApi = 'companies/';
    const url = `${environment.API_URL}${urlApi}/${idEmpresa}/comments`;
    return this.http.get<Comment[]>(url, { headers: this.headers });
  }
  createComment(body: Comment) {
    const urlApi = 'comments';
    const url = `${environment.API_URL}${urlApi}`;
    return this.http.post<Comment>(url, body, { headers: this.headers });
  }
}
