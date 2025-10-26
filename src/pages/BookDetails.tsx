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
  IonCardSubtitle,
  IonItem,
  IonLabel
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';

type DetailsPageProps = RouteComponentProps<{ id: string }>;

const BookDetails: React.FC<DetailsPageProps> = ({ match }) => {
  const [book, setBook] = useState<any>(null);

  useIonViewWillEnter(() => {
    const fetchBook = async () => {
      const id = match.params.id;
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await res.json();

      if (data.error) {
        console.error(data.error.message);
        setBook(null);
      } else {
        setBook(data);
      }
    };

    fetchBook();
  });

  const volume = book?.volumeInfo;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/page3" />
          </IonButtons>
          <IonTitle>{volume?.categories?.[0] || 'Book Details'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {volume && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{volume.title}</IonCardTitle>
              <IonCardSubtitle>
                Published: {volume.publishedDate || 'Unknown'}
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonImg src={volume.imageLinks?.thumbnail || '/assets/book-placeholder.png'} />

              <IonItem lines="none">
                <IonLabel>
                  <strong>Author(s):</strong> {volume.authors?.join(', ') || 'Unknown'}
                </IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <strong>Publisher:</strong> {volume.publisher || 'Unknown'}
                </IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <strong>Page Count:</strong> {volume.pageCount || 'N/A'}
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BookDetails;
