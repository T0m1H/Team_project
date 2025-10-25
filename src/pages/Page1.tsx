import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonList,
  IonAvatar,
  IonItem,
  IonLabel,
  IonIcon,
  useIonAlert,
  useIonLoading,
  IonImg
} from '@ionic/react';
import React, { useEffect, useState } from 'react'; //
import { SearchResult, SearchType, useApi } from '../hooks/useApi'; //
import { gameControllerOutline, videocamOutline, tvOutline } from 'ionicons/icons'; //

// Varmista, että olet luonut tämän tiedoston (perustuen movieApp/src/pages/Home.css)
import './Page1.css'; //

const Page1: React.FC = () => { //
  // --- Kaikki logiikka on siirretty komponentin sisäpuolelle ---

  const { searchData } = useApi(); //
  const [searchTerm, setSearchTerm] = useState(''); //
  const [type, setType] = useState<SearchType>(SearchType.all); //
  const [results, setResults] = useState<SearchResult[]>([]); //
  const [presentAlert] = useIonAlert(); //
  const [loading, dismiss] = useIonLoading(); //

  useEffect(() => { //
    if (searchTerm === '') {
      setResults([]);
      return;
    }

    const loadData = async () => {
      await loading();
      
      // Korjattu "any" tyyppi: TypeScript päättelee tyypin nyt itse
      const result = await searchData(searchTerm, type); //
      console.log('X ~ file: Page1.tsx ~ loadData ~ result', result); //
      await dismiss();

      // Tyypiturvallinen tarkistus virheelle (olettaen, että useApi on korjattu)
      if ('Error' in result) { //
        presentAlert(result.Error); //
        setResults([]); //
      } else {
        setResults(result.Search); //
      }
    };
      
    loadData();
  }, [searchTerm, type, searchData, loading, dismiss, presentAlert]); //
  // --- Logiikka päättyy tähän ---

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton /> {/* Säilytetty alkuperäisestä Page1:stä */}
          </IonButtons>
          <IonTitle>Film Database</IonTitle> {/* Säilytetty alkuperäisestä Page1:stä */}
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen> {/* */}
        
        {/* --- Sisältö kopioitu Home.tsx:stä --- */}
        
        <IonSearchbar
          value={searchTerm}
          debounce={300} 
          onIonChange={(e) => setSearchTerm(e.detail.value!)}> 
        </IonSearchbar> {/* */}

        <IonItem> {/* */}
          <IonLabel>Select Searchtype</IonLabel>
          <IonSelect value={type} onIonChange={(e) => setType(e.detail.value!)}>
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem> {/* */}

        <IonList> {/* */}
          {results.map((item: SearchResult) => ( //
            <IonItem button key={item.imdbID} routerLink={`/movies/${item.imdbID}`}> {/* */}
              <IonAvatar slot='start'>
                <IonImg src={item.Poster} /> {/* */}
              </IonAvatar>
              <IonLabel className='ion-text-wrap'>{item.Title}</IonLabel> {/* */}

              {item.Type === 'movie' && ( <IonIcon slot='end' icon={videocamOutline} />)} {/* */}
              {item.Type === 'series' && ( <IonIcon slot='end' icon={tvOutline} />)} {/* */}
              {item.Type === 'game' && ( <IonIcon slot='end' icon={gameControllerOutline} />)} {/* */}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page1;