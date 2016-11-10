'use strict';

exports.commands = {
  mcgp: { width: 8 },
  messageType: { width: 2 },
  unitID: { width: 8 },
  numerator: { width: 2 },
  authenticationCode: { width: 8 },
  codeField: { width: 4 },
  firstDataField: { width: 4 },
  secondDataField: { width: 4 },
  specificDataField: { width: 8 },
  errorDetectionCode: { width: 2 }
};

exports.acknowledge = {
  mcgp: { width: 8 },
  messageType: { width: 2 },
  unitID: { width: 8 },
  numerator: { width: 2 },
  authenticationCode: { width: 8 },
  actionCode: { width: 2 },
  numeratorMessageReceived: { width: 2 },
  unusedBytes: { width: 22 },
  errorDetectionCode: { width: 2 }
}
