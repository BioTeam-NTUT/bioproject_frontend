import './Home.css';
import { QueryForm } from './components/QueryForm';

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <QueryForm />
    </div>
  );
}

export default Home;
