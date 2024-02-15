import './App.css';
import { MyProvider } from './MyContext';
import Dashboard from './Pages/Dashboard';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faBox } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faBox);

export default function App(): JSX.Element {
  return (
    <MyProvider>
      <div className="App">
        <Dashboard />
      </div>
    </MyProvider>
  );
}