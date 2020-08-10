
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';

const Register = (props) =>{

  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [errors,setErrors] = useState({});

  useEffect(() => {
    if(props.errors){
      setErrors(props.errors)
    }
    if(props.auth.isAuthenticated){
      props.history.push('/dashboard');
    }
  },[props]);
  const {user } = props.auth;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const newUser = {
      name: formData['name'],
      email: formData['email'],
      password: formData['password'],
      password2: formData['password2'],
    }

     props.registerUser(newUser,props.history);
  }
  return(
    <div className="register">
      {user ? user.name : null}
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center"> Sign Up</h1>
            <p className="lead text-center">Create your DevConnect accout</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.name
                  })}
                  onChange={handleChange}
                  placeholder="Name"
                  name="name"
                  required/>
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.email
                  })}
                  onChange={handleChange}
                  placeholder="Email Address"
                  name="email" />
                  <small className="form-text text-muted">
                    This site uses Gravatar. If you want a profile image, use a gravatar email.
                  </small>
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}

              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.password
                  })}
                  onChange={handleChange}
                  placeholder="Password"
                  name="password" />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}

              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.password2
                  })}
                  onChange={handleChange}
                  placeholder="Confirm"
                  name="password2" />
                  {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}

              </div>
              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                onSubmit={handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{registerUser})(withRouter(Register));
