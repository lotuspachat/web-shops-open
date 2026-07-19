


export async function login_auth( email , password) {

    if ( !email && !password)
    {
        console.log( "email or passward not found");
        return
    }
    const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email : email , password : password})
        });
        const data =  await response.json()
        console.log( data)
        return data;
}