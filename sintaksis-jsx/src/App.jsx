import './app.css'

function App() {
  const name = 'Алексей';

  return (
    <>
      {name ? (
        <h1 style={{ color: 'blue', fontSize: '32px' }}>Привет, {name}!</h1>
      ) : (
        <button>Войти</button>
      )}
    </>
  );
}

export default App;
