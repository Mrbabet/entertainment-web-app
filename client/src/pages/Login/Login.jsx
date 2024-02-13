import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
 

  const content = (
    <section className="public">
        <header>
            <h1>Login</h1>
        </header>
        <main className="login">
            <p aria-live="assertive"></p>

            <form className="form">
                <label htmlFor="username">Username:</label>
                <input
                    className="form__input"
                    type="text"
                    id="username"
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    className="form__input"
                    type="password"
                    id="password"
                    required
                />
                <button className="form__submit-button">Sign In</button>


                <label htmlFor="persist" className="form__persist">
                    <input
                        type="checkbox"
                        className="form__checkbox"
                        id="persist"
                    />
                    Trust This Device
                </label>
            </form>
        </main>
        <footer>
            <Link to="/">Back to Home</Link>
        </footer>
    </section>
)

return content

};

export default Login;
