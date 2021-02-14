import {ImageBackground, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        height: "100%",
    },
    header:{
        height:"40%",
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
    image:{
        width: 120,
        height: 120,
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
        fontFamily:"Poppins_400Regular",
        color:"#6A6180",
        fontSize:24,
        width: 210,
        marginTop:25,
    },
    bottom:{
        flex:1,
        backgroundColor: "#E5E5E5"
    },
    footer:{        
        marginTop:100,        
        marginLeft:40,
        marginRight:20,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center" 
    },
    balls:{
        flexDirection:'row',
        width: 20,
        justifyContent:"space-between"
    },
    ball:{
        width:5,
        height:5,
        borderRadius:5,
        backgroundColor: "#C1BCCC"
    },
    ballSelected:{
        backgroundColor: "#8257E5"
    }
})

export default styles;