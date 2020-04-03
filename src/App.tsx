import React, { useRef, useState } from "react";

import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonItem,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonText,
  IonAlert,
  IonListHeader,
  IonNote
} from "@ionic/react";

import BmiControls from './components/BmiControls';
import BmiResult from "./components/BmiResult";
import InputControl from "./components/InputControl";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";


/* TypeScript React.FunctionalComponents e.g. React.FC */
const App: React.FC = () => {
  /* hooks */
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg");

  const calculateBMI = () => {
    /* ternary expression (long hand)*/
    //const enteredWeight = weightInputRef.current ? weightInputRef.current.value : null;
    /* ternary expression (short hand)*/
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      setError("Please enter valid (non-negative) input numbers!");
      return;
	}
	
	const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
	const heightConversionFactor = calcUnits === "ftlbs" ? 3.28 : 1;
	const weight = +enteredWeight / weightConversionFactor;
	const height = +enteredHeight / heightConversionFactor;

    const bmi = weight / (height * height);
    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  const selectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };

  const underweight = `<18.5`;
  const normalWeight = `18.5–24.9`;
  const overWeight = `25–29.9`;
  const obesity = `30 or greater`;
  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Okay", handler: clearError }]}
      />
      <IonApp className="bg">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>RolEmi Health Track</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="medium">BMI Calculator</IonText>
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl
                  selectedValue={calcUnits}
                  onSelectValue={selectCalcUnitHandler}
                />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Height ({calcUnits === "mkg" ? "meters" : "feet"})
                  </IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Weight ({calcUnits === "mkg" ? "kilograms" : "pounds"})
                  </IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />

            {calculatedBmi && <BmiResult result={calculatedBmi} />}
          </IonGrid>

          <IonListHeader color="medium">BMI Chart</IonListHeader>
          <IonItem>
            <IonLabel>Underweight</IonLabel>
            <IonNote slot="end">{underweight}</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Normal weight</IonLabel>
            <IonNote slot="end">{normalWeight}</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Overweight</IonLabel>
            <IonNote slot="end">{overWeight}</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Obese</IonLabel>
            <IonNote slot="end">{obesity}</IonNote>
          </IonItem>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
