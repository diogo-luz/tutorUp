import { StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        height: "100%",
    },
    header:{
        height:"50%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#8257E5"
    },
    bgImage:{
        position:"absolute",
        width: "80%",
        height: "80%",
        justifyContent:"center",
        alignItems:"center",
    },
    headerContainer:{
        
    },
    image:{
        width: 170,
        height:65,
        resizeMode:"stretch"
    },
    mid:{
        marginTop:60,
        left:40
    },
    number:{
        fontFamily:'Archivo_400Regular',
        fontSize:40,
        opacity:0.2,
        color: "#6A6180",
    },
    title:{
        color: '#D4C2FF',
        fontFamily:"Poppins_400Regular",
        fontSize:12,
        width: 115,
    },
    bottom:{
        flex:1,
        backgroundColor: "#E5E5E5",
    },
    bottomContainer:{  
        flex:1,
        justifyContent:"space-between",      
        marginLeft:30,
        marginRight:30,
        marginBottom:65,
        marginTop: 50
    },
    inputsContainer:{
        // top:40
    },
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
    firstInput:{
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
    },    
    endInput:{
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
    },
    passwordButton:{
        position:"absolute",
        right: 10,
        height:"100%",
        justifyContent:"center"
    },
    options:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    textOptions:{        
        fontFamily:"Poppins_400Regular",
        fontSize:12,
        lineHeight:24,
        color: "#9C98A6"
    },
    viewCheckbox:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    checkBox:{
        backgroundColor:"white",
        color:"blue"
    },
    buttonEntrar:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#DCDCE5",
        borderRadius:8,
        height:40
    },
    textButtonEntrar:{        
        color:"#9C98A6"
    },

});

export default styles;