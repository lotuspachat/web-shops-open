import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { get_info_of_progile } from '../services/get_profile_info';


export default  function LoginSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect( () => {
        //token from the URL (?token=...)
        const token = searchParams.get('acessToken');
        if (token) {
            //  Store it in localStorage
            localStorage.setItem('acessToken', token);
            const fun = async ()=>{
                
                get_info_of_progile();
            }
            fun();
            // 'replace: true' prevents the user from hitting the "Back" button and seeing the token
            navigate('/', { replace: true });
        } else {
            // If someone visits this page directly without a token, send them to login
            navigate('/login', { replace: true });
        }
    }, [searchParams, navigate]);

    return (
        <div className="container mt-5 text-center">
            <h2>Authenticating...</h2>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}