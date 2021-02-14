import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    labelContainer:{
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    labelTitle:{
        color:"#32264D",
        fontSize:24,        
        fontFamily:"Poppins_600SemiBold",
        lineHeight:34,
    },
    labelLeft:{
        color: "#8257E5"
    },
    input:{        
        backgroundColor: "#FFF",
        flex:1,
        paddingLeft:24,
        paddingTop:30,        
        lineHeight:24,
        fontFamily:"Poppins_400Regular",
        fontSize: 14,
        color:"#6A6180",
        borderRadius:8,  
    },
    bar:{
        position:"absolute",
        zIndex:3,
        width:2,
        height:"80%",
        backgroundColor:"#8257E5"
    },
    label:{
        position:"absolute",
        fontFamily:"Poppins_400Regular",
        zIndex:2,        
        fontSize: 14,
        lineHeight:24,
        paddingLeft:24,
        color: "#9C98A6"
    },
    labelAbove:{        
        top:0,
        fontSize:10,
        lineHeight:20,
        marginTop:10
    },
    inputBlock:{
        justifyContent:"center",
        height:65,
    }
})

export default styles;