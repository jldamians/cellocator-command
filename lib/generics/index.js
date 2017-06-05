'use strict';

var generic = require('./command'),
    constants = require('../constants');

var FIELDS_VALUES = constants.fieldsValues;

/**
 * Comandos generico
 * @param {integer} unitID: serie del equipo gps
 * @param {integer} numerator: contador de veces que se ha ejecutando un comando
 * @param {object} configure: valores adicionales del comando
 * @return {Buffer}
 */
exports.getGenericCommand = function(unitID, numerator, configure) {
  return generic.command(unitID, numerator, configure);
}
exports.getReset = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.reset);
}
exports.getStatus = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.status);
}
exports.getActivateImmobilizer = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.activateImmobilizer);
}
exports.getDeactivateImmobilizer = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.deactivateImmobilizer);
}
exports.getActivateEngineStop = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.activateEngineStop);
}
exports.getDeactivateEngineStop = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.deactivateEngineStop);
}
exports.getTransparentModeStart = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.transparentModeStart);
}
exports.getTransparentModeStop = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.transparentModeStop);
}
exports.getEraseTrackingLog = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.eraseTrackingLog);
}
exports.getActivateSiren = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.activateSiren);
}
exports.getDeactivateSiren = function(unitID, numerator) {
  return generic.command(unitID, numerator, FIELDS_VALUES.deactivateSiren);
}

/**
 * ACK de confirmacion de trama. Se generara para confirmarle al gps la recepción de cada trama
 * @param {integer} unitID: serie del equipo gps
 * @param {integer} numerator: "Command Numerator" correlativo de las veces que se va ejecutando un comando
 * @param {integer} message: "Message Numerator of message received" de la trama recibida (consultar modulo "/decode")
 * @return {Buffer}
 */
exports.getGenericAcknowledge = function(unitID, numerator, message) {
  return generic.acknowledge(unitID, numerator, message);
}
