import './App.css';
import { MyProvider } from './MyContext';
import Dashboard from './Pages/Dashboard';

export default function App(): JSX.Element {
  return (
    <MyProvider>
      <div className="App">
        <Dashboard />
      </div>
    </MyProvider>
  );
}