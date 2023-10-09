pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address vendor;
        bool complete;
        uint yesVotersCount;
        mapping(address => bool) yesVoters;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public contributers;
    uint public contributersCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        contributers[msg.sender] = true;
        contributersCount++;
    }

    function createRequest(string description, uint value, address vendor) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           vendor: vendor,
           complete: false,
           yesVotersCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(contributers[msg.sender]);
        require(!request.yesVoters[msg.sender]);

        request.yesVoters[msg.sender] = true;
        request.yesVotersCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.yesVotersCount > (contributersCount / 2));
        require(!request.complete);

        request.vendor.transfer(request.value);
        request.complete = true;
    }
}