const crypto = require('crypto');
var Web3 = require('aion-web3');
var RLP = require('aion-rlp');
const Accounts = require('aion-keystore');
const account = new Accounts();

var ERRORS = {
    invalidHex: "Invalid hex input"
}
var getRandomWallet = function() {
    var randbytes = crypto.randomBytes(64);
    var newAccount = account.privateKeyToAccount(randbytes);
    return { address: newAccount.address, privKey: randbytes.toString('hex') }
}
var isValidHex = function(hex) {
    if (!hex.length) return true;
    hex = hex.toUpperCase();
    var re = /^[0-9A-F]+$/g;
    return re.test(hex);
}
var isValidVanityWallet = function(wallet, input, isChecksum, isContract) {
    var _add = wallet.address;
    if (isContract) {
        var _contractAdd = getDeterministicContractAddress(_add);
        _contractAdd = isChecksum ? web3.utils.toChecksumAddress(_contractAdd) : _contractAdd;
        wallet.contract = _contractAdd;
        return _contractAdd.substr(2, input.length) == input
    }

    _add = isChecksum ? web3.utils.toChecksumAddress(_add) : _add;
    return _add.substr(2, input.length) == input;
}
var getVanityWallet = function(input = '', isChecksum = false, isContract = false) {
    if (!isValidHex(input)) throw new Error(ERRORS.invalidHex);
    input = isChecksum ? input : input.toLowerCase();
    var _wallet = getRandomWallet();
    while (!isValidVanityWallet(_wallet, input, isChecksum, isContract)) _wallet = getRandomWallet(isChecksum);
    if (isChecksum) _wallet.address = web3.utils.toChecksumAddress(_wallet.address);
    return _wallet;
}
var getDeterministicContractAddress = function(address) {
	var daddr = '0xa0' + Web3.utils.sha3(RLP.encode([address, 0])).slice(12).toString('hex');
    return daddr
}
module.exports = {
    getVanityWallet: getVanityWallet,
    isValidHex: isValidHex,
    ERRORS: ERRORS
}
