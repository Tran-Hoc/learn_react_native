function LoginMessage({ isLoggedIn }) {
    return (
        <div> {isLoggedIn ? (<h3> Welcome to login</h3>) : (<h3>Please login</h3>)}  </div>
    )

}

export default LoginMessage;