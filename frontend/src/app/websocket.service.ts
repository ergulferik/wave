import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  private wavesSubject = new Subject<any>();
  private mouseMoveSubject = new Subject<any>();

  constructor() {
    this.socket = io('http://localhost:3000');


    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });


    this.socket.on('updateWaves', (waves: any) => {
      this.wavesSubject.next(waves);
    });

    this.socket.on('updateMouseMove', (mouseData: any) => {
      this.mouseMoveSubject.next(mouseData);
    });
  }

  getMouseMove() {
    return this.mouseMoveSubject.asObservable();
  }

  getWaves() {
    return this.wavesSubject.asObservable();
  }


  sendWave(wave: { x: number; y: number }) {
    this.socket.emit('wave', wave);
  }

  sendMouseMove(mouseData: { x: number; y: number }) {
    this.socket.emit('mousemove', mouseData);
  }
}
