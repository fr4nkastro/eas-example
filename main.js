const { EAS, SchemaEncoder  } = require("@ethereum-attestation-service/eas-sdk");
const { Indexer } = require('@ethereum-attestation-service/eas-sdk/dist/indexer');
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

const uid = "0x2a4bdc3fa61e100e7467e0cb53b99755135a7562ddce3a365f19dc9b2fb80ee5";

async function getAttestations (){
  const attestation = await eas.getAttestation(uid);
  console.log("dataAttestation",attestation.data);
  const schemaEncoder = new SchemaEncoder("uint64 userId,uint64 equipmentId,uint32 activationDays");
  const decodeItem= schemaEncoder.decodeData(attestation.data);
  console.log("decodeItem",decodeItem);

}

function decodeDataStr(data){
  const schemaEncoder = new SchemaEncoder("uint64 userId,uint64 equipmentId,uint32 activationDays");
  const decodeItem= schemaEncoder.decodeData(data);
  console.log("decodeItem",decodeItem);

}


async function getAttestationsBySchemaId (){
  const indexerObj = new Indexer("0x7C2cb1eDC328491da52de2a0afc44D3B0Ae7ee17");
  indexerObj.connect(provider);
  const options = {
    recipient: "0x9eb3C959ED45B6A18Bd19C88ff70220F7D95dc40",
    schema: "0xb728912607b4928f531b59c612a0453e93937e4d2e5ad3217c10fa49d1a723af",
    start: 0, // Empieza desde el principio
    length: 100, // Longitud máxima de atestaciones a recuperar, ajusta según tus necesidades
    reverseOrder: false // Para obtener las atestaciones en orden ascendente
  };
  
  // Crear las opciones de IndexAttestation
let opt = { uid };

// Crear las opciones de Overrides
let overrides = { gasLimit: 21000 };

// Llamar a la función indexAttestation
indexerObj.getSchemaAttestationUIDs(options)
  .then((transaction) => {
    console.log('transaction',transaction);
  })
  .catch((error) => {
    console.error(error);
  });
  
  
  // Llama a la función getReceivedAttestationUIDs con las opciones proporcionadas
  // const attestationUIDs = await indexerObj.getChainId();
  // console.log('attestationsUIDS',attestationUIDs);
  
}

// getAttestations();
// getAttestationsBySchemaId();

decodeDataStr("0x00000000000000000000000000000000000000000000000000000000075bcd15000000000000000000000000000000000000000000000000000000003ade68b1000000000000000000000000000000000000000000000000000000000000016d")
