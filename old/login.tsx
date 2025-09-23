import ArrowBackButton from '@/components/ArrowBackButton'
import FormLogin from '@/components/FormLogins'
import LoginIcons from '@/components/LoginIcons'
import LogoIcons from '@/components/LogoIcons'
import { useRouter } from 'expo-router'
import React from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const Login = () => {
    const router = useRouter()
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Navbar */}
        <View style={styles.navBar}>
          <ArrowBackButton onPress={() =>router.replace('/start')} />
          <LoginIcons />
        </View>

        {/* Logo */}
        <View style={styles.logoWrapper}>
          <LogoIcons />
        </View>

        {/* Main Content */}
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>
            Welcome to {"\n"} the world{" "}
            <Text style={styles.highlight}>explorer!</Text>
          </Text>

          {/* Login Form */}
          <FormLogin onSubmit={() => {}} />
        </View>

        {/* Footer Links */}
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.footerText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.footerText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // adaptive top padding
    paddingBottom: 10,
  },
  logoWrapper: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222222',
    lineHeight: 34,
    marginBottom: 20,
  },
  highlight: {
    color: '#FF455B',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    borderBottomWidth: 1,
  },
})
