import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthKakao = () => {
  const kakaoCode = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  });

  return <div>{kakaoCode}</div>;
};

export default AuthKakao;
