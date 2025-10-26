import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonAvatar,
  IonItem,
  IonLabel,
  useIonAlert,
  useIonLoading,
  IonImg
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

const Page3: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() => {
    if (searchTerm === '') {
      setResults([]);
      return;
    }

    const loadData = async () => {
      await loading();

      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        const data = await response.json();
        setResults(data.items || []);
      } catch (error) {
        presentAlert('Virhe haettaessa kirjoja.');
        setResults([]);
      }

      await dismiss();
    };

    loadData();
  }, [searchTerm, loading, dismiss, presentAlert]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Book Search</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonSearchbar
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        />

        <IonList>
          {results.map((item) => (
            <IonItem
              button
              key={item.id}
              routerLink={`/books/${item.id}`}
            >
              <IonAvatar slot="start">
                <IonImg src={item.volumeInfo.imageLinks?.thumbnail || '/assets/book-placeholder.png'} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">
                {item.volumeInfo.title}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page3;