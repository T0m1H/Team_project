// src/pages/Page2.tsx
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
 
  IonPage,
 
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

const Page2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Page 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Page 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container" style={{ padding: '16px' }}>
          Welcome to Page2!
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page2;