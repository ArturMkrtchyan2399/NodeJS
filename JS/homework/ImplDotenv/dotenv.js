const fs = require('fs');

const parse = (data) => {
    const key = data[0];
    const value = data[1];

    if(value == "true"){
        return [key,true];
    }
    if(value == "false"){
        return [key,false];
    }

    if(Number(value)){
        return [key,Number(value)];
    }
   
    if(value.startsWith('"') && value.endsWith('"') || value.startsWith('\'') && value.endsWith('\'')){
        value = value.slice(1,-1);
    }
    return [key,value];
}

const config = () => {
    let data = (fs.readFileSync('.env', 'UTF-8'));
    const lines = data.split('\n');
    lines.forEach(line => {
        if(line.includes('=')){
            const temp = line.split('=');
            if(temp.length == 2 && temp[0].length != 0){
                temp[0] = temp[0].trim();
                temp[1] = temp[1].trim();
                const [key,value] = parse(temp);
                process.env[key] = value;
            }
        }    
    })
}

module.exports = {
    config,
    parse
};
