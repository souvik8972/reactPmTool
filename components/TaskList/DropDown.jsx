import { View, Text } from 'react-native'
import React from 'react'
import DropDownPicker from "react-native-dropdown-picker";

const DropDown = ({open,setOpen,selectedOption,setSelectedOption}) => {
  return (
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
  )
}

export default DropDown