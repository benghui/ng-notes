import Note from '../models/note.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NoteService {
    apiUrl = 'http://localhost:3000';
    noteUrl = `${this.apiUrl}/notes`;
    constructor(private httpClient: HttpClient) { }

    createNote (note: Note): Observable<any> {
        return this.httpClient.post(`${this.noteUrl}`, note);
    }

    getNote(): Observable<Note[]> {
        return this.httpClient.get(this.noteUrl)
        .pipe(map(res => {
            return res['data'].docs as Note[];
        }));
    }

    editNote(note: Note) {
        let editUrl = `${this.noteUrl}`;

        return this.httpClient.put(editUrl, note);
    }

    deleteNote(id: string):any{
        let deleteUrl = `${this.noteUrl}/${id}`;

        return this.httpClient.delete(deleteUrl)
        .pipe(map(res => {
            return res;
        }));
    }

    private handleError(error: any): Promise<any> {
        console.error('error occured', error);

        return Promise.reject(error.message|| error);
    }
}
