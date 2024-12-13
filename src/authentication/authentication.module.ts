// src/authentication/authentication.module.ts
import { Module } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from './authentication.entity';  // Import the Authentication entity
import { AuthService } from './authentication.service';
import { AuthController } from './authentication.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Authentication])],  // Register Authentication entity
  controllers: [AuthController],
  providers: [AuthService, FirebaseService],
  exports: [AuthService,TypeOrmModule],
})
export class AuthenticationModule {}
