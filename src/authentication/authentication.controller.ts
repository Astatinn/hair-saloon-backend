import { Controller, Post, Body, Patch, Param, Put, UseGuards, BadRequestException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UpdateDto } from './dto/update.dto';
import { AuthService } from './authentication.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

 
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;

    // Call AuthService to validate user and get a JWT
    const token = await this.authService.login(email, password);

    if (!token) {
      throw new BadRequestException('Invalid credentials');
    }

    return { token };
  }
  
  @Post('verify-token')  // Make sure this is defined correctly
  async verifyToken(@Body() { idToken }: { idToken: string }) {
    try {
      const decodedToken = await this.authService.validateToken(idToken);
      return { decodedToken };
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }


  @UseGuards(AuthGuard)  // Protect this route with AuthGuard
  @Patch('update')
  async update(@Body() updateDto: UpdateDto) {
    return this.authService.updateUser(updateDto.uid, updateDto);
  }

  @UseGuards(AuthGuard)  // Protect this route with AuthGuard
  @Put('update/:uid')
  async updateFull(@Param('uid') uid: string, @Body() updateDto: UpdateDto) {
    return this.authService.updateUser(uid, updateDto);
  }
}
