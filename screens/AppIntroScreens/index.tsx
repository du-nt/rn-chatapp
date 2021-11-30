import React, {useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {StyleSheet, View, Text, Image, ImageSourcePropType} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {hideIntro} from '../../utils';

const DontShowAgainCheckBox = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text>Dont show again</Text>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          hideIntro();
          setChecked(true);
        }}
      />
    </View>
  );
};
const slides: Slide[] = [
  {
    key: 'one',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: {
      uri: 'https://raw.githubusercontent.com/tranhonghan/images/main/intro_mobile_recharge.png',
    },
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: {
      uri: 'https://raw.githubusercontent.com/tranhonghan/images/main/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: {
      uri: 'https://raw.githubusercontent.com/tranhonghan/images/main/intro_discount.png',
    },
    backgroundColor: '#22bcb5',
    hasCheckbox: true,
  },
];

type Slide = {
  key: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
  backgroundColor: string;
  hasCheckbox?: boolean;
};

type AppIntroProps = {
  _onDoneIntro: () => void;
};

export default function AppIntro({_onDoneIntro}: AppIntroProps) {
  const _renderItem = ({item}: {item: Slide}) => {
    return (
      <View style={slide}>
        <Text style={title}>{item.title}</Text>
        <Image source={item.image} resizeMode="center" />
        <Text style={text}>{item.text}</Text>
        {item.hasCheckbox && <DontShowAgainCheckBox />}
      </View>
    );
  };

  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      onDone={_onDoneIntro}
      showSkipButton={true}
    />
  );
}

const {slide, title, text} = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    padding: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
