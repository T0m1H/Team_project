// src/pages/Page3.tsx
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

const Page3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Page 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Page 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container" style={{ padding: '16px' }}>
          Welcome to Page3!
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page3;