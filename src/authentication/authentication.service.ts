import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UpdateDto } from './dto/update.dto'; // Assuming you have a DTO for updating user
import * as bcrypt from 'bcrypt';  // For password hashing
import { Authentication } from './authentication.entity';  // Use Authentication entity
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class AuthService {
  private firebaseAdmin;

  constructor(
    private readonly firebaseService: FirebaseService,
    @InjectRepository(Authentication) private authenticationRepository: Repository<Authentication>, // Inject Authentication repository
  ) {
    this.firebaseAdmin = firebaseService.initialize();  // Initialize Firebase Admin
  }

  // Register a new user
  async register(registerDto: RegisterDto) {
    const { email, password, role, firstName, lastName } = registerDto;

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Prepare user data
      const authenticationData = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        firebaseUid: '', // Firebase UID will be set after user creation
        registration_date: new Date(),
      };

      // Create the user in Firebase
      const firebaseUser = await this.firebaseAdmin.auth().createUser({
        email,
        password, // You can pass the plain password to Firebase, it will hash it automatically
        displayName: `${firstName} ${lastName}`,
      });

      // Store the Firebase UID in the local database
      authenticationData.firebaseUid = firebaseUser.uid;

      // Save the user to the Authentication table
      const authentication = this.authenticationRepository.create(authenticationData);
      await this.authenticationRepository.save(authentication);

      return {
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
        user: { email, role },
      };
    } catch (error) {
      throw new BadRequestException(`Error registering user: ${error.message}`);
    }
  }

  // Login an existing user
  async login(email: string, password: string) {
    try {
      // Check if the user exists in the local database
      const authentication = await this.authenticationRepository.findOne({ where: { email } });
      if (!authentication) throw new NotFoundException('User not found in local database.');

      // Verify password (local verification)
      const passwordMatch = await bcrypt.compare(password, authentication.password);
      if (!passwordMatch) {
        throw new BadRequestException('Invalid credentials');
      }

      // Firebase authentication (get user by email)
      const user = await this.firebaseAdmin.auth().getUserByEmail(email);
      if (!user) throw new NotFoundException('User not found in Firebase.');

      return { uid: user.uid, message: 'Login successful' };
    } catch (error) {
      throw new BadRequestException(`Error logging in: ${error.message}`);
    }
  }

  // Update user details in Firebase and database
  async updateUser(uid: string, updateData: UpdateDto) {
    try {
      // Update user details in Firebase
      const updatedUser = await this.firebaseAdmin.auth().updateUser(uid, {
        email: updateData.email,
        displayName: `${updateData.firstName} ${updateData.lastName}`,
        password: updateData.password, // Optional: update password
      });

      // Optionally update other fields in your local DB
      const authentication = await this.authenticationRepository.findOne({ where: { firebaseUid: uid } });

      if (!authentication) {
        throw new NotFoundException('User not found in database.');
      }

      // Update the user data in your local database
      if (updateData.email) authentication.email = updateData.email;
      if (updateData.firstName) authentication.firstName = updateData.firstName;
      if (updateData.lastName) authentication.lastName = updateData.lastName;
      if (updateData.password) authentication.password = await bcrypt.hash(updateData.password, 10); // Hash password before saving

      await this.authenticationRepository.save(authentication); // Save the updated user in the database

      return updatedUser;
    } catch (error) {
      throw new NotFoundException(`Error updating user: ${error.message}`);
    }
  }
  async validateToken(idToken: string): Promise<any> {
  
    try {
      const firebaseCheck = await this.firebaseAdmin.auth().verifyIdToken(idToken);
      console.log(firebaseCheck);
      //return await this.firebaseService.initialize().auth().verifyIdToken(idToken);
      return firebaseCheck;
     
    } catch (error) {
      throw new Error('Invalid or expired token');
      
    }
   
  }

}
