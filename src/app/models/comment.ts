import { Company } from "./company";

export class Comment {
    _id: string = '';
    user_name: string = '';
    email_account: string = '';
    comment: string = '';
    creation_date: string | Date = new Date();
    tipo: number = 0;
    idEmpresa: Company = new Company();
}