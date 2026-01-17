import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS } from '../theme/colors';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleRegister = () => {
    if (
      !name ||
      !surname ||
      !email ||
      !password ||
      !contact ||
      !address ||
      !cardName ||
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log('Registering user:', {
      name,
      surname,
      email,
      contact,
      address,
      cardName,
      cardNumber,
      expiry,
      cvv,
    });

    Alert.alert('Success', 'Account created successfully');
    navigation.navigate('Login');
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.title}>
        <Text style={styles.createText}>Create </Text>
        <Text style={styles.accountText}>Account</Text>
      </Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Surname"
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Contact Number"
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        placeholder="Cardholder Name"
        style={styles.input}
        value={cardName}
        onChangeText={setCardName}
      />
      <TextInput
        placeholder="Card Number"
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <View style={styles.row}>
        <TextInput
          placeholder="MM/YY"
          style={[styles.input, styles.halfInput]}
          value={expiry}
          onChangeText={setExpiry}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="CVV"
          style={[styles.input, styles.halfInput]}
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"

        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.link}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  createText: {
    color: COLORS.text,
  },
  accountText: {
    color: COLORS.primary,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 30,
  },
  link: {
    color: COLORS.darkGreen,
    fontWeight: '600',
  },
});

export default RegisterScreen;
