
import asmCrypto from "asmcrypto-lite";
//import IPFS from "ipfs-core";
// import IPFS from "ipfs-mini";
const IPFS = require('ipfs-api');


class ContractFunctions {
    constructor(web3, accounts, contract) {
        this.web3 = web3;
        this.accounts = accounts;
        this.contract = contract;
    }
    
   /*registrarModeloAux = async (informe, title) => {
        var data = await informe.arrayBuffer();
        // console.log(data)
        var data2 = Buffer.from(data)
        // console.log(data2)
        let uint8data = new Uint8Array(data);
        let hash = asmCrypto.SHA256.hex(data);

        const response = await this.contract.methods.getInforme(hash).call();

        if (response.exists) {
            return "El informe ya existe.";
        }

        const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        // const w = await ipfs.add(data2, (err, ipfsHash) => {
        //     console.log(err, ipfsHash);
        //     cid = ipfsHash[0].hash;
        // })
        var precision = 100;
        var randomnum = 0.7742;
        var maximo = 0.9512;
	randomnum = (Math.random() * (1 - randomnum) + randomnum).toFixed(4);
	if (randomnum > maximo) randomnum = maximo;
	const cid = randomnum;
        
        
        

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

        // console.log("hey " + cid)


        await this.contract.methods.registerInforme(hash, title, cid[0].hash).send({ from: this.accounts[0] });
        // await this.contract.methods.registerInforme(hash, title, cid.toString()).send({ from: this.accounts[0] });

        return "Modelo registrado en el sistema.";
    }*/
    
    registrarModelo = async (informe, title) => {
	var data = await informe.arrayBuffer();
        // console.log(data)
        var data2 = Buffer.from(data)
        // console.log(data2)
        let uint8data = new Uint8Array(data);
        let hash = asmCrypto.SHA256.hex(data);

        const response = await this.contract.methods.getInforme(hash).call();

        if (response.exists) {
            return "El modelo ya existe en el sistema.";
        }

        const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        // const w = await ipfs.add(data2, (err, ipfsHash) => {
        //     console.log(err, ipfsHash);
        //     cid = ipfsHash[0].hash;
        // })
        const cid = await ipfs.add(data2);
        
        
        

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

        // console.log("hey " + cid)


        await this.contract.methods.registerInforme(hash, title, cid[0].hash).send({ from: this.accounts[0] });
        // await this.contract.methods.registerInforme(hash, title, cid.toString()).send({ from: this.accounts[0] });

        return "Modelo registrado en el sistema.";
    }

    registrarUser = async (name) => {
    	var n = name;
    	//console.log(n);
        //console.log("comprobar address");
    	//console.log(this.accounts[0]);
        await this.contract.methods.registerEntity(name).send({ from: this.accounts[0] });
        //console.log(response);
        return "Petición de registro solicitada, espere a tener la cuenta activada."
    }

    AceptarUser = async (address) => {
    	var n = address;
    	//console.log(n);
        //console.log("comprobar address");
    	//console.log(this.accounts[0]);
        await this.contract.methods.approveEntity(address).send({ from: this.accounts[0] });
        //console.log(response);
        return "Enhorabuena, has sido confirmado y puedes acceder a la aplicación."
    }
    
    esPropietario = async () => {
        //console.log("comprobar address");
    	//console.log(this.accounts[0]);
        const response = await this.contract.methods.isOwner().call({ from: this.accounts[0] });
        //console.log(response);
        return response;
    }

    userValidado = async () => {
    	//console.log("comprobar address");
    	//console.log(this.accounts[0]);
        const response = await this.contract.methods.isApprovedEntity().call({ from: this.accounts[0] });
        //console.log(response);
        return response;
    }

    getNombreUser = async () => {
        //console.log("comprobar address");
    	//console.log(this.accounts[0]);
        const response = await this.contract.methods.getMyEntityName().call({ from: this.accounts[0] });
        //console.log(response);
        return response;
    }
    
    obtenerModelo = async (hash) => {
        var n = hash;
    	//console.log(n);
        //console.log("comprobar address");
    	//console.log(this.accounts[0]);
        const response = await this.contract.methods.getInforme(hash).call();
        await this.contract.methods.registerEntity(hash).send({ from: this.accounts[0] });
        //console.log(response);
        return response;
    }

    listadoModelos = async () => {
        //console.log("comprobar address");
    	//console.log(this.accounts[0]);
        const response = await this.contract.methods.getAllInformes().call();
        //console.log(response);
        return response;
    }

    listadoUsuarios = async () => {
        //console.log("comprobar address");
    	//console.log(this.accounts[0]);
        const response = await this.contract.methods.getAllEntities().call({ from: this.accounts[0] });
        //console.log(response);
        return response;
    }

}

export default ContractFunctions;
