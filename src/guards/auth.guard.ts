// src/auth/auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    // Ensure the token is provided
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token is missing or malformed');
    }

    const idToken = authorizationHeader.split('Bearer ')[1];

    try {
      // Verify the token
      const decodedToken = await this.firebaseService.initialize().auth().verifyIdToken(idToken);
      
      // Attach the decoded token to the request object for further use in the controllers
      request.user = decodedToken;
      
      return true; // Token is valid
    } catch (error) {
      // Handle specific Firebase verification errors
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
