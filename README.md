# Vanity Aion

Nodejs based tool to generate vanity aion addresses

# Features!

  - Generate multiple addresses
  - Supports Multi-core processors
  - vanity contract address
  - log to file
  - checksum based vanity address
  - Uses aion-web3, aion-keystore, aion-rlp
  - https://github.com/qoire/aion-keystore

### Installation
```sh
$ npm install -g vanity-aion
$ vanityaion -i b00b5
```
### Examples

Generate aion address:
```sh
$ vanityaion
```

generate 10 aion addresses:
```sh
$ vanityaion -n 10
```

generate 10 aion addresses with b00b5 as starting characters:
```sh
$ vanityaion -n 10 -i b00b5
```
generate 10 aion addresses with B00B5 as the checksum address (case sensitive):
```sh
$ vanityaion -n 10 -i B00B5 -c
```
generate aion address with vanity contract address:
```sh
$ vanityaion -i b00b5 --contract
```
log to file
```sh
$ vanityaion -n 10 -l
```
help me
```sh
$ vanityaion -h
```
### Docker usage

Get the image
```sh
# Build image locally after cloning repository
$ docker build -t vanityaion .

# or download image
docker pull MyEtherWallet/vanityeth
```

Usage
```
$ docker run -it vanityaion

# Pass additional arguments
$ docker run -it dhagell/vanityaion -i deadbeef
```

### Running Locally
To run from source:
```sh
git clone git@github.com:dhagell/VanityAion.git
cd VanityAion
npm install
./index.js
```

License
----

MIT

