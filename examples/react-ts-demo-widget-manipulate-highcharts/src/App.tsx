import {
	SisenseApp,
	SisenseDashboard,
	SisenseFilters,
	SisenseWidget
} from "@sisense/sjs-react";
import { useRef } from "react";

function App() {

	const widgetRef = useRef<HTMLSisenseWidgetElement>(null);
  let angle = 0;
  let targetAngle = angle;

	const rotateHighcharts = async () => {
    if (targetAngle !== angle) return;

    targetAngle = angle + 30;

    const hc: any = await widgetRef.current?.getHighchartsChart();

		const timer = setInterval(async () => {
			hc?.update?.({
				plotOptions: { pie: { startAngle: ++angle % 360 } },
			});

			if (angle >= targetAngle) {
				clearInterval(timer);
			}
		}, 100);
	}

	return (
		<SisenseApp url="https://example.com">
			<SisenseDashboard oid="{dashboard_id}">
				<div style={{ display: 'flex' }}>
					<SisenseFilters width={200} height={300}/>
					<div style={{ width: 500 }}>
						<SisenseWidget oid="{widget_id_2}" ref={widgetRef}/>
            <button onClick={rotateHighcharts}>Rotate pie chart</button>
					</div>
				</div>
			</SisenseDashboard>
		</SisenseApp>
	);
}

export default App;
