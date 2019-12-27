const fs = require('fs')  
const path = require('path')

fs.stat(path.join(__dirname, './index.js'), (error, stats) => {
    if(error) throw error  

    console.log(stats.isFile())
    console.log(stats.isDirectory())
})
