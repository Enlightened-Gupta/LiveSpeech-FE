import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
// Helper function to get user role from token
const getUserRole = (): string => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.Role || ''; // Extract the role from token
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
  return '';
};
export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userRole = getUserRole();
  if (userRole === 'Admin') {
    return true; // Allow access if user is an Admin
  }
  return false;
};
