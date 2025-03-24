import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Collapsible from "react-native-collapsible";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function TaskScreen() {
  const [selectedOption, setSelectedOption] = useState("today");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskData, setTaskData] = useState([
    { id: 1, title: "Learning and Upskilling - Frontend Team - Tech", taskId: "10586", owner: "Shijin Pulikkotil", planned: "06", actual: "06" },
    { id: 2, title: "Backend Development - API Integration", taskId: "20345", owner: "Rahul Sharma", planned: "04", actual: "03" },
    { id: 3, title: "UI Design - Mobile App", taskId: "30876", owner: "Priya Verma", planned: "05", actual: "0" },
  ]);

  const dates = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16", "Sat 17", "Sun 18"];

  const handleDateSelection = (date) => setSelectedDate(date);

  useEffect(() => {
    if (selectedOption === "last7days") {
      handleDateSelection(dates[0]);
    } else {
      handleDateSelection(null);
    }
  }, [selectedOption]);

  const handleActualHoursChange = (text, taskId) => {
    setTaskData((prevTasks) =>
      prevTasks.map((task) => (task.taskId === taskId ? { ...task, actual: text } : task))
    );
  };

  const filteredTasks = taskData.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={selectedOption}
        setValue={setSelectedOption}
        items={[{ label: "Today", value: "today" }, { label: "Yesterday", value: "yesterday" }, { label: "Last 7 Days", value: "last7days" }]}
        style={{ borderColor: "transparent", backgroundColor: "#A31D1D", height: 60 }}
        textStyle={{ color: "white" }}
        dropDownContainerStyle={{ borderColor: "#8B0000", backgroundColor: "white" }}
        listItemLabelStyle={{ color: "black" }}
        selectedItemLabelStyle={{ color: "white" }}
        selectedItemContainerStyle={{ backgroundColor: "#8B0000" }}
        arrowIconStyle={{ tintColor: "white" }}
      />

      <View className="flex-row items-center border border-gray-300 rounded-[12px] h-[60px] p-2 my-4 bg-white">
        <TextInput
          placeholder="Search your task"
          className="flex-1 text-black"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome name="search" size={20} color="gray" className="mr-2" />
      </View>

      
      {selectedOption === "last7days" && (
        <View className="h-[100px] " >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="my-2  ">
          {dates.map((date, index) => (
            <TouchableOpacity key={index} onPress={() => handleDateSelection(date)}>
              {selectedDate === date ? (
                <LinearGradient
                  colors={["#D01313", "#6A0A0A"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ borderRadius: 20, marginRight: 12, height: 80 }}
                >
                  <View className="px-3 py-1 h-[80px] flex justify-center items-center w-[50px] rounded-[20px]">
                    <Text className="text-white font-bold text-sm">{date}</Text>
                  </View>
                </LinearGradient>
              ) : (
                <View className="px-3 py-1 mx-1 h-[80px] flex justify-center items-center w-[50px] mr-3 rounded-[20px] bg-gray-200">
                  <Text className="text-black text-sm">{date}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
      )}
     

      <Text className="text-lg font-bold mb-2">Task list</Text>
      {filteredTasks.length === 0 ? (
        <Text className="text-center text-gray-500">No tasks available</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="h-100">
          {filteredTasks.map((task, index) => (
            <View key={task.id} className="mb-2">
              <TouchableOpacity className="p-3 h-[80px] bg-[#EBEBEB] rounded-lg flex-row justify-between mb-4 items-center" onPress={() => setActiveIndex(activeIndex === index ? null : index)}>
                <Text className="text-black font-semibold text-[14px]">{task.title}</Text>
                <FontAwesome name={activeIndex === index ? "angle-up" : "angle-down"} size={20} color="black" />
              </TouchableOpacity>

              <Collapsible collapsed={activeIndex !== index}>
                <View className="mt-2 p-4 bg-white rounded">
                  <Text className="font-bold">Task Title</Text>
                  <Text>{task.title}{"\n"}#Task: {task.taskId}</Text>

                  <Text className="font-bold mt-2">Task Owner</Text>
                  <Text>{task.owner}</Text>

                  <View className="flex-row justify-between mt-4">
                    <View className="items-center">
                      <Text className="font-bold">Planned Hours</Text>
                      <TextInput className="border border-gray-300 p-2 w-16 text-center" value={task.planned} editable={false} />
                    </View>
                    <View className="items-center">
                      <Text className="font-bold">Actual Hours</Text>
                      <TextInput className="border border-gray-300 p-2 w-16 text-center" keyboardType="numeric" placeholder="00" maxLength={10} onChangeText={(text) => handleActualHoursChange(text, task.taskId)} value={task.actual} />
                    </View>
                  </View>


                  <TouchableOpacity className="w-40 p-3 rounded-lg mt-4">
                  <LinearGradient style={{borderRadius:12}} colors={["#D01313", "#6A0A0A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="w-40 p-3 mt-4">
                      <Text className="text-white text-center p-3 rounded-lg font-bold">Submit</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </Collapsible>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
