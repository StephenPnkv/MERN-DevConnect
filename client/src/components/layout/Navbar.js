
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';

const Navbar = (props) =>{
  const {isAuthenticated, user} = props.auth;

  const onLogoutClick = (e) => {
    e.preventDefault();
    props.clearCurrentProfile();
    props.logoutUser();
  }

  const authLinks = (
    <ul className="navbar-nav float-right">
      <li className="nav-item">
        <Link to="/feed" className="nav-link">
          Post Feed
        </Link>
      </li>
      <li classnames="nav-item">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" onClick={onLogoutClick} className="nav-link">
          <img
            src={user.avatar}
            alt={user.name}
            style={{width: '25px', marginRight: '5px'}}
            title="You must have a gravatar connected to your email to display an image" />
            Log out
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </ul>
  );
  return(
    <div className="Nav">
      <nav className="navbar navbar-expand-sm navbar-dar bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnect</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">Developers</Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logoutUser, clearCurrentProfile})(Navbar);
