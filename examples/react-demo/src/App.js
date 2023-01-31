import {SisenseApp, SisenseDashboard, SisenseWidget} from "@sisense/sjs-react";

function App() {

  return (
    <SisenseApp url="https://example.com">
      <SisenseDashboard oid="{dashboard_id}">
        <SisenseWidget oid="{widget_id_1}"/>
        <SisenseWidget oid="{widget_id_2}"/>
      </SisenseDashboard>
    </SisenseApp>
  );
}

export default App;
