import {
  SisenseApp,
  SisenseDashboard,
  SisenseFilters,
  SisenseWidget
} from "@sisense/sjs-react";

function App() {
  const onProcessResult1 = (event: CustomEvent) => {
    const { result } = event.detail;

    result["value"]["data"] = 200;
    result["value"]["text"] = "Data has been manipulated";
  }

  const onProcessResult2 = (event: CustomEvent) => {
    const { result } = event.detail;

    const series = result["series"][0]["data"];

    const colors = ["#b2b2f7", "#00cee6"];

    series.forEach((s: any, i: number) => {
      s["color"] = colors[i % colors.length];
    });
  }

  return (
    <SisenseApp url="https://example.com">
      <SisenseDashboard oid="{dashboard_id}">
        <div style={{display: 'flex'}}>
          <SisenseFilters width={200} height={300}/>
          <div style={{width: 500}}>
            <SisenseWidget oid="{widget_id_1}" onProcessResult={onProcessResult1}/>
            <SisenseWidget oid="{widget_id_2}" onProcessResult={onProcessResult2}/>
          </div>
        </div>
      </SisenseDashboard>
    </SisenseApp>
  );
}

export default App;
