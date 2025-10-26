import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon
} from '@ionic/react';
import React from 'react';
import { homeOutline } from 'ionicons/icons';

const Page3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Book Database</IonTitle>
          <IonButtons slot='end'>
            <IonButton routerLink='/app/welcome'>
              <IonIcon icon={homeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Page 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container" style={{ padding: '16px' }}>
          Coming soon!
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page3;