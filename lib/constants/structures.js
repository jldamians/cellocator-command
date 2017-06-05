'use strict';

/**
  * GENERIC COMMANDS: CONSTANT LENGTH (25 BYTES)
  *
  */
exports.commands = [
  'mcgp',
  'messageType',
  'unitID',
  'numerator',
  'authenticationCode',
  'codeField',
  'firstDataField',
  'secondDataField',
  'specificDataField',
  'errorDetectionCode'
];

/**
  *
  * Estructura de la trama para el "Error Detection Code" del "command"
  */
exports.checksumCommands = [
  'messageType',
  'unitID',
  'numerator',
  'authenticationCode',
  'codeField',
  'firstDataField',
  'secondDataField',
  'specificDataField',
];

/**
 * GENERIC ACKNOWLEDGE MESSAGE: CONSTANT LENGTH (28 BYTES)
 * 
 */
exports.acknowledge = [
  'mcgp',
  'messageType',
  'unitID',
  'numerator',
  'authenticationCode',
  'actionCode',
  'numeratorMessageReceived',
  'unusedBytes',
  'errorDetectionCode'
];

/**
  * Estructura de la trama para el "Error Detection Code" del "acknowledge"
  */
exports.checksumAcknowledge = [
  'messageType',
  'unitID',
  'numerator',
  'authenticationCode',
  'actionCode',
  'numeratorMessageReceived',
  'unusedBytes',
];
