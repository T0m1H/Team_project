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

const LandingPage: React.FC = () => {
    return (
    <IonPage>
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Welcome</IonTitle>
                    </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen className="ion-padding">
                        <IonHeader collapse="condense">
                            <IonToolbar>
                                <IonTitle size="large">Welcome</IonTitle>
                                </IonToolbar>
                                </IonHeader>
        <h2>Welcome to our page!</h2>
        <p>A place to find your next movie to watch, your next artist to listen to, and your next book to read!</p>
        <p>Click the menu and start searching!</p>
        </IonContent>
        </IonPage>
    );
};

export default LandingPage;