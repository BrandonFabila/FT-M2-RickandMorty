module.exports = {
    entry: './browser/app.js',//punto arranque
    output: {
        path: __dirname + '/browser',//path absoluto para que el directorio donde queremos que el outut sea colocado
        filename: 'bundle.js'//nombre del archivo que va a contener  nuestro output
    }
}