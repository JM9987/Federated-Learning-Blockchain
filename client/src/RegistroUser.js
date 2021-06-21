import React, { Component } from "react";

class RegistroUser extends Component {
    state = {response:null}

    registerListener = async (name) => {
        const response = await this.props.functions.registrarUser(name);
        this.setState({response: response});
    }

    render() {
        return(
        <div className="maincomp registerform">
            <h1>Registro</h1>
            <br></br>
            <span className="textForm">Nombre de usuario:</span> <br></br>
            <input type="text" id="name"></input>
            <br></br><br></br><br></br>
            <button className="buttonForm" onClick={() => this.registerListener(
                document.getElementById('name').value)}>
                Registrarse
            </button>
            <br></br>
            <p className="textForm">{this.state.response}</p>
        </div>
        )
    }
}

export default RegistroUser;
