import './App.css';
import { Chart } from './components/chart/chart';
import { Header } from './components/header';
import { TradeForm } from './components/trade-form/trade-form';

function App() {
  return (
    <div className="h-full w-full bg-black">
      <Header />
      <div className="flex flex-row">
        <Chart />
        <TradeForm />
      </div>
    </div>
  );
}

export default App;
