'use strict';

var merge = require('lodash.merge'),
    ConvertBase = require('convert-base'),
    isEmptyObject = require('is-empty-object');

var helpers = require('../helpers'),
    constants = require('../constants');

var DEFAULTS = constants.defaults,
    FEATURES = constants.features,
    STRUCTURES = constants.structures,
    GENERIC_TYPES = constants.genericTypes;

var converter = new ConvertBase();

function generateGeneric(argGenericType, argInfo) {
  var genericChunk,
      genericStructure,
      genericChecksum,
      features;

  if (argGenericType === GENERIC_TYPES.commands) {
    genericStructure = STRUCTURES.commands;
    genericChecksum = STRUCTURES.checksumCommands;
    features = FEATURES.commands;
  } else {
    genericStructure = STRUCTURES.acknowledge;
    genericChecksum = STRUCTURES.checksumAcknowledge;
    features = FEATURES.acknowledge
  }

  argInfo.errorDetectionCode = helpers.checksum(
    helpers.chunk(argInfo, genericChecksum, features)
  );

  genericChunk = helpers.chunk(argInfo, genericStructure, features);

  return new Buffer(genericChunk, 'hex');
}

function commands(unitID, numerator, configure) {
  var commandsValues;

  commandsValues = merge(
    DEFAULTS.commands,
    configure, {
      unitID: unitID,
      numerator: numerator
    }
  );

  return generateGeneric(GENERIC_TYPES.commands, commandsValues);
}

function acknowledge(unitID, numerator, message) {
  var acknowledgeValues;

  acknowledgeValues = merge(
    DEFAULTS.acknowledge, {
      unitID: unitID,
      numerator: numerator,
      numeratorMessageReceived: message
    }
  );

  return generateGeneric(GENERIC_TYPES.acknowledge, acknowledgeValues);
}

/**
 * Comandos generico
 * @param {integer} unitID: serie del equipo gps
 * @param {integer} numerator: contador de veces que se ha ejecutando un comando
 * @param {object} configure: valores adicionales del comando
 * @return {Buffer}
 */
exports.getGenericCommands = function(unitID, numerator, configure) {
  if (!unitID) {
    throw new Error('Ingrese un valor válido para "unitID".');
  }

  if (!numerator) {
    throw new Error('Ingrese un valor válido para "numerator".');
  }

  if (isEmptyObject(configure)) {
    throw new Error('Ingrese un valor válido para "configure".');
  }

  unitID = helpers.reverseHexadecimal(
    helpers.lpad(converter.convert(unitID, 10, 16), 8)
  );

  numerator = numerator > 255 ? 0 : numerator;
  numerator = helpers.lpad(converter.convert(numerator, 10, 16), 2);

  return commands(unitID, numerator, configure);
}

/**
 * ACK de confirmacion de trama. Se generara para confirmarle al gps la recepción de cada trama
 * @param {integer} unitID: serie del equipo gps
 * @param {integer} numerator: correlativo de las veces que se va ejecutando un comando
 * @param {integer} message: messageNumerator de la trama recibida (consultar modulo "/decode")
 * @return {Buffer}
 */
exports.getGenericAcknowledge = function(unitID, numerator, message) {
  if (!unitID) {
    throw new Error('Ingrese un valor válido para "unitID".');
  }

  if (!numerator) {
    throw new Error('Ingrese un valor válido para "numerator".');
  }

  if (!message) {
    throw new Error('Ingrese un valor válido para "message".');
  }

  unitID = helpers.reverseHexadecimal(
    helpers.lpad(converter.convert(unitID, 10, 16), 8)
  );

  numerator = numerator > 255 ? 0 : numerator;
  numerator = helpers.lpad(converter.convert(numerator, 10, 16), 2);

  message = helpers.lpad(converter.convert(message, 10, 16), 2);

  return acknowledge(unitID, numerator, message);
}

exports.commandsValues = constants.commandsValues;
