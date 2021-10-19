import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { add } from 'ionicons/icons';

import { useEffect, useRef, useState } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';
import './Home.css';

const Home: React.FC = () => {
  const [state, setState] = useState([{ name: 'foo', id: 1 }]);
  const addItem = () => {
    setState([...state, { name: 'bar', id: state.length + 1 }]);
  };
  const [geo, setGeo] = useState<{lat: any, long: any}>({
    lat: null,
    long: null,
  });
  const getLoc = async () => {
    const { coords } = await Geolocation.getCurrentPosition();
    setGeo({ lat: coords.latitude, long: coords.longitude });
  };

  useEffect(() => {
    return () => {
      Geolocation.clearWatch({ id: trackerId.current });
    };
  }, []);
  const trackerId = useRef('');
  const trackLoc = async () => {
    trackerId.current = await Geolocation.watchPosition(
      {},
      (pos: Position | null) => {
        setGeo({ lat: pos?.coords.latitude, long: pos?.coords.longitude });
      }
    );
  };
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>React</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={addItem}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">React</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonButton expand="block" onClick={getLoc}>
            Where Am I?
          </IonButton>
          <IonButton expand="block" onClick={trackLoc}>
             Track Me
          </IonButton>
          <h1>Geolocation</h1>
          <p>Long: {geo.long}</p>
          <p>Lat: {geo.lat} </p>
          {state.map((item) => (
            <IonItem key={item.id}>
              <IonNote slot="end">3:40PM</IonNote>
              <IonLabel>
                <h1>Hello, {item.name}</h1>
                <p>{item.id}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
