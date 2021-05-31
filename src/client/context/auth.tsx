import * as React from 'react';
import { useRouter } from 'next/router';
import { STORAGE } from '../StorageAdapter';

const AuthContext = React.createContext(null);

function AuthProvider({ children } : any) {

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const token = STORAGE.getToken()
        if (!(token === null || token === undefined)) {
            login()
        }
        setIsLoading(false);
    }, []);

    const login = () => setIsAuthenticated(true);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                isLoading,
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
