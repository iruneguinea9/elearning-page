import { parseCookies } from 'nookies';
import Router from 'next/router';

export default function login(req, res) {
  const cookies = parseCookies({ req });
  const token = cookies['niblu-auth-token'];
  
  if (token) { 
    return res.status(200).json({ token: token });
  } else {
    if (res) {
      res.writeHead(302, { Location:'../../auth/login' });
      res.end();
    } else {
      Router.push('../../auth/login');
    }
  }
}