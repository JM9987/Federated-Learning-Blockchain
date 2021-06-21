pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract FilesStorage {

    struct informeData{
        string title;
        string hashValue;
        string CID;
        address owner;
        bool exists;
    }

    struct entity{
        string name;
        address entityAddress;
        bool approved;
        bool exists;
    }

    struct informeRet{
        informeData informe;
        string entidad;
    }

    mapping(string => informeData) informes;
    mapping(address => string[]) propietarios;
    address[] arrayPropietarios;
    uint nInformes;
    mapping(address => entity) entityNames;

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function registerEntity(string calldata name) external{
        if (entityNames[msg.sender].exists) return;
        else {
            entityNames[msg.sender].exists = true;
            entityNames[msg.sender].name = name;
            entityNames[msg.sender].entityAddress = msg.sender;
            arrayPropietarios.push(msg.sender);
        }
    }

    function approveEntity(address entityAddress) external{
        if(msg.sender != owner) return;
        else {
            entityNames[entityAddress].approved = true; 
        }
    }

    function getAllEntities() external returns(entity[] memory){
        entity[] memory ret = new entity[](arrayPropietarios.length);
        uint i;
        for(i=0; i< ret.length; ++i){
            ret[i] = entityNames[arrayPropietarios[i]];
        }
        return ret;
    } 

    function isOwner() external returns(bool){
        return msg.sender == owner;
    }

    function isApprovedEntity() external returns(bool){
        return entityNames[msg.sender].approved;
    }

    function getMyEntityName() external returns(string memory){
        return entityNames[msg.sender].name;
    }

    function registerInforme(string memory hashValue, string memory title, string memory CID) public{
        if(informes[hashValue].exists) return;
        else if(entityNames[msg.sender].approved == false) return;
        else {
            informeData memory data;
            data.title = title;
            data.hashValue = hashValue;
            data.CID = CID;
            data.owner = msg.sender;
            data.exists = true;
            informes[hashValue] = data;
            propietarios[msg.sender].push(hashValue);
            nInformes = nInformes+1;
            // if(propietarios[msg.sender].length == 1) { //first time
            //     arrayPropietarios.push(msg.sender);
            // }
        }
    }

    function getInforme(string memory hashValue) public view returns(informeRet memory){
        informeRet memory ret;
        ret.informe = informes[hashValue];
        ret.entidad = entityNames[informes[hashValue].owner].name;
        return ret;
    }

    function getAllInformes() public view returns(informeRet[] memory){
        if(arrayPropietarios.length > 0){
            uint i;
            uint j;
            uint k = 0;
            informeRet[] memory ret = new informeRet[](nInformes);
            for(i=0; i<arrayPropietarios.length; ++i){
                string[] memory files = propietarios[arrayPropietarios[i]];
                for(j=0; j<files.length; ++j){
                    ret[k].informe = informes[files[j]];
                    ret[k].entidad = entityNames[arrayPropietarios[i]].name;
                    ++k;
                }
            }
            return ret;
        }
    }

    // function getAllInformes() public view returns(informeData[] memory){
    //     if(arrayPropietarios.length > 0){
    //         uint i;
    //         uint j;
    //         uint k = 0;
    //         informeData[] memory ret = new informeData[](nInformes);
    //         for(i=0; i<arrayPropietarios.length; ++i){
    //             string[] memory files = propietarios[arrayPropietarios[i]];
    //             for(j=0; j<files.length; ++j){
    //                 ret[k] = informes[files[j]];
    //                 ++k;
    //             }
    //         }
    //         return ret;
    //     }
    // }


}
