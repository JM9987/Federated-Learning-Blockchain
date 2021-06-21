import React, { Component } from "react";
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';

class UsuarioAdmin extends Component {
    componentDidMount = async () => {
        let response = await this.props.functions.listadoUsuarios();
        this.setState({ response: response });
    }

    AceptarUser = async (address) => {
        var response = await this.props.functions.AceptarUser(address);
        response = await this.props.functions.listadoUsuarios();
        this.setState({response: response});
    }

    state = {
        response: null,
        clicked: false
    }

    render() {
        let table;

      var dataFromContract = this.state.response;



        if (this.state.response != null) {
            var j;
            for (j = 0; j < dataFromContract.length; j++) {
                var i=j;
                if (!dataFromContract[i].approved) {
                    dataFromContract[i] = {
                        name: dataFromContract[i].name, entityAddress: dataFromContract[i].entityAddress, approved: "Pendiente",
                        // button: <button className="buttonForm" onClick={() => this.AceptarUser(this.state.response[i].entityAddress)}>Aprobar</button>
                        button: <button value={i} className="buttonTable" onClick={this.AceptarUser.bind(this, dataFromContract[i].entityAddress)}>Aprobar</button>
                    }
                }
                else {
                    dataFromContract[i] = {
                        name: dataFromContract[i].name, entityAddress: dataFromContract[i].entityAddress, approved: <span>&#10003;</span>,
                        button: <span></span>
                    }
                }
            }
            console.log(dataFromContract)
            console.log(this.state.response)
            let columns = [
                {
                    header: 'Usuario',
                    key: 'name',
                    td: (data) => <div>{data.name}</div>
                },
                {
                    header: 'Dirección',
                    key: 'entityAddress',
                    td: (data) => <div>{data.entityAddress}</div>
                },
                {
                    header: 'Confirmado',
                    // can also use with nested objects
                    key: 'approved',
                    td: (data) => <div>{data.approved}</div>
                },
                {
                    header: 'Acción',
                    // can also use with nested objects
                    key: 'button',
                    td: (data) => <div>{data.button}</div>
                }
            ]

            table = <ReactFlexyTable data={dataFromContract} columns={columns} filterable nonFilterCols={["approved","button"]} sortable pageSizeOptions={[20, 50, 100]} pageSize={20} className="my_table rft-table" />

        }



        return (
            <div className="maincomp">
                <div className="searchTable">{table}</div>
            </div>
        )
    }
}

export default UsuarioAdmin;
