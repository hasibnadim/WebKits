import admin from 'firebase-admin'; 
// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  // Initialize Firebase Admin with service account
  // You can either use environment variables for the service account
  // or use the service account key file
  
  const sa = JSON.parse(process.env.FIREBASE || '{}');
  try {
    admin.initializeApp({
      credential: admin.credential.cert(sa as admin.ServiceAccount)
    }); 
    console.log('Firebase Admin initialized with service account');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    
    // Fallback: try to initialize without credentials for development
    // This will work if you have GOOGLE_APPLICATION_CREDENTIALS environment variable set
    try {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || "go2let"
      });
      console.log('Firebase Admin initialized with default credentials');
    } catch (fallbackError) {
      console.error('Failed to initialize Firebase Admin:', fallbackError);
    }
  }
}

// Export Firebase Admin services
export const adminAuth = admin.auth(); 
export default admin;