import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class FileEntry{
  id: number;
  name: string;
  owner: string;
  constructor(id: number, name: string, owner: string){
    this.id = id;
    this.name = name;
    this.owner = owner;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File, owner: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('owner', String(owner));

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<FileEntry[]> {
    let obs = this.http.get(`${this.baseUrl}/files`)
      .pipe(map(response => <FileEntry[]>response));
    
    return obs;
  }

  getDownloadLink(file_id): string{
    return this.baseUrl + "/files/" + file_id;
  }
}
