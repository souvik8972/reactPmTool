import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';

const Header = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    router.replace('/login'); // Navigate to login screen
  };

  return (
    <View className="flex-row items-center justify-between p-6 shadow-md">
      {/* Left Logo */}
      <Image source={require('../assets/images/icon.png')} className="w-28 h-12" resizeMode="contain" />
      
      {/* Right Profile Image */}
      <TouchableOpacity className="px-4 py-3 flex flex-row items-center" onPress={() => setModalVisible(true)}>
        <Text className="text-[20px] mr-2 font-bold">Hello Abc</Text>
        <Image source={require('../assets/images/Avatar.png')} className="w-12 h-12 bg-red-700" resizeMode="contain" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal animationType="fade" transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-10 rounded-lg w-80 items-center">
            <Text className="text-xl font-bold mb-4">Hello, Abc</Text>
            
            <TouchableOpacity onPress={handleLogout} className="w-full rounded-full overflow-hidden">
            <LinearGradient
                colors={['#D01313', '#6A0A0A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 30 }}
              >
                <Feather name="log-out" size={22} color="white" style={{ marginRight: 8 }} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-3">
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;
