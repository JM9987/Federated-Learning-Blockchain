import React, { Component } from "react";
import FilesStorageContract from "./contracts/FilesStorage.json";
import getWeb3 from "./getWeb3";
import asmCrypto from "asmcrypto-lite";
import IPFS from "ipfs-core";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import ContractFunctions from "./ContractFunctions";
import SubirModelo from "./SubirModelo";
import RegistroUser from "./RegistroUser";
import EntrenarModelo from "./EntrenarModelo";
import ListaModelos from "./ListaModelos"
import UsuarioAdmin from "./UsuarioAdmin"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './sidenav.css';
import "./App.css";

class App extends Component {
  state = { web3: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      //console.log(networkId);
      const deployedNetwork = FilesStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        FilesStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      var contractFunctions = new ContractFunctions(web3, accounts, instance);

      var isOwner = await contractFunctions.esPropietario();
      var isApprovedEntity = await contractFunctions.userValidado();
      var entityName = await contractFunctions.getNombreUser();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3: new ContractFunctions(web3, accounts, instance), isOwner: isOwner, isApprovedEntity: isApprovedEntity, entityName: entityName }/*, this.runExample*/);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  
  
  
  
  
  
  
  
  

  subirModelo = async (hash, title) => {
    const { accounts, contract } = this.state;

    await contract.methods.registrarModelo(hash, title).send({ from: accounts[0] });
  }








  entrenarModelo = async (hash, title) => {
    const { accounts, contract } = this.state;

    await contract.methods.registrarModelo(hash, title).send({ from: accounts[0] });
  }





  //En principio no se usa
  /*readFile = async (file) => {
    console.log(file);
    let data = await file.arrayBuffer();
    let uint8data = new Uint8Array(data);
    let hash = asmCrypto.SHA256.hex(data);

    const ipfs = await IPFS.create()
    const { cid } = await ipfs.add(uint8data)
    console.info(cid)
  }*/

  SubidaModelo = async (file, title) => {
    const { accounts, contract } = this.state;

    let data = await file.arrayBuffer();
    let hash = asmCrypto.SHA256.hex(data);

    await contract.methods.subirModelo(hash, title).send({ from: accounts[0] });

  }
  
  
  
  
  
  EntrenoModelo = async (file, title) => {
    const { accounts, contract } = this.state;

    let data = await file.arrayBuffer();
    let hash = asmCrypto.SHA256.hex(data);

    await contract.methods.entrenarModelo(hash, title).send({ from: accounts[0] });

  }

  render() {
    var ruta;
    var reg;
    var linkAdmin;
    var rutaAdmin;
    var User_name;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    else {
      if (this.state.isApprovedEntity) {
        reg = <Route path="/register" component={() => (
          <SubirModelo functions={this.state.web3} />
        )} />
        ruta = <Route exact={true} path="/" component={() => (
          <SubirModelo functions={this.state.web3} />
        )} />
        User_name = "Conectado como: " + this.state.entityName;
      }
      else{
        reg = <Route path="/register" component={() => (
          <RegistroUser functions={this.state.web3} />
        )} />
        ruta = <Route exact={true} path="/" component={() => (
          <RegistroUser functions={this.state.web3} />
        )} />
      } 
      if (this.state.isOwner) {
        linkAdmin = <NavItem eventKey="UsuarioAdmin">
     	     <NavIcon>
            {/* <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} /> */}
            {/* <img src={listIcon} style={{ height: '40px', marginTop: "5px" }} /> */}
            <div>ADMIN</div>
          </NavIcon>
          <NavText>
            UsuarioAdmin
            </NavText>
        </NavItem>
        rutaAdmin = <Route path="/UsuarioAdmin" render={() => (
          <UsuarioAdmin functions={this.state.web3} />
        )} />
      }
    }


    return (
      <Router>
        <div className="topnav">
          <div className="titletext"> Entrenamiento Federated Learning</div>
          <div className="loggedInAs">{User_name}</div>
        </div>
        <Route render={({ location, history }) => (
          <React.Fragment>
            <SideNav
              onSelect={(selected) => {
                const to = '/' + selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
            >
              <div style={{ height: "45px" }}></div>
              <SideNav.Nav defaultSelected="register">
                <NavItem eventKey="register">
                  <NavIcon>
                    {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                  <div>REGISTRO</div>  
                  </NavIcon>
                  <NavText>
                    Home
                        </NavText>
                </NavItem>
                <NavItem eventKey="train">
                
                  <NavIcon>
                    {/* <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} /> */}
                    <div>ENTRENAR</div>
                  </NavIcon>
                  <NavText>
                    Devices
                        </NavText>
                </NavItem>
                <NavItem eventKey="search">
                  <NavIcon>
                    {/* <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} /> */}
                    <div>LISTA</div>
                  </NavIcon>
                  <NavText>
                    List
                        </NavText>
                </NavItem>
                {linkAdmin}
              </SideNav.Nav>
            </SideNav>
            <main>
              {ruta}
              {reg}
              <Route path="/train" render={() => (
                <EntrenarModelo functions={this.state.web3} />
              )} />
              <Route path="/search" render={() => (
                <ListaModelos functions={this.state.web3} />
              )} />
              {rutaAdmin}
            </main>
          </React.Fragment>
        )}
        />
      </Router>







      // <Router>
    );
  }
}

export default App;
