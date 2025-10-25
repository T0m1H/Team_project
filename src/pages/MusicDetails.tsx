import React, { useState } from 'react';
import { 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonContent, 
  IonPage, 
  IonButtons,
  IonBackButton,
  useIonViewWillEnter,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonImg,
  IonCardSubtitle
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import musicApi, { ArtistResult } from '../hooks/musicApi';

// Created type alias for RouteComponentProps, specifying that an 'id' string parameter must be present in the route.
type DetailsPageProps = RouteComponentProps<{ id: string }>;

const MusicDetails: React.FC<DetailsPageProps> = ({ match }) => {
  const { getDetails } = musicApi();
  const [information, setInformation] = useState<ArtistResult | null>(null);

    useIonViewWillEnter(() => {
    const loadData = async () => {
    const id = match.params.id;
    const data = await getDetails(id);

    // Check if the 'error' property exists
    if ('error' in data) {
      // If error exists, handle the error and clear any previous artist data.
      console.error(data.error);
      setInformation(null); 

    } else {
      // Otherwise, 'data' must be an ArtistResult, so set the state.
      setInformation(data); 
    }
  };

  loadData();
});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/Page2" />
          </IonButtons>
          <IonTitle>{information?.strGenre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {information && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{information.strArtist}</IonCardTitle>
              <IonCardSubtitle>Active From: {information.intFormedYear}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonImg src={information.strArtistThumb} />
              <p>{information.strBiographyEN}</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MusicDetails;
