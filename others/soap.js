const http = require('http');

function executeCommand(command) {
    const { soap } = require('../config.json');

    return new Promise((resolve, reject) => {
        const body = `<SOAP-ENV:Envelope
    xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"
    xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/1999/XMLSchema"
    xmlns:ns1="urn:AC">
    <SOAP-ENV:Body>
    <ns1:executeCommand>
        <command>${command}</command>
    </ns1:executeCommand>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

        const auth = Buffer.from(`${soap.user}:${soap.password}`).toString('base64');

        const options = {
            hostname: soap.host,
            port: soap.port,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                'Content-Length': Buffer.byteLength(body),
                'Authorization': `Basic ${auth}`,
                'SOAPAction': 'urn:AC#executeCommand',
            },
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/<result>([\s\S]*?)<\/result>/);
                resolve(match ? match[1].trim() : data.trim());
            });
        });

        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

module.exports = { executeCommand };
