require('module-alias/register');
const http = require('http'),
    XRKAPI = require('@XRKAPI'),
    XRKServer = http.Server(XRKAPI),
    XRKPORT = process.env.PORT || 3001,
    LOCAL = '0.0.0.0';
XRKServer.listen(XRKPORT, LOCAL, () => console.log(`XRKAPI running on ${XRKPORT}`));

