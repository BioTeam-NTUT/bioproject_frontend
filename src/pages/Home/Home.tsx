import './Home.css';
import { QueryForm } from '../../components/QueryForm';

function Home() {
  return (
    <div className="Home">
      <div className="Home-content">
        <QueryForm />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="Home-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </div>
  );
}

export default Home;
