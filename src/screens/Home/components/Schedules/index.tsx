/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { StyleSheet, View, ScrollView } from "react-native";
import { styles as S } from "./styles";
import { HOME_CONFIG } from "../../config";
import Accordion from "../Accordion";
import { NoDataFound } from "@/components";

export interface ISchedule {
  navigateToAttendance: (courseBatchId: number, periodId: number) => void;
  retryFetchStudents: () => void;
  date: string;
  data: any;
}

export const Schedules = ({
  data,
  date,
  navigateToAttendance,
  retryFetchStudents,
}: ISchedule) => {
  const _renderPeriod = () => {
    return (
      <View>
        {Array.isArray(data) &&
          data.map((item: any) => (
            <Accordion
              key={item.id}
              data={item}
              date={date}
              navigateToAttendance={navigateToAttendance}
            />
          ))}
      </View>
    );
  };

  const _renderHeader = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <View style={StyleSheet.flatten([S.headerContainer])}>
          <NoDataFound
            title={HOME_CONFIG.noClass}
            buttonTitle={HOME_CONFIG.retry}
            onPress={retryFetchStudents}
          />
        </View>
      );
    }

    return (
      <View style={StyleSheet.flatten([S.headerContainer])}>
        {_renderPeriod()}
      </View>
    );
  };

  return (
    <ScrollView style={StyleSheet.flatten([S.container])}>
      {_renderHeader()}
    </ScrollView>
  );
};
