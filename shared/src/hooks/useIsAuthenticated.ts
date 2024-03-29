import { useContext } from 'react';
import { AuthContext } from '@pub-quiz/web-app/src/components/admin/IsAuthenticatedProvider';

export const useIsAuthenticated = () => {
  return useContext(AuthContext);
};
