import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import { useNavigate } from 'react-router-dom'
import './styles.css';

function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return
    }

    try {

      const response = await api.post('/login', {
        email,
        password
      })

      if (response.status !== 200) {
        console.log('Não autorizado.')
        return
      }

      setItem('token', response.data.token)
      navigate('/main')
    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
    if (getItem('token')) {
      navigate('/main')
    }
  }, [navigate])

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
