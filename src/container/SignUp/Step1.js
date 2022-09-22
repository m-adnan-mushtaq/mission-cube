import { Link, useOutletContext } from "react-router-dom"
import SocialButtons from "components/Auth/SocialButtons"
import { giveValidClass } from "utils/util"

const Step1 = (props) => {
  const context = useOutletContext()
  return (
    <div
    >
      <h5 className="fw-bold text-center my-3">
        <i className="fa fa-user-o me-2 "></i>
        Enter Profile Details:</h5>
      <div >
        <div className="form-floating mb-3">
          <input name='name' type="text" placeholder="example user" className={`form-control ${giveValidClass(context.isNameValid)}`} title='name must contains letters [a-zA-Z]' id="floatingInput" value={context.name} onChange={context.onNameChange} />
          <label htmlFor="floatingInput">Your Name</label>
          <div className="invalid-feedback">Name must contains letters [a-zA-Z], min 3 Characters</div>
        </div>
        <div className="form-floating mb-3">
          <input placeholder="name@example.com" name='email' type="email" value={context.email} onChange={context.onEmailChange} className={`form-control ${giveValidClass(context.isEmailValid)}`} id="emailInput" required title='Enter a valid email address' />
          <label htmlFor="emailInput">Email address</label>
          <div className="invalid-feedback">Please enter a valid email address [a-zA-Z]</div>
        </div>
        <div className="form-floating mb-3">
          <input autoComplete="true" name='password' type="password" placeholder="strong password?*" value={context.password} onChange={context.onPasswordChange} className={`form-control ${giveValidClass(context.isPasswordValid)}`} id="passwordInput" required title='Password should be 6 charactes long' />
          <label htmlFor="passwordInput">Password</label>
          <div className="invalid-feedback">Passowrd should be 6 characters long</div>
        </div>
        <p className="text-info fs-6 text-center">Already have an account? <Link to='/sign-in' className="text-decoration-none link link-info">Sign In</Link></p>
        <div className="text-center">
          <Link role='button' to='/sign-up/upload-picture' className={`btn ${(!context.isEmailValid || !context.isNameValid || !context.isPasswordValid) && 'disabled'} btn-primary w-50`}>Next</Link>
        </div>
      </div>
      <SocialButtons/>
    </div>

  )
}

export default Step1