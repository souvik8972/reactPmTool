import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Collapsible from "react-native-collapsible";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "../../components/TaskList/DropDown"
import DatePicker from "../../components/TaskList/DatePicker"
import TaskItem from "../../components/TaskList/TaskItem"
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
      <DropDown open={open} setOpen={setOpen} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>

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
      <DatePicker handleDateSelection={handleDateSelection} dates={dates} selectedDate={selectedDate}/>
      )}
     

      <Text className="text-lg font-bold mb-2">Task list</Text>
      {filteredTasks.length === 0 ? (
        <Text className="text-center text-gray-500">No tasks available</Text>
      ) : (
        <TaskItem filteredTasks={filteredTasks} activeIndex={activeIndex} setActiveIndex={setActiveIndex} handleActualHoursChange={handleActualHoursChange}/>
      )}
    </View>
  );
}
