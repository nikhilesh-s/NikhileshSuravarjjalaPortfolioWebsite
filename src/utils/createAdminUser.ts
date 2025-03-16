import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

/**
 * This is a utility function to create an admin user for your portfolio
 * You should run this once to create your admin account, then use
 * the credentials to log in to your admin dashboard.
 * 
 * Usage example (in browser console or a component):
 * 
 * import { createAdminUser } from './utils/createAdminUser';
 * createAdminUser('your-email@example.com', 'your-secure-password');
 */
export const createAdminUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Admin user created successfully:', user.uid);
    return user;
  } catch (error: any) {
    console.error('Error creating admin user:', error.message);
    throw error;
  }
};
