// import styles from './login.module.css';


function Resiter (){
    return (
        <>
      <div className="logon-container">
        <h1 className="form-title">Log in with</h1>

        {/* <SocialLogin />

        <p className="seprator"><span>or</span></p> */}

        {/* {showError && <p id="error_log" style={{ color: "red" }}> {message} </p>} */}

        <form action="#" onSubmit={handleLogin} className='login-form'>

          <Inputfields type="email" placeholder='Email address' icon="mail"
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <Inputfields type="password" placeholder='Password' icon="lock" value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* <a href="#" className="forgot-pass-link">Forgot Passward</a> */}
          <button type="submit" className="login-button">Log In</button>
        </form >
        <p className="sigup-text" >Have an account? <a href="/sigup">Signup now</a>
        </p>
      </div >
    </>
    )
}

export default  Resiter ;