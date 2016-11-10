'use strict';

module.exports = {
  reset: {
    codeField: '0202',
    firstDataField: '0202', 
    secondDataField: '0000'
  },
  status: {
    codeField: '0000',
    firstDataField: '0000',
    secondDataField: '0000'
  },
  activateImmobilizer: {
    codeField: '0303',
    firstDataField: '0505',
    secondDataField: '0000'
  },
  deactivateImmobilizer: {
    codeField: '0303',
    firstDataField: '1515',
    secondDataField: '0000'
  },
  activateEngineStop: {
    codeField: '0707',
    firstDataField: '0000',
    secondDataField: '0000'
  },
  deactivateEngineStop: {
    codeField: '0707',
    firstDataField: '0101',
    secondDataField: '0000'
  },
  transparentModeStart: {
    codeField: '1515',
    firstDataField: '0101',
    secondDataField: '0000'
  },
  transparentModeStop: {
    codeField: '1515',
    firstDataField: '0000',
    secondDataField: '0000'
  },
  eraseTrackingLog: {
    codeField: '0D0D',
    firstDataField: '0000',
    secondDataField: '0000'
  },
  activateSiren: {
    codeField: '0303',
    firstDataField: '1010',
    secondDataField: '0000'
  },
  deactivateSiren: {
    codeField: '0303',
    firstDataField: '0000',
    secondDataField: '0000'
  }
};
