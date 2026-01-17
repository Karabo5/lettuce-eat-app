import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../theme/colors';


const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
            
             uri: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg',
         
        }}
        style={styles.image}
        imageStyle={{ opacity: 0.6 }}
  
      >

        <Text style={styles.logo}>LettUce🍃 {'\n'} Eat!</Text>

        <View style={styles.content}>

            <Text style={styles.title}>
                <Text style={styles.highlight}>LettUce{'\n'}</Text>
                <Text style={{ color: COLORS.text }}>Feed Your </Text>
                <Text style={{ color: COLORS.brown }}>Cravings!</Text>
            </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>
              Don’t have an account? <Text style={styles.link}>Register now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 40,
    
  },
  content: {
    marginBottom: 60,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 30,
  },
  highlight: {
    color: COLORS.darkGreen,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    textAlign: 'center',
    color: COLORS.gray,
  },
  link: {
    color: COLORS.darkGreen,
    fontWeight: '600',
  },
  cravings: {
  color: COLORS.brown,
},

});


export default HomeScreen;

