'use strict';

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

exports.checksumAcknowledge = [
  'messageType',
  'unitID',
  'numerator',
  'authenticationCode',
  'actionCode',
  'numeratorMessageReceived',
  'unusedBytes',
];
