import { StyleSheet} from 'react-native'
export const API_BASE ="http://192.168.254.146:4001"
// colors


exports.colors ={
    primary: "#28509f",
    secondary: "#3367c2",
    info    : "#feffff",
    warning: "#f1d153",
    navColor:"#7ca4f2",
    gradientBackground:[
        "#1e408d",
        "#3663c1"
    ]
}

exports.headerStyle =  StyleSheet.create({
    appHeader: {
        flex: 0,
        height: 100,
        width: '100%',
        padding: 10,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'#28509f',
        
      },
      logoBox: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
      },
      logo: {
        width: 80,
        height: 80,
      },
      appTitle: {
        fontSize: 18,
        color: "#f1d153",
        fontWeight: 'bold',
        marginLeft:10
      },
      profile: {
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 50,
        borderColor: "#f1d153",
        borderWidth: 1,
        width: 50,
        height: 50,
        flex: 0,
        marginRight:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      },
      
})

// eas build -p android --profile preview