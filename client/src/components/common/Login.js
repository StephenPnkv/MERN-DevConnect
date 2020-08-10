
import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import TextfieldGroup from '../common/TextfieldGroup';

const Login = (props) =>{

  const [formData,setFormData] = useState({
    email: '',
    password: '',
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

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const user = {
      email: formData['email'],
      password: formData['password'],
    }
    props.loginUser(user);
  }

  return(
    <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center"> Login</h1>
          <p className="lead text-center">Create your DevConnect accout</p>
          <form onSubmit={handleSubmit}>
            <TextfieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={formData['email']}
              error={errors.email}
              onChange={handleChange}
            />
            <TextfieldGroup
              placeholder="Email Address"
              name="password"
              type="password"
              value={formData['password']}
              error={errors.password}
              onChange={handleChange}
            />
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);
