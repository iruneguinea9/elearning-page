import { destroyCookie } from 'nookies';

export default function logoutAPI(req, res) {
	destroyCookie({ res }, 'niblu-auth-token', {
		path: '/',
		httpOnly: true,
		secure: true,
	  });
	return res.status(200).json({ message: "Logged out" });
}