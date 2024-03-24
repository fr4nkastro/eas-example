const { SchemaEncoder  } = require("@ethereum-attestation-service/eas-sdk");

function decodeDataStr(data){
    const schemaEncoder = new SchemaEncoder("string userId,uint32 equipmentId,uint64 activationDays");
    const decodeItem= schemaEncoder.decodeData(data);
    console.log("decodeItem",decodeItem);
  
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
// getDateTimeStamp(2024, 3, 30, 2, 45);
// unixToDateTime(1711269808);
  
decodeDataStr("0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000010f70000000000000000000000000000000000000000000000000000000066077a54000000000000000000000000000000000000000000000000000000000000004061686676692d6461656d682d68787732742d6c34737a6a2d656a6b34722d777a6274672d636a3378322d326e34686d2d733470746a2d61617534722d6672616e")