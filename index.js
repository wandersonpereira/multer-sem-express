const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
  
const server = http.createServer((req, res) => {
    var upload = multer({ storage: storage }).single('file');  

    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return
        }
        // Everything went fine
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    });    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});