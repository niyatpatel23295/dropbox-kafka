import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Redirect} from 'react-router';

class SignUp extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    state = {
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: ''
    };

    componentWillMount(){
        this.setState({
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: ''
        });
    }

    render() {
        if(localStorage.getItem('username')){
            return(
                <Redirect to="/Welcome" />
            )
             
        }
        else{
            return (
                <div>
                    <div className="row justify-content-md-center">
                    <span className="dropbox-2015 dropbox-logo-2015 container">
                    <header className="mast-head">
                        <nav className="mast-head__nav mast-head-nav">
                            <img
                                src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg"
                                alt="" className="dropbox-logo__glyph"/>

                            <img
                                src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_m1-vflV-vZRB.svg"
                                alt="" className="dropbox-logo__type"/>
                        </nav>
                        </header>
                    </span>
                    </div>

                    <br/><br/><br/><br/><br/><br/>

                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <img src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo-vfl_t3XMB.png" />
                        </div>

                        <div className="col-md-4">
                            <form>
                                <div className="form-group">
                                    <div className="login-register-header">Create an account</div>
                                </div>

                                <br/>
                                <div className="form-group">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="FirstName"
                                        placeholder="First name"
                                        value={this.state.firstname}
                                        onChange={(event) => {
                                            this.setState({
                                                firstname: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="LastName"
                                        placeholder="Last name"
                                        value={this.state.lastname}
                                        onChange={(event) => {
                                            this.setState({
                                                lastname: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <hr />
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={(event) => {
                                            this.setState({
                                                username: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">

                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={(event) => {
                                            this.setState({
                                                email: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        label="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.setState({
                                                password: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => this.props.handleSignUp(this.state)}>
                                            SignUp
                                        </button>
                                    </div>
                                </div>


                            </form>
                        </div>

                    </div>
                </div>




            );
        }


    }
}

export default SignUp;