import { useEffect, useRef, useState } from "react";
import {
  SisenseApp,
  SisenseDashboard,
  SisenseFilters,
  SisenseWidget
} from "@sisense/sjs-react";

function App() {
  const [widgetIds, setWidgetIds] = useState<string[]>([]);
  const dashRef = useRef<HTMLSisenseDashboardElement>(null);
  useEffect(() => {
    dashRef.current?.getModel().then((dash) => {
      setWidgetIds(dash.widgets.map(w => w.oid));
    });
  }, [])


  return (
    <SisenseApp url="https://example.com">
      <SisenseDashboard oid="{dashboard_id}" ref={dashRef}>
        <div style={{display: 'flex'}}>
          <SisenseFilters width={200} height={300} />
          <div style={{width: 500}}>
            {widgetIds.map(wid => <SisenseWidget key={wid} oid={wid}/>)}
          </div>
        </div>
      </SisenseDashboard>
    </SisenseApp>
  );
}

export default App;
