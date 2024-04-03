import * as admin from 'firebase-admin'

export const firebaseProvider = {
  provide: 'FIREBASE_APP',
  useFactory: () => {
    const firebaseConfig = {
      // type: configService.get<string>('TYPE'),
      // private_key_id: configService.get<string>('PRIVATE_KEY_ID'),
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      // client_id: configService.get<string>('CLIENT_ID'),
      // auth_uri: configService.get<string>('AUTH_URI'),
      // token_uri: configService.get<string>('TOKEN_URI'),
      // auth_provider_x509_cert_url: configService.get<string>('AUTH_CERT_URL'),
      // client_x509_cert_url: configService.get<string>('CLIENT_CERT_URL'),
      // universe_domain: configService.get<string>('UNIVERSAL_DOMAIN'),
    } as admin.ServiceAccount

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    })
  },
}
