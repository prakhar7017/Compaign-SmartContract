const fs=require("fs-extra");
const path=require("path");
const solc=require("solc");

const buildPath=path.resolve(__dirname,"build");

fs.removeSync(buildPath);

try {
    const compaignPath=path.resolve(__dirname,'Contract','Campaign.sol');


    const source=fs.readFileSync(compaignPath,'utf8');

    // console.log(solc.compile(source,1));

    const output=solc.compile(source,1).contracts;

    // console.log(output);

    fs.ensureDirSync(buildPath);

    for(let contract in output){
        fs.outputJsonSync(
            path.resolve(buildPath,contract.replace(':','')+'.json'),output[contract]
        )
    }
} catch (error) {
    console.log(error);
}