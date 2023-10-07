// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract FactoryCompaign{
    address[] public deployedCompaigns;

    constructor(uint minimum){
    address newCompaign=new Compaign(minimum,msg.sender);
    deployedCompaigns.push(newCompaign);
    }

    function getDeployedCompaigns() public view returns(address[] memory){
        return deployedCompaigns;
    }
}

contract Compaign{
    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public isContributers;
    uint public isContributersCount;


    constructor(uint minimum, address creator) {
        manager=creator;
        minimumContribution=minimum;
    }

function contribute() public payable {
    require(msg.value>minimumContribution);

}




}
