import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import "nativewind";
import RenderItem from "../../components/Assets/RenderItem";

const initialAssets = [
  { id: 1, name: "Samsung Tab S8", icon: "tablet", taken: false },
  { id: 2, name: "Laptop Lenovo", icon: "laptop", taken: false },
  { id: 3, name: "MacBook", icon: "laptop-mac", taken: true },
  { id: 4, name: "OnePlus 9R 5G", icon: "smartphone", taken: false },
  { id: 5, name: "iPad Pro (5th Gen)", icon: "tablet-android", taken: false },
  { id: 6, name: "iPad Mini (6th Gen)", icon: "tablet", taken: true },
  { id: 7, name: "Apple iPhone 13", icon: "smartphone", taken: false },
  { id: 8, name: "OnePlus 12", icon: "smartphone", taken: false },
  { id: 9, name: "iPad PRO(MNC-007)", icon: "tablet-android", taken: true },
  { id: 10, name: "Apple iPhone 15", icon: "smartphone", taken: false },
  { id: 11, name: "iPad Charging", icon: "power", taken: false },
  { id: 12, name: "Android Tab Charger", icon: "power", taken: true },
  { id: 13, name: "iPad Cables", icon: "cable", taken: false },
];

const Assets = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [textInput, setTextInput] = useState("");

  // Handle asset selection
  const handlePress = (id) => {
    if (selectedAssets.includes(id)) {
      setSelectedAssets(selectedAssets.filter((assetId) => assetId !== id));
    } else {
      setSelectedAssets([...selectedAssets, id]);
    }
  };

  // Handle submit and show modal
  const handleSubmit = () => {
    if (selectedAssets.length > 0) {
      setModalVisible(true);
    } else {
      alert("Please select at least one asset.");
    }
  };

  // Handle text input change
  const handleTextInputChange = (text) => {
    setTextInput(text);
  };

  // Handle the actual form submission
  const handleModalSubmit = () => {
    if (!textInput.trim()) {
      alert("Please enter some text before submitting.");
      return;
    }

    // Update assets to mark selected ones as taken
    const updatedAssets = assets.map((asset) => {
      if (selectedAssets.includes(asset.id)) {
        return { ...asset, taken: true }; // Mark asset as taken
      }
      return asset;
    });

    setAssets(updatedAssets); // Update the state with the modified assets
    setModalVisible(false); // Close modal after submit
    setTextInput(""); // Reset input field
    setSelectedAssets([]); // Clear selected assets
  };

  // Handle cancel action in modal
  const handleCancelModal = () => {
    setModalVisible(false); // Close modal
    setTextInput(""); // Reset input field
  };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity
  //     onPress={() => !item.taken && handlePress(item.id)}
  //     className={`w-28 h-36 m-2 p-3 rounded-xl items-center justify-between 
  //     ${selectedAssets.includes(item.id) ? "bg-[#d0e4cd]" : item.taken ? "bg-red-400 opacity-50" : "bg-[#e3e6e3]"}`}
  //     disabled={item.taken}
  //   >
  //     <MaterialIcons name={item.icon} size={40} color="black" />
  //     <Text className="text-xs text-center mt-2">{item.name}</Text>
  //     <TouchableOpacity onPress={() => !item.taken && handlePress(item.id)}>
  //       {selectedAssets.includes(item.id) ? (
  //         <MaterialIcons name="check-box" size={24} color="gray" />
  //       ) : (
  //         <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
  //       )}
  //     </TouchableOpacity>
  //   </TouchableOpacity>
  // );

  return (
    <View className="flex-1  ">
      {/* Gradient Header */}
      <View className='flex justify-between items-center pb-4 pl-4 pr-4'>
        <Text className="text-black font-bold text-center  mb-4  text-lg">Assets Management</Text>
        {/* Submit Button */}
        <View className='backdrop-opacity-0 flex justify-start items-center'>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={selectedAssets.length === 0}
          >
            <LinearGradient
              colors={selectedAssets.length > 0 ? ["#D01313", "#6A0A0A"] : ['#D1D5DB', '#D1D5DB']} // Cyan to Blue gradient or Gray
              style={{
                padding: 12,
                borderRadius: 9999, // Full border radius for a rounded button
                width: 160,
                alignItems: 'center',
              }}
            >
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
                opacity: selectedAssets.length === 0 ? 0.5 : 1,
              }}>
                {selectedAssets.length === 0 ? "Select assets" : "Proceed"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={assets}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => <RenderItem item={item} selectedAssets={selectedAssets} handlePress={handlePress} />}
        contentContainerClassName="items-center "
        showsVerticalScrollIndicator={false}
      />

      {/* Modal for Text Input */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
  <View className="flex-1 justify-center items-center bg-black/50">
    <View className="bg-white p-5 rounded-lg w-[90%]">
      <Text className="text-lg font-bold mb-4">Enter Details</Text>
      <TextInput
        value={textInput}
        onChangeText={handleTextInputChange}
        placeholder="Enter text"
        className="border border-gray-300 h-12 p-2 rounded mb-4"
      />
      {/* Button Container with Row Layout */}
      <View className="flex-row justify-between">
        {/* Submit Button with Gradient */}
        <TouchableOpacity 
          onPress={handleModalSubmit}
          className="flex-1 mr-2" // Adds space between buttons
        >
          <LinearGradient
            colors={['#D01313', '#6A0A0A']} // Gradient colors
            style={{
              padding: 10,
              borderRadius: 9999,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Submit
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity onPress={handleCancelModal} className="flex-1">
          <View className="bg-gray-100 p-3 rounded-full justify-center items-center">
            <Text className="text-red-500 text-center font-bold">Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
};

export default Assets;
