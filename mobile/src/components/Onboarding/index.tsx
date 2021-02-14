import React from 'react';
import {View,Text, ImageBackground, Image } from 'react-native';
import bgStudy from '../../assets/images/backgroundStudy.png';
import bgTeacher from '../../assets/images/backgroundTeacher.png';
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'


// const image = { uri: "https://reactjs.org/logo-og.png" };

import styles from './styles'
import { BorderlessButton } from 'react-native-gesture-handler';
import nextIcon from '../../assets/images/icons/next.png';
interface OnboardingProps{
    title:string,
    number:number,
    onPressButton():void
}

const Onboarding:React.FC<OnboardingProps> = ({title,number,onPressButton}) => {
    return (
        <View style={styles.container}>

            <View style={[styles.header, number === 2 ? {backgroundColor:"#04D361"} : {} ]}>
                <ImageBackground  

                    source={ number === 1 ? bgStudy : bgTeacher}
                    style={styles.bgImage}                    
                    resizeMode="center"
                    imageStyle={{width:"100%", height:"100%"}}
                >
                    <Image source={ number === 1 ? studyIcon : giveClassesIcon } style={styles.image}/>
                </ImageBackground>
            </View>
            <View style={styles.bottom}>
                <View style={styles.mid}>
                    <Text  style={styles.number}>
                        0{number}.
                    </Text>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <View style={styles.balls}>
                        <View style={[styles.ball, number === 1 ? styles.ballSelected : {} ] } />
                        <View style={[styles.ball, number === 2 ? styles.ballSelected : {} ] } />
                    </View>

                    <BorderlessButton onPress={ onPressButton }>
                        <Image source={nextIcon}  resizeMode="contain"/>                    
                    </BorderlessButton>
                </View>
            </View>
        </View>
    )
}

export default Onboarding;