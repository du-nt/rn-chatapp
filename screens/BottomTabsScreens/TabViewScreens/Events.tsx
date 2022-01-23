import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

export default function Events() {
  const {t, i18n} = useTranslation();
  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      <Text>{t('common:languageSelector')}</Text>
      <View style={styles.wrapper}>
        <Text>English</Text>
        <RadioButton
          value="en"
          status={i18n.language === 'en' ? 'checked' : 'unchecked'}
          onPress={() => setLanguage('en')}
        />
      </View>
      <View style={styles.wrapper}>
        <Text>Française</Text>
        <RadioButton
          value="fr"
          status={i18n.language === 'fr' ? 'checked' : 'unchecked'}
          onPress={() => setLanguage('fr')}
        />
      </View>
      <View style={styles.wrapper}>
        <Text>中文</Text>
        <RadioButton
          value="cn"
          status={i18n.language === 'cn' ? 'checked' : 'unchecked'}
          onPress={() => setLanguage('cn')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  wrapper: {flexDirection: 'row', marginBottom: 10, alignItems: 'center'},
});
