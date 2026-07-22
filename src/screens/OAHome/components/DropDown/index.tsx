/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState, useRef, useMemo } from "react";
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

export interface DropdownItem {
  label: string;
  value: string;
}

export interface CustomDropdownProps {
  value?: string;
  placeholder?: string;
  items: DropdownItem[];
  onChange: (value: string) => void;
}

export const DropDown = ({
  value,
  placeholder = "Select",
  items,
  onChange,
}: CustomDropdownProps) => {
  const { theme } = useTheme();
  const colors: any = theme.colors;

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const anchorRef = useRef<any>(null);
  const [selectedLabel, setSelectedLabel] = useState(placeholder);

  const resolvedLabel = useMemo(() => {
    if (!value) return selectedLabel;
    const matched = items.find((item) => item.value === value);
    return matched?.label ?? selectedLabel;
  }, [items, selectedLabel, value]);

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
        style={StyleSheet.flatten([
          S.container,
          { borderColor: colors.border },
        ])}
        ref={anchorRef}
        activeOpacity={0.7}
        onPress={openDropdown}
      >
        <Text style={S.anchorText}>{resolvedLabel}</Text>
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
                  backgroundColor: colors.white,
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
