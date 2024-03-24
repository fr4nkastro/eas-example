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
  const schemaEncoder = new SchemaEncoder("string userId,uint32 equipmentId,uint64 activationDays");
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

function getTimeStamp(dias){
    
  var fechaExpiracion = new Date(); // Fecha actual
  fechaExpiracion.setDate(fechaExpiracion.getDate() + dias); // Añadir 7 días a la fecha actual
  console.log(fechaExpiracion);
  // Obtener el sello de tiempo Unix en milisegundos y convertirlo a segundos
  var timestampUnix = Math.floor(fechaExpiracion.getTime() / 1000);

  console.log(timestampUnix);
}
function getDateTimeStamp(year, month, day, hours, minutes){
    
  var fechaExpiracion = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  console.log(fechaExpiracion);
  
  var timestampUnix = Math.floor(fechaExpiracion.getTime() / 1000);

  console.log(timestampUnix);
}
function unixToDateTime(unix_timestamp) {
  // Convertir el timestamp Unix a milisegundos
  var date = new Date(unix_timestamp * 1000);

  // Convertir la fecha a una cadena en formato ISO y retornarla
   var converted =date.toISOString();
   console.log(converted);
}
// getAttestations();
// getAttestationsBySchemaId();

decodeDataStr("0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000010f70000000000000000000000000000000000000000000000000000000066077a54000000000000000000000000000000000000000000000000000000000000004061686676692d6461656d682d68787732742d6c34737a6a2d656a6b34722d777a6274672d636a3378322d326e34686d2d733470746a2d61617534722d6672616e")

// getTimeStamp(6);
