import { parseCookies } from 'nookies';

export default function login(req, res) {
  const cookies = parseCookies({ req });
  const token = cookies['niblu-auth-token']
  if (token) { 
    return res.status(200).json({ token: token });
  } else {
    return res.status(401).json({ error: "Token not found" });
  }
}