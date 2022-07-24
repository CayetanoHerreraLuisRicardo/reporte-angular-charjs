import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { Company } from '../models/company';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders().append('Content-Type', environment.CONTENT_TYPE_JSON);
  constructor(private http: HttpClient) { }
  /**
   * @summary Método para consumir el servicio de obtencion de VistaUsuarios
   * @param {string} idEmpresa de la empresa a filtrar
   * @returns colección de comentarios
   */
  getCommentsByCompanyId(idEmpresa: string): Observable<Comment[]> {
    const urlApi = 'companies';
    const url = `${environment.API_URL}${urlApi}/${idEmpresa}/comments`;
    return this.http.get<Comment[]>(url, { headers: this.headers });
  }
  /**
   * @summary Método para consumir el servicio de crear comentario
   * @param {Comment} body cuerpo de solicitud con los datos del comentario a crear
   * @returns objeto que contiene los datos del comentario creado
   */
  createComment(body: Comment) {
    const urlApi = 'comments';
    const url = `${environment.API_URL}${urlApi}`;
    return this.http.post<Comment>(url, body, { headers: this.headers });
  }
  /**
 * @summary metodo para comsumir el servicio para consultar compania por id
 * @param {string} id identificador de la compania
 * @returns 
 */
  getCompanyById(id: string) {
    const urlApi = 'companies';
    const url = `${environment.API_URL}${urlApi}/${id}`;
    return this.http.get<Company>(url, { headers: this.headers });
  }
}
