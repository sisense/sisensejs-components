import {
  SisenseApp,
  SisenseDashboard,
  SisenseFilters,
  SisenseWidget
} from "@sisense/sjs-react";

function App() {
  return (
    <SisenseApp url="https://example.com">
      <SisenseDashboard datasource={{
        fullname: 'localhost/Training',
        id: 'localhost_aTraining',
        address: 'LocalHost',
        database: 'aTraining',
        title: 'Training',
        live: false
      }}>
        <div style={{display: 'flex'}}>
          <SisenseFilters width={200} height={300}/>
          <div style={{width: 500}}>
            <SisenseWidget oid="{widget_id_1}"/>
            <SisenseWidget oid="{widget_id_2}"/>
            <SisenseWidget oid="62a907448e1db00036e04be6"/>
          </div>
        </div>
      </SisenseDashboard>
    </SisenseApp>
  );
}

export default App;
