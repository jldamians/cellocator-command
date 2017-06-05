'use strict';

var pick = require('lodash.pick'),
    merge = require('lodash.merge'),
    ConvertBase = require('convert-base'),
    isEmptyObject = require('is-empty-object'),
    helpers = require('../helpers'),
    constants = require('../constants');

var STRUCTURES = constants.structures,
    GENERIC_TYPES = constants.genericTypes,
    DEFAULT_VALUES = constants.defaultValues;

var converter = new ConvertBase();

function generateGeneric(argGenericType, argInfo) {
  var genericChunk,
      genericStructure,
      checksumStructure,
      errorDetectionCode;

  if (argGenericType === GENERIC_TYPES.command) {
    genericStructure = STRUCTURES.commands;
    checksumStructure = STRUCTURES.checksumCommands;
  } else {
    genericStructure = STRUCTURES.acknowledge;
    checksumStructure = STRUCTURES.checksumAcknowledge;
  }

  // Calcular la suma de comprobación para la trama que se está generando.
  // Este valor será el "Código de Detección de Error"
  errorDetectionCode = helpers.checksum(
    helpers.chunk(
      pick(argInfo, checksumStructure),
      checksumStructure
    )
  );

  // Agregando el "Código de Detección de Error",
  // a la estructura de la trama
  argInfo.errorDetectionCode = errorDetectionCode;

  // Generando la trama del comando
  genericChunk = helpers.chunk(
    pick(argInfo, genericStructure),
    genericStructure
  );

  return new Buffer(genericChunk, 'hex');
}

/**
 * Comandos generico
 * @param {integer} unitID: serie del equipo gps
 * @param {integer} numerator: contador de veces que se ha ejecutando un comando
 * @param {object} configure: valores adicionales del comando
 * @return {Buffer}
 */
exports.command = function(unitID, numerator, configure) {
  var unitIdentity,
      commandNumerator,
      commandFieldsValue;

  if (!unitID) {
    throw new Error('Ingrese un valor válido para "unitID".');
  }

  if (!numerator) {
    throw new Error('Ingrese un valor válido para "numerator".');
  }

  if (isEmptyObject(configure)) {
    throw new Error('Ingrese un valor válido para "configure".');
  }

  unitIdentity = helpers.reverseHexadecimal(
    helpers.lpad(converter.convert(unitID, 10, 16), 8)
  );

  commandNumerator = helpers.lpad(
    converter.convert(numerator, 10, 16), 2
  );

  commandFieldsValue = merge(
    DEFAULT_VALUES.command,
    configure
  );

  commandFieldsValue = merge(
    commandFieldsValue, {
      unitID: unitIdentity,
      numerator: commandNumerator
    }
  );

  return generateGeneric(GENERIC_TYPES.command, commandFieldsValue);
}

/**
 * ACK de confirmacion de trama. Se generara para confirmarle al gps la recepción de cada trama
 * @param {integer} unitID: serie del equipo gps
 * @param {integer} numerator: "Command Numerator" correlativo de las veces que se va ejecutando un comando
 * @param {integer} message: "Message Numerator of message received" de la trama recibida (consultar modulo "/decode")
 * @return {Buffer}
 */
exports.acknowledge = function(unitID, numerator, message) {
  var unitIdentity,
      commandNumerator,
      messageNumerator,
      acknowledgeFieldsValues;

  if (!unitID) {
    throw new Error('Ingrese un valor válido para "unitID".');
  }

  if (!numerator) {
    throw new Error('Ingrese un valor válido para "numerator".');
  }

  if (!message) {
    throw new Error('Ingrese un valor válido para "message".');
  }

  unitIdentity = helpers.reverseHexadecimal(
    helpers.lpad(converter.convert(unitID, 10, 16), 8)
  );

  commandNumerator = helpers.lpad(
    converter.convert(numerator, 10, 16), 2
  );

  messageNumerator = helpers.lpad(
    converter.convert(message, 10, 16), 2
  );

  acknowledgeFieldsValues = merge(
    DEFAULT_VALUES.acknowledge, {
      unitID: unitIdentity,
      numerator: commandNumerator,
      numeratorMessageReceived: messageNumerator
    }
  );

  return generateGeneric(GENERIC_TYPES.acknowledge, acknowledgeFieldsValues);
}
