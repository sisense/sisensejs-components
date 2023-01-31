import {
  SisenseApp,
  SisenseDashboard,
  SisenseFilters,
  SisenseWidget
} from "@sisense/sjs-react";

function App() {
  return (
    <SisenseApp url="https://example.com">
      <SisenseDashboard oid="{dashboard_id}">
        <div style={{display: 'flex'}}>
          <SisenseFilters width={200} height={300}/>
          <div style={{width: 500}}>
            <SisenseWidget oid="{widget_id_1}"/>
            <SisenseWidget oid="{widget_id_2}"/>
          </div>
        </div>
      </SisenseDashboard>
    </SisenseApp>
  );
}

export default App;
