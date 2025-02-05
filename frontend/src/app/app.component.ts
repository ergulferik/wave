import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { WebsocketService } from './websocket.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'wave';
  waves: { count: number; x: number; y: number }[] = [];

  constructor(private websocketService:WebsocketService,private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.websocketService.getWaves().subscribe((waves: any) => {
      this.waves = waves;
    });

    this.websocketService.getMouseMove().subscribe((mouseData: any) => {
      this.move(mouseData);
    });
  
    setInterval(() => {
      window.scrollTo({ top: window.screenY, left: window.screenX, behavior: 'smooth' });
    }, 100); 

    document.addEventListener('click', (event: MouseEvent) => {
      this.wave(event)
    });

    document.addEventListener('mousemove', (event: MouseEvent) => {
      this.websocketService.sendMouseMove({ x: event.pageX, y: event.pageY })
    });
  }
  

  wave(event: MouseEvent): void {
    const wave = { x: event.pageX, y: event.pageY };
    this.websocketService.sendWave(wave);
  }

  move(mouseData: { x: number; y: number }){
    requestAnimationFrame(() => {
      this.createTrail(mouseData.x, mouseData.y);
    });

  }

  createTrail(x: number, y: number) {
    const trail = this.renderer.createElement('div');
    this.renderer.addClass(trail, 'cursor-trail');
    
    this.renderer.setStyle(trail, 'left', `${x}px`);
    this.renderer.setStyle(trail, 'top', `${y}px`);

    this.renderer.appendChild(this.el.nativeElement, trail);

    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, trail);
    }, 500); 
  }
}