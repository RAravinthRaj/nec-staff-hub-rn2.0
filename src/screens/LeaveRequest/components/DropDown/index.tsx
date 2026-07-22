/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { styles as S } from "./styles";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@rneui/themed";

interface DropdownItem {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  value?: string;
  placeholder?: string;
  items: DropdownItem[];
  onChange: (value: string) => void;
}

export const DropDown = ({
  placeholder = "Select",
  items,
  onChange,
}: CustomDropdownProps) => {
  const { theme } = useTheme();

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const anchorRef = useRef<TouchableOpacity>(null);
  const [selectedLabel, setSelectedLabel] = useState(placeholder);

  const openDropdown = () => {
    anchorRef.current?.measureInWindow(
      (x: any, y: any, width: any, height: any) => {
        setPosition({ x, y, width, height });
        setVisible(true);
      }
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={StyleSheet.flatten([S.container])}
        ref={anchorRef}
        activeOpacity={0.7}
        onPress={openDropdown}
      >
        <Text style={S.anchorText}>{selectedLabel}</Text>
        <View>
          <Entypo name={visible ? "chevron-up" : "chevron-down"} size={24} />
        </View>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          style={S.overlay}
          onPress={() => setVisible(false)}
        >
          {position && (
            <View
              style={[
                S.dropdown,
                {
                  top: position.y + position.height + 4,
                  left: position.x,
                  width: position.width,
                  backgroundColor: theme.colors.white,
                },
              ]}
            >
              <FlatList
                data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={S.item}
                    onPress={() => {
                      onChange(item.value);
                      setSelectedLabel(
                        item.label === "" ? placeholder : item.label
                      );
                      setVisible(false);
                    }}
                  >
                    <Text style={S.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
