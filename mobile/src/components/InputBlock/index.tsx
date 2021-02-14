import React, { useState } from "react";
import { View ,Text,TextInput, TextInputProps} from "react-native";
import { Value } from "react-native-reanimated";
import styles from "./styles"
interface InputBlockProps extends TextInputProps{
    label:string,
    value:string,
    addStyles?:Object,
}

 const InputBlock:React.FC<InputBlockProps>= ({label, value,addStyles, children, ...rest}) =>{
    const [focus,setFocus] = useState(false)

    return (
        <View style={styles.inputBlock}>
            
            { focus && <View style={styles.bar}/>}
            <Text  style={[styles.label, (focus || value !=="" ) ? styles.labelAbove:{}  ]}   >{label}</Text>
            
            <TextInput
                style={[styles.input, addStyles]}
                value={value} {...rest}
                onFocus={ ()=> setFocus(true)}
                onBlur={ ()=> setFocus(false)}
            />  
            {children}
        </View>
    );
 }

export default InputBlock;