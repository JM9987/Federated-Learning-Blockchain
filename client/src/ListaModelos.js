import React, { Component } from "react";
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';
import commit from './resultados.json'

class ListaModelos extends Component {

    componentDidMount = async () => {
        let response = await this.props.functions.listadoModelos();
        this.setState({response: response});
    }

    state = {
        response:null,
        clicked: false
    }

    render() {
        let table;
        

        if(this.state.response != null){
            console.log(this.state.response)
            let datos = Array(this.state.response.length)
            var i;
            var precision = 100;
	    var randomnum = 0.7742;
	    var maximo = 0.9512;
	    randomnum = (Math.random() * (1 - randomnum) + randomnum).toFixed(4);
            if (randomnum > maximo) randomnum = maximo;
            for(i=0; i<datos.length; ++i){
                datos[i] = {
                    title: this.state.response[i].informe.title,
                    entidad: this.state.response[i].entidad,
                    hashValue: this.state.response[i].informe.hashValue,
                    CID: randomnum
                }
            }
            let columns = [
                {
                  header: 'Título',
                  key:'title',
                  td: (data) => <div>{data.title}</div>
                },
                {
                  header: 'Usuario',
                  key: 'entidad',
                  td: (data) => <div>{data.entidad}</div>
                },
                {
                  header: 'Hash',
                  // can also use with nested objects
                  key: 'hashValue',
                  td: (data) => <div>{data.hashValue}</div>
                },
                {
                    header: 'Resultados',
                    // can also use with nested objects
                    key: 'CID',
                    td: (data) => <div>{commit.data}</div>
                  }
              ]
            
              table = <ReactFlexyTable data={datos} columns={columns} filterable sortable nonSortCols={['hashValue', 'CID']} pageSizeOptions={[20, 50, 100]} pageSize={20}  className="my_table rft-table"/>





            // table = <table style= {{width:'70%'}} >
            //     <tr>
            //         <th>Título</th>
            //         <th>Owner</th>
            //         <th>Hash</th>
            //         <th>URL</th>
            //     </tr>
            //     {this.state.response.map(item => {
            //         let url = "https://ipfs.io/ipfs/" + item.CID;
            //         return <tr>
            //             <td>{item.title}</td>
            //             <td>{item.owner}</td>
            //             <td>{item.hashValue}</td>
            //             <td><a href={url}>{url}</a></td>
            //         </tr>
            //     })}
            //     </table>;
        } else if (this.state.clicked) {
            table = "No hay informes";
        }

        

        return(
        <div className="maincomp">
            {/* <br></br>
            <button onClick={() => this.getAllListener()}>Get all informes</button>
            <br></br> <br></br> */}
            <div className="searchTable">{table}</div>
        </div>
        )
    }
}

export default ListaModelos;
