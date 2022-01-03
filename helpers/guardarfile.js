const fs = require('fs');

const path = './db/tasks.json';

const guardarDB = ( data ) => {

    
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) throw err;
        //console.log("File written successfully");
      });
}

const leerDB = () => {

    if( !fs.existsSync(path) ){
        return null;
    }

    const info = fs.readFileSync(path, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarDB,
    leerDB,   
}