import React, {createContext,useState} from 'react'
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
// import { NavigationHelpersContext } from '@react-navigation/native';

interface  AuthContextData{
    signed: boolean,
    user: User | null,
    authorization(email?:string, password?:string,UseToken?:Boolean,save?:Boolean): Promise<void>,
    logout:Function
}

interface User {
    id:Number,
    name:string,
    lastName:string,
    email:string
}

const AuthContext = createContext <AuthContextData> ({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
    const [user,setUser] = useState<User|null>(null) 

    function logout (){

        // localStorage.removeItem("@Proffy/token")
        AsyncStorage.removeItem('token')
        setUser(null);

    }
    async function authorization(email?:string,password?:string, UseToken?:Boolean,save?:Boolean){
        
        if (UseToken){
            await AsyncStorage.getItem('token').then( async (response) => {
                if (response){
                    const respPost = await api.post("auth",{},{headers:{
                        'authorization': `Baerer ${response}`
                        }}
                    )
                    if (respPost.data !== null){
                        setUser(respPost.data.user);
                    }  
                }       
            });
            
            return ;
        }

        const response = await api.post("auth",{
            email,
            password
        })

        if (response.data === null){            
            alert("Erro no login")
            setUser(null)
            
        }else{
            setUser(response.data.user)
            if (save){                
                await AsyncStorage.setItem('token',response.data.token);
            }

            alert("Login com sucesso")    
        }
    } return(
        <AuthContext.Provider value= {{signed: !!user, user,authorization,logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;