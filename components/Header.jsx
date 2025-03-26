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
        <Text className='text-[20px] mr-2 font-bold'>Hello Abc</Text>
      <View>
      <Image source={require('../assets/images/Avatar.png')} className="w-12 h-12 bg-red-700" resizeMode="contain" />
      </View>
        
     
        
      </TouchableOpacity>
    
    </View>
  );
};

export default Header;
