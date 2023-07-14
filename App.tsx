/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const data = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Smith', age: 30 },
  { id: 3, name: 'Alex Johnson', age: 35 },
  // Additional objects...
];

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [tableHead, setTableHead] = useState(['Head', 'Head2', 'Head3', 'Head4'])
  const [tableData, setTableData] = useState(data)

  useEffect(() => {
    handleAPICall()
  })

  let url = "https://data.cityofnewyork.us/api/id/s3k6-pzi2.json?$select=`dbn`,`school_name`,`boro`,`overview_paragraph`,`school_10th_seats`,`academicopportunities1`,`academicopportunities2`,`academicopportunities3`,`academicopportunities4`,`academicopportunities5`,`ell_programs`,`language_classes`,`advancedplacement_courses`,`diplomaendorsements`,`neighborhood`,`shared_space`,`campus_name`,`building_code`,`location`,`phone_number`,`fax_number`,`school_email`,`website`,`subway`,`bus`,`grades2018`,`finalgrades`,`total_students`,`start_time`,`end_time`,`addtl_info1`,`extracurricular_activities`,`psal_sports_boys`,`psal_sports_girls`,`psal_sports_coed`,`school_sports`,`graduation_rate`,`attendance_rate`,`pct_stu_enough_variety`,`college_career_rate`,`pct_stu_safe`,`girls`,`boys`,`pbat`,`international`,`specialized`,`transfer`,`ptech`,`earlycollege`,`geoeligibility`,`school_accessibility_description`,`prgdesc1`,`prgdesc2`,`prgdesc3`,`prgdesc4`,`prgdesc5`,`prgdesc6`,`prgdesc7`,`prgdesc8`,`prgdesc9`,`prgdesc10`,`directions1`,`directions2`,`directions3`&$order=`:id`+ASC&$limit=13&$offset=13"

  const handleAPICall = async () => {
    axios.get(url).then((response) => {
      console.log(response)
      setTableData([...response.data])
    })

  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.age}</Text>
    </View>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* /szz/
      {/* <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table> */}
        <FlatList
          data={tableData}
          renderItem={renderRow}
          style={styles.container}
        />
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  container: {
    flex: 1,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default App;
