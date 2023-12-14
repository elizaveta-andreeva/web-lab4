import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {io} from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public message$: BehaviorSubject<{ author: string; text: string; date: Date }[]> = new BehaviorSubject<{
    author: string;
    text: string;
    date: Date
  }[]>([]);

  constructor() {
  }

  socket = io('http://localhost:3000');

  public sendMessage(message: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
