import React from 'react'
import "../../assets/scss/components/common/footer.scss";
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/Logo';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="wrapper-footer">
          <div className='logo'>
            <Link to={'/'} title="Logo pagina inicial">  <Logo /> </Link>
          </div>
          <div className="copyright">
            <p> © 2024</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer