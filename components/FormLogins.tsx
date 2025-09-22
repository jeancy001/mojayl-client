import React, { useState } from 'react'
import {
    GestureResponderEvent,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import ArrowCircleButton from './ArrowCircleButton'

interface FormLoginProps {
  onSubmit: (email: string, password: string) => void
}

const FormLogin: React.FC<FormLoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (event: GestureResponderEvent) => {
    onSubmit(email, password)
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#AAAAAA"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#AAAAAA"
          />
        </View>

        {/* Bottom row: Sign In text + arrow button */}
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <ArrowCircleButton onPress={() => {}} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default FormLogin

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: 'center',
  },
  inputWrapper: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    fontSize: 16,
    color: '#222222',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  signInText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // black text
  },
})
