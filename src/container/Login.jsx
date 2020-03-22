import React from "react";
import Loading from "../component/Loading";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import { connect } from 'react-redux';
import { loginData } from '../redux/action/getData';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }
    handleChange = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    };
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.loginData(data)
    };
    render() {
        if(localStorage.getItem('api_token')){
            return <Redirect to="/dashboard" />
        }
        if(this.props.cek){
            return <Redirect to="/dashboard" />
        }
        return (
            <div>
                <div className="section"></div>
                <center>
                    <div className="section"></div>
                    <h5 className="center-align white-text">
                        {this.state.message}
                    </h5>
                    <div class="container">
                        <div
                            className="grey lighten-4 row"
                            style={{
                                display: "inline-block",
                                padding: " 32px 48px 32px 48px",
                                border: "1px solid #EEE"
                            }}
                        >
                            <h5 class="center-align indigo-text">Form Login</h5>
                            <form class="col s12" onSubmit={this.handleSubmit}>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <i class="material-icons prefix">
                                            mail
                                        </i>
                                        <input
                                            id="icon_prefix"
                                            name="username"
                                            type="text"
                                            class="validate"
                                            onChange={this.handleChange}
                                        />
                                        <label for="icon_prefix">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="input-field col s12">
                                        <i class="material-icons prefix">
                                            https
                                        </i>
                                        <input
                                            id="icon_telephone"
                                            name="password"
                                            onChange={this.handleChange}
                                            type="password"
                                            class="validate"
                                        />
                                        <label for="icon_telephone">
                                            Password
                                        </label>
                                    </div>
                                </div>
                                <center>
                                    <Loading
                                        loading={this.props.loadingLogin}
                                        onClick={this.handleSubmit}
                                    />
                                </center>
                            </form>
                        </div>
                    </div>
                </center>
            </div>
        );
    }
}

const state = state => ({
    loadingLogin: state.loadingLogin,
    cek: state.cek
})

const dispatch = dispatch => ({
    loginData : (datas) => dispatch(loginData(datas))
})

export default connect(state,dispatch)(Login);
