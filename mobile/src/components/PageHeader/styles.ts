import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#8257e5',
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40,
    marginBottom: 20,
  },

  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 10,
  }
})

export default styles;