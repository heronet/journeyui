import { Injectable } from '@angular/core';
import { HubConnection, HttpClient } from '@microsoft/signalr';
import { Subject, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthDto } from '../auth/authdto';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private signalRErrorSource = new Subject<Error>();
  signalRError$ = this.signalRErrorSource.asObservable();

  private signalrConnectedSource = new ReplaySubject<boolean>(1);
  signalrConnected$ = this.signalrConnectedSource.asObservable();

  private SIGNALR_URL = environment.signalRUrl;
  connection: HubConnection | undefined;

  initSignalR(authDto: AuthDto) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) return;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.SIGNALR_URL}/book`, {
        accessTokenFactory: () => authDto.token,
      })
      .withAutomaticReconnect()
      .build();

    this.connection.start().catch((err) => {
      this.signalRErrorSource.next(err);
      console.log(err);
    });

    this.connection.on('connected', (userId) => {
      console.log(`${userId} Connected`);

      this.signalrConnectedSource.next(true);
    });
    this.connection.on('disconnected', (userId) => {
      console.log(`${userId} disconnected`);
      this.signalrConnectedSource.next(false);
    });
  }
  stopSignalR() {
    if (this.connection?.state === signalR.HubConnectionState.Connected)
      this.connection.stop().catch((err) => console.log(err));
  }
}
