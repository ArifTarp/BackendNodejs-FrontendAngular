import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private httpClient: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(environment.path + '/author/list');
  }

  deleteAuthor(authorId) {
    this.httpClient.get(environment.path + '/author/delete/' + authorId).subscribe();
  }
}
