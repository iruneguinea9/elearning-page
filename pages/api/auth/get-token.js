
export default async function get_token(req, res) {

  const { username, password } = req.body
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const CLIENT_ID = process.env.AUTH_CLIENT_ID
  const CLIENT_SECRET = process.env.AUTH_SECRET_KEY
  const SCOPE = username === "johndoe" ? "me user admin" : "me user"; 

  const credentials = {
    grant_type: "password",
    username: username,
    password: password,
    scope: SCOPE,
    client_id: CLIENT_ID,
    client_secret:CLIENT_SECRET
  };
  const formData = new URLSearchParams(credentials);
  // console.log(formData)
  try {
    const response = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",  //API established
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ message: await response.json() })
      
    }
     else {
      const data = await response.json();
      const { access_token } = data
      // console.log(access_token)
      // Set access token as a cookie in the response
      res.setHeader('Set-Cookie', `niblu-auth-token=${access_token};Secure=true;HttpOnly=true;Path=/`);

      res.status(200).json({ message: 'Cookie set successfully', token: access_token });
    }

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Something went wrong' })
  }

}