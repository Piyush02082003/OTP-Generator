const express = require('express');
const app = express();
const path = require('path');
const otpGenerator = require("otp-generator");
app.use(express.static(path.join(__dirname,"static")));
app.use(express.urlencoded({extended: true}));  
app.use(express.json());
app.set('view engine','hbs');
const { mailSender } = require("./utils/mail");

app.get('/', (req, res) => {
    res.render('index');
});
let SentOTP = null;
app.post('/verificationMail', (req,res) => {
    const { email } = req.body;
    let otp = 0;
    let generateOTP =()=>{
        otp=otpGenerator.generate(4,{
            lowerCaseAlphabets:false,
            specialChars:false,
            upperCaseAlphabets:false
        });
    };
    generateOTP();
    SentOTP = otp;
    mailSender(email,"Verification mail", `Your OTP is:  ${otp}`);
    res.send(`<script>alert("E-mail Sent");window.location="/"</script>`);
})

app.post('/mailVerified',async(req,res)=>{
    const { otp } = req.body;  
    if(otp === SentOTP)
    {
        res.send(`<script>alert("E-mail Verified");window.location="/"</script>`);
    }else{
        res.send(`<script>alert("Invalid OTP");window.location="/"</script>`);
    }
})

app.listen(3000, () => {
  console.log('server started on port 4000!');
});

