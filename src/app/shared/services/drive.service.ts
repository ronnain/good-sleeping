import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  pseudo;
  token;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllFilesFromDrive() {
    this.getIndentifiants();
    return this.http.get<any>(environment.serverConfig.serverURL + `?method=getAllFilesFromDrive&pseudo=${this.pseudo}&token=${this.token}`);
  }

  getArticleData(articleName:string) {
    this.getIndentifiants();
    return this.http.get<any>(environment.serverConfig.serverURL + `?method=getArticleDriveData&articleName=${articleName}&pseudo=${this.pseudo}&token=${this.token}`);
  }

  /**
   * Send online or update an article
   * @param article
   * @param articleConfig
   * @param articleCreation
   */
  updateArticle(article, articleConfig, articleCreation, title, metaDesc, updateTextOnly) {
    this.getIndentifiants();
    const body = {
      article,
      articleConfig,
      articleCreation,
      "pseudo": this.pseudo,
      "token": this.token
    };
    if (title) {
      body['title'] = title;
    }
    if (metaDesc) {
      body['metaDesc'] = metaDesc;
    }
    if (updateTextOnly) {
      body['updateTextOnly'] = true;
    }
    const url = environment.serverConfig.serverURL + '?method=updateArticle';
    return this.http.post<any>(url, body, this.httpOptions);
  }

  retryUploadImg(articleName:string) {
    this.getIndentifiants();
    return this.http.get<any>(environment.serverConfig.serverURL + `?method=retryImgUpload&articleName=${articleName}&pseudo=${this.pseudo}&token=${this.token}`);
  }

  getIndentifiants () {
    this.pseudo = this.authService.getPseudo();
    this.token = this.authService.getToken();
  }
}
