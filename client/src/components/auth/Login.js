
import React, {useState} from 'react';

const Login = () =>{

  const [formData,setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const user = {
      email: formData['email'],
      password: formData['password'],
    }
    console.log(user);
  }

  return(
    <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center"> Sign Up</h1>
          <p className="lead text-center">Create your DevConnect accout</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-lg"
                onChange={handleChange}
                placeholder="Email Address"
                name="email" />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                onChange={handleChange}
                placeholder="Password"
                name="password" />
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

export default Login;
