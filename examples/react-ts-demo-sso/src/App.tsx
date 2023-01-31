import {
  SisenseApp,
  SisenseDashboard,
  SisenseWidget
} from "@sisense/sjs-react";
import {useRef, useState} from "react";

const SISENSE_URL = 'https://example.com';

function App() {

  const [showSisenseApp, setShowSisenseApp] = useState(true);
  const appRef = useRef<HTMLSisenseAppElement>(null);

  const show = () => {
    setShowSisenseApp(true);
  }
  const hide = () => {
    setShowSisenseApp(false);

    removeSJSScriptTags();

    // @ts-ignore
    delete window['Sisense'];
  }

  const logout = () => {
    appRef.current?.logout();

    //directLogout();

    hide();
  };

  return showSisenseApp ? (
    <SisenseApp ref={appRef} url={SISENSE_URL}>
      <SisenseDashboard oid="62cf3853d934d20039ee0433">
        <button onClick={hide}>Hide</button>
        <button onClick={logout}>Logout</button>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <SisenseWidget oid="62cf3853d934d20039ee043b"/>
          <SisenseWidget oid="62cf3853d934d20039ee0437"/>
        </div>
      </SisenseDashboard>
    </SisenseApp>
  ) : <button onClick={show}>Show</button>;
}

export default App;

export const removeSJSScriptTags = () => document
  .querySelectorAll('script[src*="/js/sisense.js"], script[src*="/js/sisense.v1.js"]')
  .forEach(scriptTag => scriptTag.remove());

export const directLogout = () => fetch(`${SISENSE_URL}/api/auth/logout`, {
  method: 'GET',
  credentials: 'include'
})
  .catch(error => {
    console.error('Sisense SSO Logout error:', error);
  });
