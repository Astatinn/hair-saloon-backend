// src/firebase/firebase.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  private firebase: admin.app.App;

  constructor() {}

  public initialize(): admin.app.App {
    if (!this.firebase) {
      const serviceAccountPath: string =
        process.env.GOOGLE_APPLICATION_CREDENTIALS ||
        path.resolve(__dirname, '../../src/firebase/caashier-device.json');

      if (!fs.existsSync(serviceAccountPath)) {
        throw new Error(`Firebase service account file not found at ${serviceAccountPath}`);
      }

      this.firebase = admin.initializeApp({
        credential: admin.credential.cert(require(serviceAccountPath)),
      });
    }
    return this.firebase;
  }
}
