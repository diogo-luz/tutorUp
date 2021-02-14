import { useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import Onboarding from '../../components/Onboarding';

function OnboardingPage(){
    const [title, setTitle] = useState("Encontre vários professores para ensinar você.");
    const [pageNumber, setPageNumber] = useState(1);
    const {navigate} = useNavigation();
    useEffect(()=>{
        const backAction = () =>{
            return true
        }
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () =>{return false}
        );
        return () => backHandler.remove();
    },[])
    function handleJumpPage(){
        if (pageNumber === 2){
            navigate('Login')
            
            return
        }
        setTitle("Ou dê aulas sobre o que você mais conhece.");
        setPageNumber(2);
    }
    return (
        <View>
            <Onboarding title={title} number={pageNumber} onPressButton={handleJumpPage} />
        </View>
    )
}

export default OnboardingPage;