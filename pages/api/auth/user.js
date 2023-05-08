import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
  // const { id } = req.query
  const { token } = req.headers
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  // console.log(token);
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {          
        Authorization: `Bearer ${token}`, // Pass the access token in the request headers
        Accept: 'application/json'
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ message: await response.json() })
    }
     else {
      const data = await response.json();
      res.status(200).json(data);
    }

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Something went wrong' })
  }
}