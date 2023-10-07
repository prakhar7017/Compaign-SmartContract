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
    struct Request{
        string description;
        uint value;
        address payable vendor;
        bool complete;
        uint yesVoterCount;
        mapping(address=>bool) yesVoters;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public isContributers;
    uint public isContributersCount;

    uint numRequests;
    mapping(uint=>Request) public requests;

    modifier restricted() {
        require(msg.sender==manager);
        _;
    }


    constructor(uint minimum, address creator) {
        manager=creator;
        minimumContribution=minimum;
    }

function contribute() public payable {
    require(msg.value>minimumContribution);
    isContributers[msg.sender]=true;
    isContributersCount++;
}

function createRequest(string memory description,uint value,address payable vendor) public restricted {
    Request storage newRequest=requests[numRequests++];
        newRequest.description=description;
        newRequest.value=value;
        newRequest.vendor=vendor;
        newRequest.complete=false;
        newRequest.yesVoterCount=0;

}

function acceptVote(uint index) public {
    Request storage request=requests[index];
    require(isContributers[msg.sender]);
    require(!request.yesVoters[msg.sender]);
    request.yesVoters[msg.sender]=true;
    request.yesVoterCount++;
}







}
