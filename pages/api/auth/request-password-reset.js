export default async function request_pasword_reset(req, res) {

    const { email } = req.body
    const API_URL = process.env.API_URL
    
    // console.log(formData)
    try {
      const response = await fetch(`${API_URL}/auth/request_reset_password?email=${email}`, {
        method: 'POST',
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
        res.status(200).json({ message: 'Pasword reset request sent'});
      }
  
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' })
    }
  
  }