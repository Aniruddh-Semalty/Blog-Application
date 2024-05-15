
import AuthComponent from '../components/AuthComponent'
import SignupQuote from "../components/SignupQuote"
export const Signin = () => {
  return (
    <div className='grid grid-cols-2'>
      <div>
      <AuthComponent type="signin"/>
      </div>
      <div>
      <SignupQuote/>
      </div>
    </div>
  )
}
export default Signin;
