# node-supervisor
## Usage example
```
// Initialize supervisor
require('node-supervisor')({
  emailFrom: 'from@email.com',
  emailTo: 'to@email.com',
  transport: {
    service: 'Gmail',
    auth: {
      user: 'gmail.user@gmail.com',
      pass: 'userpass'
    }
 }
}).init();
```
## Setting up
Install with npm
```npm install git+ssh://git@github.com:reigndesign/node-supervisor.git```
## Transports
node-supervisor uses nodemailer transports, check here to see more transport options: https://github.com/andris9/Nodemailer
