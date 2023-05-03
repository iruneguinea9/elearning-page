export default async function reset_password(req, res) {

    const { password, token } = req.body
    const API_URL = process.env.API_URL

    console.log(password, token)
    try {
        const response = await fetch(`${API_URL}/auth/reset_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                new_password: password,
                token: token,
            })
        });

        const data = await response.json();
        console.log(data)

        if (!response.ok) {  
            res.status(response.status).json({ message: data })
        }
        else {
            console.log(data)
            res.status(200).json({ message: 'Pasword reset successfully' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' })
    }

}