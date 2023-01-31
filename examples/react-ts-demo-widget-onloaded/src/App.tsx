import { useState } from "react";
import {
  SisenseApp,
  SisenseDashboard,
  SisenseFilters,
  SisenseWidget
} from "@sisense/sjs-react";

function App() {

  const [title, setTitle] = useState('');

  const onLoaded = async (event: CustomEvent)=>{
    const widget = event.target as HTMLSisenseWidgetElement;
    const model = await widget.getModel();
    setTitle(model.title);
  };

  return (
    <SisenseApp url="https://example.com">
      <SisenseDashboard oid="{dashboard_id}">
        <div style={{ display: 'flex' }}>
          <SisenseFilters width={200} height={300}/>
          <div style={{ width: 500 }}>
            {title && <h5>{title}</h5>}
            <SisenseWidget oid="{widget_id_1}" onLoaded={onLoaded}/>
          </div>
        </div>
      </SisenseDashboard>
    </SisenseApp>
  );
}

export default App;
