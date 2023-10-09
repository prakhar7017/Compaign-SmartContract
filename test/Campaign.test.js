const ganache=require("ganache");
const {Web3} =require("web3");
const assert=require("assert");
const {beforeEach}=require("mocha");

const compileFacotry=require("../Etherium/build/CampaignFactory.json");
const compileCompaign=require("../Etherium/build/Campaign.json");

const web3=new Web3(ganache.provider());

let accounts;
let factory;
let compaignAddress;
let compaign;

beforeEach(async()=>{
    accounts=await web3.eth.getAccounts();
    //deploy factory
    factory=await new web3.eth.Contract(JSON.parse(compileFacotry.interface)).deploy({
        data:compileFacotry.bytecode
    }).send({
        from :accounts[0],
        gas:'1000000'
    });

    //create compaign
    await factory.methods.createCampaign("100").send({
        from:accounts[0], //manager
        gas:'1000000'
    });

    //get compaign address
    [compaignAddress]=await factory.methods.getDeployedCampaigns().call();

    //get compaign
     compaign=await new web3.eth.Contract(JSON.parse(compileCompaign.interface),compaignAddress);
})


describe("Campaign",()=>{
    it('deploys a factory and a compaign',()=>{
        assert.ok(factory.options.address);
        assert.ok(compaign.options.address);
    })

    it("marks caller as the compaign manager",async()=>{
        const manager=await compaign.methods.manager().call();
        assert.equal(accounts[0],manager);
    })

    it("allows people to contribute money and marks them as approvers",async()=>{
        await compaign.methods.contribute().send({
            value:'200',
            from:accounts[1],
        })
        const isContributer=await compaign.methods.contributers(accounts[1]).call();
        assert(isContributer);
    })

});

