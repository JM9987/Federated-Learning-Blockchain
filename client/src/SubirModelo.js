import React, { Component } from "react";

class SubirModelo extends Component {
    state = {response:null}

    registerListener = async (informe, title) => {
        const response = await this.props.functions.registrarModelo(informe, title);
        this.setState({response: response});
    }

    render() {
        return(
        <div className="maincomp registerform">
            <h1>Subir un modelo</h1>
            <br></br>
            <span className="textForm">Nombre del modelo:</span> <br></br>
            <input type="text" id="title"></input>
            <br></br><br></br>
            <span className="textForm">Archivo:</span> <br></br>
            <input type="file" id="file"></input>
            <br></br><br></br><br></br>
            <button className="buttonForm" onClick={() => this.registerListener(document.getElementById('file').files[0],
                document.getElementById('title').value)}>
                Subir
            </button>
            <br></br>
            <p className="textForm">{this.state.response}</p>
        </div>
        )
    }
}

export default SubirModelo;
