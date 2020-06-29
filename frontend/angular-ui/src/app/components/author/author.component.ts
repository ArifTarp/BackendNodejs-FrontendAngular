import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from '../../models/author';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {
  constructor(
    private authorService: AuthorService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  authors: Author[];
  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
    });
  }

  logOut() {
    this.authService.logOut();
    this.toastr.info('Goodbye User...');
    this.router.navigateByUrl('/login');
  }

  deleteAuthor(authorId){
    this.authorService.deleteAuthor(authorId);
    this.toastr.info('Author Deleted');
    this.getAuthors()
    
  }
}
