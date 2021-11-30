import {useQuery} from '@apollo/client';
import {GET_IS_DARK_THEME} from '../operations/queries/getIsDarkTheme';
import {isDarkThemeVar} from '../cache';
import {saveTheme} from '../utils';

export function useTheme() {
  const {data} = useQuery(GET_IS_DARK_THEME);
  const {isDarkTheme} = data;

  const toggleTheme = () => {
    isDarkThemeVar(!isDarkTheme);
    saveTheme(!isDarkTheme);
  };

  return {
    isDarkTheme,
    toggleTheme,
  };
}
