import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private waves: { count: number; x: number; y: number }[] = [];
  counter = 0;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('wave')
  handleWave(@MessageBody() wave: { x: number; y: number }) {

    const newWave = { count: this.counter, x: wave.x, y: wave.y };
    this.counter++;

    this.waves.push(newWave);
    console.log('Received wave:', newWave);


    setTimeout(() => {
      this.waves = this.waves.filter(w => w !== newWave);
      console.log('Wave removed:', newWave);


      this.server.emit('updateWaves', this.waves);
    }, 2000);


    this.server.emit('updateWaves', this.waves);
  }
  
  @SubscribeMessage('mousemove')
  handleMouseMove(@MessageBody() mouseData: { x: number; y: number }) {
    console.log('Received mouse move:', mouseData);
    this.server.emit('updateMouseMove', mouseData);

  }

}
