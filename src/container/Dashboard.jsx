import React from "react";
import axios from "axios";
import Props from "../component/Props";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/js/materialize.min.js";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            search: ""
        };
    }
    componentDidMount() {
        axios.get('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.detik.com%2F')
            .then(res => {
                this.setState({
                    datas:res.data.items
                })
                this.props.apiGet(false)
            })
    }
    handleClick = (title, i) => {
        this.props.history.push(`/dashboard/${i}`);
    };
    handleRemove = () => {
        localStorage.removeItem("api_token");
        this.props.history.push("/");
    };
    render() {
        if (localStorage.getItem("api_token") == null) {
            return <Redirect to="/" />;
        }
        const { datas, search } = this.state;
        if (this.props.loading === true) {
            return (
                <center>
                    <div className="section"></div>
                    <div className="section"></div>
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                    <h4>LOADING...</h4>
                </center>
            );
        }
        return (
            <div>
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper">
                            <div className="container">
                                <a class="brand-logo center">DETIK NEWS</a>
                                <buton
                                    className="right btn waves-effect waves-light red"
                                    style={{ margin: "10px auto" }}
                                    onClick={this.handleRemove}
                                >
                                    logout
                                </buton>
                            </div>
                        </div>
                    </nav>
                </div>

                {datas.map((data, i) => {
                    return (
                        <Props
                            data={data}
                            onClick={() => this.handleClick(data.title, i)}
                        />
                    );
                })}
            </div>
        );
    }
}

const state = state => ({
    loading: state.loading
})

const dispatch = dispatch => ({
    apiGet: (value) => dispatch({type: 'CHANGE_LOADING',value: value})
})

export default connect(state,dispatch)(Dashboard);
