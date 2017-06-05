'use strict';

/*
  4D434750                -> 04 bytes
  04                      -> 01 bytes
  81C90800                -> 04 bytes
  14                      -> 01 bytes
  00000000                -> 04 bytes
  0202                    -> 02 bytes
  0202                    -> 02 bytes
  0000                    -> 02 bytes
  00000000                -> 04 bytes
  4D                      -> 01 bytes
  ===================================
                             25 bytes
*/
exports.command = {
  mcgp: '4D434750',
  messageType: '00',
  unitID: null,
  numerator: null,
  authenticationCode: '00000000',
  codeField: null,
  firstDataField: null,
  secondDataField: null,
  specificDataField: '00000000',
  errorDetectionCode: null
};

/*
  4D434750                -> 04 bytes
  04                      -> 01 bytes
  81C90800                -> 04 bytes
  14                      -> 01 bytes
  00000000                -> 04 bytes
  00                      -> 01 bytes
  16                      -> 01 bytes
  0000000000000000000000  -> 11 bytes
  80                      -> 01 bytes
  ===================================
                             28 bytes
*/
exports.acknowledge = {
  mcgp: '4D434750',
  messageType: '04',
  unitID: null,
  numerator: null,
  authenticationCode: '00000000',
  actionCode: '00',
  numeratorMessageReceived: null,
  unusedBytes: '0000000000000000000000',
  errorDetectionCode: null
}
