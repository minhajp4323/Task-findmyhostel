import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to Our Service</h1>
        <p className="text-lg">Choose an option to get started</p>
      </header>
      <div className="flex flex-col md:flex-row items-center justify-around w-full max-w-3xl">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 mb-4 md:mb-0 md:mr-4"
          onClick={() => navigate('/register')}
        >
          Register User
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          onClick={() => navigate('/login')}
        >
          Login User
        </button>
      </div>
   
    </div>
  );
}

export default Home;
