const { EAS, Offchain, SchemaEncoder, SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");
const ethers = require('ethers');

const EASContractAddress = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"; // scroll sepolia

// Initialize the sdk with the address of the EAS Schema contract address
const eas = new EAS(EASContractAddress);


// Gets a default provider (in production use something else like infura/alchemy)

const provider = ethers.getDefaultProvider(
  "https://scroll-testnet-public.unifra.io"
);

// Connects an ethers style provider/signingProvider to perform read/write functions.
// MUST be a signer to do write operations!
eas.connect(provider);

const uid = "0x25e1f870fa110a9b8b7932f03f43a9b4c8fc9c25235a30725b30800de071c91c";

async function getAttestations (){
  const attestation = await eas.getAttestation(uid);
  console.log("dataAttestation",attestation.schema);
  const schemaEncoder = new SchemaEncoder();
  console.log("schemaEncoder",schemaEncoder);




}

getAttestations();

