import React, { useState,useContext,useEffect } from 'react';
import { View,Text, ImageBackground, Image, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { useNavigation} from '@react-navigation/native';
import background from '../../assets/images/backgroundLogin.png'
import logoImg from '../../assets/images/logo.png'
import styles from './styles'
import { BorderlessButton } from 'react-native-gesture-handler';
import InputBlock from '../../components/InputBlock';

import {Ionicons} from '@expo/vector-icons';
import AuthContext from '../../hooks/auth';

function Login(){
    const {navigate} = useNavigation();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [passwordVisible,setPasswordVisible] = useState(false)
    const [saveCheckBox, setSaveCheckBox] = useState(false)
    const [filled, setSaveFilled] = useState(false)
    
    const {authorization,user} = useContext(AuthContext);
    
    useEffect(
        ()=>{
            setSaveFilled(email!== "" && password !== "")
        },
        [email,password]
    )

    async function handleAuthorization(){
        if (!filled){
            alert("Preencha todos os dados.")
            return
        }
        await authorization(email,password,false,saveCheckBox);   
    }
    
    function handleGoToLanding(){
        navigate("Landing");
    }
    
    function handlePasswordVisible(){
        setPasswordVisible(!passwordVisible)
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.header} >
                <ImageBackground  

                    source={background}
                    style={styles.bgImage}                    
                    resizeMode="center"
                    imageStyle={{width:"100%", height:"100%"}}
                >
                    <View style={styles.headerContainer}>                      
                        <Image source={logoImg} style={styles.image} />
                        <Text style={styles.title}>Sua plataforma de estudos online.</Text>  
                    </View> 
                </ImageBackground>
            </View>
            <View style={styles.bottom}>
                <View style={styles.bottomContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelTitle}>
                            Fazer Login
                        </Text>
                        <BorderlessButton  onPress={handleGoToLanding}>
                            <Text style={styles.labelLeft}>
                                Criar uma conta
                            </Text>                   
                        </BorderlessButton>
                    </View>
                    <View style={styles.inputsContainer}>
                        <InputBlock 
                            label="E-mail"
                            value={email}
                            onChangeText={ text => setEmail(text) }
                            addStyles={styles.firstInput}                          
                            
                        />                        
                        <InputBlock 
                            label="Senha"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={ text => setPassword(text) }
                            addStyles={styles.endInput} 
                        >
                            <BorderlessButton style={styles.passwordButton} onPress={handlePasswordVisible}>
                                <Ionicons  name={ passwordVisible ?"ios-eye-off":"ios-eye"} size={20}/>                  
                            </BorderlessButton>
                        </InputBlock>
                    </View>

                    <View style={styles.options}>
                        <View style={styles.viewCheckbox} > 
                            <CheckBox                 
                                value={saveCheckBox}
                                onValueChange={(value) => setSaveCheckBox(value)} 
                            />
                            <Text style={styles.textOptions}>
                                Lembrar-me
                            </Text>
                        </View> 
                        <BorderlessButton  onPress={handleGoToLanding}>
                            <Text style={styles.textOptions}>
                                Esqueci minha senha
                            </Text>                   
                        </BorderlessButton>
                        
                    </View> 
                    
                    <BorderlessButton style={[styles.buttonEntrar,filled ?{backgroundColor:"#04D361"}: {}]} onPress={handleAuthorization}>
                        <Text style={[styles.textButtonEntrar,filled ?{color:"white"}: {}]}>
                           Entrar
                        </Text>                   
                    </BorderlessButton>
                </View>
            </View>
        </View>
    )
};

export default Login;