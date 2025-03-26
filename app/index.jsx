import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
import { router } from 'expo-router';

const Index = () => {

    const handleLogin = () => {
        // Here you can add authentication logic
        router.push("/(tabs)"); // ✅ Navigate to Tab Screen
      };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View className="flex-1  bg-white px-6  items-center">
      {/* Logo */}
      <View style={{marginTop:80,marginBottom:30}} className="items-center mb-8">
        <Image source={require("../assets/images/Medtrix_logo.jpg")} className="w-[250px] " resizeMode="contain" />
      </View>

      {/* Login Form */}
      <View className="bg-[#F0F0F0] p-6 pt-8 pb-8 w-full min-h-[400px] justify-between max-w-lg rounded-[20px] shadow-lg"
        style={{
          shadowColor: "#091E42",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Text className="text-[24px] font-semibold mb-4 text-center text-gray-800">Project Management Portal</Text>

        {/* Email Label & Input */}
        <View className="mb-4">
          <Text className="text-gray-700 text-[15px] pl-1 font-medium mb-1">Email</Text>
          <TextInput
            placeholder="Enter email"
            keyboardType="email-address"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
            className="bg-white h-[50px] p-3 rounded-[12px] text-gray-700"
            style={{
                shadowColor: "rgba(0, 0, 0, 0.4)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
                // Android Elevation
                elevation: 3,
  
            }}
          />
        </View>

        {/* Password Label & Input */}
        <View className="mb-4">
          <Text className="text-gray-700 text-[15px] pl-1 font-medium mb-1">Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="black"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="bg-white h-[50px] p-3 rounded-[12px]  text-gray-700"
            style={{
                shadowColor: "rgba(0, 0, 0, 1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
                // Android Elevation
                elevation: 3,
  
            }}
          />
        </View>

        {/* Remember Me & Forgot Password */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <Checkbox
              status={rememberMe ? 'checked' : 'unchecked'}
              onPress={() => setRememberMe(!rememberMe)}
              color="red"
            />
            <Text className="ml-2 text-gray-700">Remember Me</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-red-700 font-medium">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity className="bg-black py-4 h-[50px] rounded-[12px]" onPress={handleLogin}>
          <Text className="text-center text-white font-semibold text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
