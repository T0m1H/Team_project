import { useEffect, useState } from 'react';
import musicApi, { ArtistResult } from '../hooks/musicApi';
import { 
  IonContent, 
  IonHeader, 
  IonItem, 
  IonList,
  IonLabel,
  IonPage, 
  IonSearchbar, 
  IonTitle, 
  IonToolbar,
  useIonAlert,
  useIonLoading,
  IonAvatar,
  IonImg,
  IonButtons,
  IonMenuButton
} from '@ionic/react';

const Page2: React.FC = () => {
  const { searchData } = musicApi();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ArtistResult[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() => {
    if (searchTerm === '') {
      setResults([]);
      return;
    }

    const loadData = async () => {
      await loading();
      const result = await searchData(searchTerm);
      await dismiss();

      if ('error' in result) {
        presentAlert(result.error);
      } else {
        setResults(result);
      }
    };

    loadData();
  }, [searchTerm]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton /> {/* Säilytetty alkuperäisestä Page1:stä */}
              </IonButtons>
                <IonTitle>Music Database</IonTitle> {/* Säilytetty alkuperäisestä Page1:stä */}
              </IonToolbar>
            </IonHeader>

      <IonContent>
        <IonSearchbar
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        />

        <IonList>
          {results.map((item) => (
            <IonItem
              button
              key={item.idArtist}
              routerLink={`/artists/${item.idArtist}`}
            >
              <IonAvatar slot="start">
                <IonImg src={item.strArtistThumb} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{item.strArtist}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page2;
