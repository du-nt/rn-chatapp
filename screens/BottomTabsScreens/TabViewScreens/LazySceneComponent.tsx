import React, {useState, useEffect} from 'react';

import {RouteType} from './index';

import SceneComponent from './SceneComponent';
import Loading from './Loading';

export default function LazySceneComponent({route}: {route: RouteType}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);
  return loading ? <Loading /> : <SceneComponent route={route} />;
}
