
import { Calendar } from './components/Calendar';
import { Timeline } from './components/Timeline';
import { EVENTS } from './constants';

function App() {
  
  return (
    <div className="min-h-screen bg-black">
    
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
          <Timeline events={EVENTS} />
       
          <Calendar events={EVENTS} />
       
      </main>
    </div>
  );
}

export default App;