import { Switch, Route } from 'react-router-dom';

import routes from '../../routes';

function App() {
  return (
    <Switch>
      {routes.map((view) => (
        <Route {...view.routeProps} key={view.name} />
      ))}
    </Switch>
  );
}

export default App;
