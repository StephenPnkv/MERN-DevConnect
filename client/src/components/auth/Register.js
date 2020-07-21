
import React, {useState} from 'react';
import axios from 'axios';
import classnames from 'classnames';
const Register = () =>{

  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [errors,setErrors] = useState({});

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
    axios.post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => setErrors(err.response.data));
    console.log(errors);
  }
  return(
    <div className="register">
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
                  {errors.name && (<div className="invalid-feedback"></div>)}
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

export default Register;
