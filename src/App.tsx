import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";

import "./theme/variables.css";

import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import ReflectionDialog from "./pages/Reflection/ReflectionDialog";
import SettingsOverView from "./pages/Settings/SettingsOverView";
import FunctionOverview from "./pages/functions/FunctionOverview";
import QuickHelpView from "./pages/functions/QuickHelpView";
import BodyReactionCheckIn from "./pages/CheckIns/BodyReactionCheckIn";
import EmotionCheckIn from "./pages/CheckIns/EmotionCheckIn";
import NeedCheckIn from "./pages/CheckIns/NeedCheckIn";
import ThoughtCheckIn from "./pages/CheckIns/ThoughtCheckIn";
import PatternOverview from "./pages/functions/PatternOverview";
import SettingCheckIn from "./pages/Settings/SettingCheckIn";
import SettingsReminder from "./pages/Settings/SettingsReminder";
import InsightOverview from "./pages/Reflection/InsightOverview";
import SupportOverview from "./pages/functions/SupportOverview";
import ReflectionHistory from "./pages/Reflection/ReflectionHistory";
import Onboarding from "./pages/OnBoarding/OnBoarding";
import PrivacySettings from "./pages/Settings/PrivacySettings";
import ReflectionSummary from "./pages/Reflection/ReflectionSummary";
import AISettings from "./pages/Settings/AISettings";

if (Capacitor.isNativePlatform()) {
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setStyle({ style: Style.Dark });
}

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/onboarding">
          <Onboarding />
        </Route>
        <Route exact path="/">
          <Redirect to="/onboarding" />
        </Route>
        <Route exact path="/reflectiondialog">
          <ReflectionDialog />
        </Route>
        <Route exact path="/settingoverview">
          <SettingsOverView />
        </Route>
        <Route exact path="/functionoverview">
          <FunctionOverview />
        </Route>
        <Route exact path="/QuickHelpView">
          <QuickHelpView />
        </Route>
        <Route exact path="/bodyreactioncheckIn">
          <BodyReactionCheckIn />
        </Route>
        <Route exact path="/emotioncheckIn">
          <EmotionCheckIn />
        </Route>
        <Route exact path="/needcheckIn">
          <NeedCheckIn />
        </Route>
        <Route exact path="/thoughtcheckIn">
          <ThoughtCheckIn />
        </Route>
        <Route exact path="/bodyreactioncheckIn">
          <BodyReactionCheckIn />
        </Route>
        <Route exact path="/PatternOverview">
          <PatternOverview />
        </Route>
        <Route exact path="/InsightOverview">
          <InsightOverview />
        </Route>
        <Route exact path="/settings/checkins">
          <SettingCheckIn />
        </Route>
        <Route exact path="/settings/reminders">
          <SettingsReminder />
        </Route>
        <Route exact path="/settings/privacy">
          <PrivacySettings />
        </Route>
        <Route exact path="/settings/ai">
          <AISettings />
        </Route>
        <Route exact path="/SupportOverview">
          <SupportOverview />
        </Route>
        <Route exact path="/reflectionhistory">
          <ReflectionHistory />
        </Route>
        <Route exact path="/reflectionsummary">
          <ReflectionSummary />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
