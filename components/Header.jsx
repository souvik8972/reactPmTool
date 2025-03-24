import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';

const Header = () => {
  return (
    <View className=" flex-row items-center justify-between  p-6 shadow-md">
      
      {/* Left Logo */}
      <Image source={require('../assets/images/icon.png')} className="w-28 h-12" resizeMode="contain" />
      
      {/* Right Profile Image with Notification Badge */}
      <TouchableOpacity  className=" px-4 py-3 flex flex-row   items-center ">
        {/* Profile Image */}
        <Text className='text-[18px]'>Hello Souvik</Text>
        <Feather name="user" size={40} color="black" />
        
     
        
      </TouchableOpacity>
    
    </View>
  );
};

export default Header;
