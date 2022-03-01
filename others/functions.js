const { computeVerifier, params } = require(`trinitycore-srp6`);
const crypto = require('crypto');

function validateUser(username){
	if(!(username.length > 2 && username.length <= 16))
		return false

	var usernameRegex = /^[a-zA-Z0-9]+$/;
	var validfirstUsername = username.match(usernameRegex)
	if (validfirstUsername == null)
		return false

	return true
}
function validateMail(mail){
	var mail_format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	
	if(mail.match(mail_format))
		return true;
	else
		return false;
}

var genRandomString = function(length){
	return crypto.randomBytes(32)
};

function GetSRP6RegistrationData(username, password){
	var salt = genRandomString(32);

	const Verifier = computeVerifier(
		params.trinitycore, 
		Buffer.from(salt), 
		username.toUpperCase(), 
		password.toUpperCase()
	)
	return new Array(salt, Verifier);
}

module.exports = {
    validateUser,
    validateMail,
    GetSRP6RegistrationData
}