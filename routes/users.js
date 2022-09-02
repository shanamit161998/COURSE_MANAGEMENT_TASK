var express = require('express');
const { encrypt, decrypt } = require('../helpers/encryptDecrypt');
const verifyToken = require('../helpers/verifyToken');
var router = express.Router();

/* GET users listing. */
router.get('/',verifyToken, function (req, res, next) {
  res.send('respond with a resource');
});


/* USER SIGNUP. */
router.post('/signup', async function (req, res, next) {
  const { username, password, emailId } = req.body
  //Not using validator as of now writing my own validator
  if (!(username && emailId && password)) {
    res.send({ status: 'VALIDATION ERROR', message: 'Fields Empty. Please Check Username, Email & Password. ' })
    return;
  }

  try {
    //GET Data 
    let dbResponse = await connectionString.query(rawQuery.userCheck, [emailId])

    //Check Data and decide if data to be inserted into DB or not (Default role will be 3)
    if (dbResponse[0].length) {
      if (dbResponse[0][0].email.toLowerCase() == emailId.toLowerCase()) {
        res.send({ status: 'VALIDATION ERROR', message: `${emailId}  ->  Email ID Already Exists` })
        return;
      } else if (dbResponse[0][0].username.toLowerCase() == username.toLowerCase()) {
        res.send({ status: 'VALIDATION ERROR', message: `${username} ->   User ID Already Exists` })
        return;
      }
    }
    //INSERT IF NEW DATA IS THERE
    await connectionString.query(rawQuery.signUp, [username, emailId, encrypt(password), 3])
    res.send({ status: 'SUCCESS', message: 'Sign Up Success', data: { username, emailId } })

  } catch (error) {
    console.log("ERROR SIGNUP CATCH", error)
    res.send({ status: 'ERROR', message: 'Sign Up Failed', errorString: error })
  }
});

router.post('/signIn', async function (req, res, next) {
  const { password, emailId } = req.body
  //Not using validator as of now writing my own validator
  if (!(emailId && password)) {
    res.send({ status: 'VALIDATION ERROR', message: 'Fields Empty. Please Check Email & Password. ' })
    return;
  }

  try {
    //GET Data 
    let dbResponse = await connectionString.query(rawQuery.signIn, [emailId])
    console.log(dbResponse[0])
    if (dbResponse[0].length) {
      if (decrypt(dbResponse[0][0].password) != password) {
        res.send({ status: 'ERROR', message: 'Password Invalid. Please Check your password' })
        return;
      }
    } else {
      res.send({ status: 'SUCCESS', message: 'Email Id does not exists', data: { emailId } })
      return;
    }

    const token = jwt.sign(
      { username: dbResponse[0][0].name, emailId, roleId: dbResponse[0][0].roleId , roleDescription: dbResponse[0][0].role},
      `TOKENKEY`,
      {
        expiresIn: "30m",
      }
    );


    res.send({ status: 'SUCCESS', message: 'Signed In Successfully', data: { username: dbResponse[0][0].name, emailId, roleId: dbResponse[0][0].roleId , roleDescription: dbResponse[0][0].role, token} })
  } catch (error) {
    console.log("ERROR SIGNIN CATCH", error)
    res.send({ status: 'ERROR', message: 'Sign Up Failed', errorString: error })
  }
});

module.exports = router;
