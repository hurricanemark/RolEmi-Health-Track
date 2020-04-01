import React from "react";

import { IonRow, IonCol, IonCard, IonCardContent, IonText } from "@ionic/react";

const BmiResult: React.FC<{result: number }> = props => {
  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonCardContent className="ion-text-center">
            <IonText color="success">
              <h2>Your Body-Mass-Index</h2>
              <h3>{props.result.toFixed(2)}</h3>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};
export default BmiResult;
