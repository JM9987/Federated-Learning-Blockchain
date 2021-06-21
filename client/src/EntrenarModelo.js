import React, { Component } from "react";
import commit from './resultados.json';
var data;

class EntrenarModelo extends Component {

    checkListener = async (hash) => {
        let response = await this.props.functions.obtenerModelo(hash);
        this.setState({response: response});
    }

    checkFromFileListener = async (file) => {
        let response = await this.props.functions.obtenerModeloFichero(file);
        this.setState({response: response});
    }

    state = {
        response:null,
        listener: this.checkListener
    }

    render() {
        let label, input, button, message;
        if (this.state.listener == this.checkListener) {
            label = "Hash:";
            input = <input type="text" id="content"></input>;
            button = <button className="buttonForm" onClick={() => this.state.listener(document.getElementById('content').value)}>
                    Entrenar</button>;
        } else {
            label = "Archivo:";
            input = <input type="file" id="content"></input>;
            button = <button className="buttonForm" onClick={() => this.state.listener(document.getElementById('content').files[0])}>
                    Entrenar</button>;
        }

        if(this.state.response != null){
                ////const ipfs = await IPFS.create("https://ipfs.infura.io:5001")
		// const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
		////const { cid } = await ipfs.add(uint8data)
		////await ipfs.stop();
		// var cid;
		// ipfs.add(data, (err,hash2) => {
		//     if(err){
		//         return console.log(err);
		//     }
		//     console.log("https://ipfs.infura.io/ipfs/"+hash2)
		//     cid = hash2;
		// })
		
		/*
		//prueba llamar entrenamiento
			docker run --rm --name fl-server -p 5000:5000 fl-server:latest
			    docker run --rm --name fl-client-5001 -p 5001:5000 -e CLIENT_URL='http://192.168.1.20:5001' -e SERVER_URL='http://192.168.1.20:5000' -v /your_datasets_directory:/federated-learning-network/datasets fl-client:latest
    docker run --rm --name fl-client-5002 -p 5002:5000 -e CLIENT_URL='http://192.168.1.20:5002' -e SERVER_URL='http://192.168.1.20:5000' -v /your_datasets_directory:/federated-learning-network/datasets fl-client:latest
    docker run --rm --name fl-client-5003 -p 5003:5000 -e CLIENT_URL='http://192.168.1.20:5003' -e SERVER_URL='http://192.168.1.20:5000' -v /your_datasets_directory:/federated-learning-network/datasets fl-client:latest
    docker run --rm --name fl-client-5004 -p 5004:5000 -e CLIENT_URL='http://192.168.1.20:5004' -e SERVER_URL='http://192.168.1.20:5000' -v /your_datasets_directory:/federated-learning-network/datasets fl-client:latest
		
		*/
		
        	//metodo auxiliar (placeholder) de resultados
        	var precision = 100;
        	var randomnum = 0.7742;
        	var maximo = 0.9512;
		randomnum = (Math.random() * (1 - randomnum) + randomnum).toFixed(4);
		if (randomnum > maximo) randomnum = maximo;
            if(this.state.response.informe.exists){
            commit.data = this.state.response.entidad+": "+randomnum+"\n";
                const url = "https://ipfs.infura.io/ipfs/" + this.state.response.informe.CID;
                message = <div className="textForm" style={{fontSize: "15px", width:"100%"}}>
                    <h3>Se ejecutará el siguiente modelo:</h3>
                    <b>Título:</b> {this.state.response.informe.title}<br/>
                    <b>Propietario del modelo:</b> {this.state.response.entidad}<br/>
                    <b>Hash:</b> {this.state.response.informe.hashValue}<br/>
                    <b>URL:</b> <a href={url}>{url}</a><br/><br/>
                </div>
                // message = 
                //     <table style= {{width:'70%'}} >
                //         <tr>
                //             <th>Título</th>
                //             <th>Owner</th>
                //             <th>Hash</th>
                //             <th>URL</th>
                //         </tr>
                //         <tr>
                //             <td>{this.state.response.title}</td>
                //             <td>{this.state.response.owner}</td>
                //             <td>{this.state.response.hashValue}</td>
                //             <td><a href={url}>{url}</a></td>
                //         </tr>
                //     </table>;
            } else {
                message = <div>No se ha encontrado el modelo.<br/></div>
            }
        }
        


        return(
        <div className="maincomp registerform">
            <h1>Entrenar modelo</h1>
            <br></br>
            <span className="textForm">{label}</span>
            <br></br>
            {input}
            <br></br><br></br>
            {button}
            <br></br>
            
            <br></br>
            <div className="textForm">{message}</div>
        </div>
        )
    }
}

export default EntrenarModelo;
