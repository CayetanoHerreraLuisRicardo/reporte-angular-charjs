export class Comment {
    _id: string = '';
    user_name: string = '';
    email_account: string = '';
    comment: string = '';
    creation_date: string | Date = new Date();
    type: number = 0;
    id_empresa: string = '';
    image_profile: string = '';
}