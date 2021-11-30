import React from 'react';

import {RouteType} from './index';

import Events from './Events';
import ForYou from './ForYou';
import Kids from './Kids';
import New from './New';
import TopCharts from './TopCharts';

export default function SceneComponent({route}: {route: RouteType}) {
  switch (route.key) {
    case '0':
      return <ForYou />;
    case '1':
      return <TopCharts />;
    case '2':
      return <Kids />;
    case '3':
      return <Events />;
    case '4':
      return <New />;
    default:
      return null;
  }
}
