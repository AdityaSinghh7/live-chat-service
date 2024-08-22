import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/service/auth.service';
import { UserInterface } from 'src/user/model/user.interface';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({ cors: { origin: ['https://hoppscotch.io', 
  'http://localhost:3000', 'http://localhost:4200'] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {


  constructor(private authService: AuthService, private userService: UserService){}

  @WebSocketServer()
  server;

  title: string[] = [];

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.server.emit('message', 'test');
    
  }

  async handleConnection(socket: Socket) {

    try{
      const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
      // console.log(socket.handshake.headers.authorization);
      const user: UserInterface = await this.userService.getOne(decodedToken.user.id);
      if(!user){
        return this.disconnect(socket);

      } else{
        this.title.push('Value: ' + Math.random().toString());
        this.server.emit('message', this.title);
      }
    } catch{
      return this.disconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
      socket.disconnect();
  }

  private disconnect(socket: Socket){
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
