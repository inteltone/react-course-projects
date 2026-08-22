import './app.css';
import Greeting from './components/Greeting';
import UserCard from './components/UserCard';

function App() {
  return (
    <div>
      <Greeting name="Алексей" />
      <UserCard name="Алексей" age={30} city="Москва" />
    </div>
  );
}

export default App;
