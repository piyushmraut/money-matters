// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//           const parsedUser = JSON.parse(storedUser);
//           setUser(parsedUser);
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error('Error checking auth:', error);
//         logout();
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const fetchUserProfile = async (userId) => {
//     try {
//       const response = await axios.get(
//         'https://bursting-gelding-24.hasura.app/api/rest/profile',
//         {
//           headers: {
//             'content-type': 'application/json',
//             'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
//             'x-hasura-role': 'user',
//             'x-hasura-user-id': userId.toString()
//           }
//         }
//       );
//       return response.data.users[0];
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       throw error;
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       // Step 1: Authenticate and get user ID
//       const authResponse = await axios.post(
//         'https://bursting-gelding-24.hasura.app/api/rest/get-user-id',
//         { email, password },
//         {
//           headers: {
//             'content-type': 'application/json',
//             'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF'
//           }
//         }
//       );
      
//       const userId = authResponse.data.get_user_id[0]?.id;
//       if (!userId) {
//         throw new Error('User not found');
//       }

//       // Step 2: Fetch user profile
//       const profileData = await fetchUserProfile(userId);
      
//       // Combine all user data (including password in session only)
//       const userData = {
//         id: userId,
//         email,
//         password, // Stored temporarily for current session
//         ...profileData
//       };

//       setUser(userData);
//       setIsAuthenticated(true);
      
//       // Store in localStorage without password
//       const { password: _, ...userWithoutPassword } = userData;
//       localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
//       navigate('/');
//     } catch (error) {
//       console.error('Login error:', error);
//       throw new Error('Invalid email or password');
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          setIsAdmin(parsedUser.email === 'admin@gmail.com');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/profile',
        {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role': 'user',
            'x-hasura-user-id': userId.toString()
          }
        }
      );
      return response.data.users[0];
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      // Check if admin
      if (email === 'admin@gmail.com' && password === 'Admin@123') {
        const adminUser = {
          id: 'admin-001',
          email: 'admin@gmail.com',
          name: 'Admin',
          role: 'admin'
        };
        
        setUser(adminUser);
        setIsAuthenticated(true);
        setIsAdmin(true);
        localStorage.setItem('user', JSON.stringify(adminUser));
        navigate('/admin/dashboard');
        return;
      }

      // Regular user authentication
      const authResponse = await axios.post(
        'https://bursting-gelding-24.hasura.app/api/rest/get-user-id',
        { email, password },
        {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF'
          }
        }
      );
      
      const userId = authResponse.data.get_user_id[0]?.id;
      if (!userId) {
        throw new Error('User not found');
      }

      const profileData = await fetchUserProfile(userId);
      
      const userData = {
        id: userId,
        email,
        password, // Stored temporarily for current session
        ...profileData
      };

      setUser(userData);
      setIsAuthenticated(true);
      setIsAdmin(false);
      
      const { password: _, ...userWithoutPassword } = userData;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      isAdmin,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);