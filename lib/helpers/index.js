'use strict';

var util = require('util'),
    ConvertBase = require('convert-base');

var converter = new ConvertBase();

/**
 * Realiza la suma de comprobacion de trama (checksum)
 * @param {string} arg: cadena con valores hexadecimales
 * @return {string}
 */
exports.checksum = function checksum(argChunk) {
  var lsb,
      currentByte,
      sumHexadecimal,
      sumDecimal = 0;

  for (var i = 0; i < argChunk.length - 1; i += 2) {
    currentByte = argChunk.substr(i, 2);
    sumDecimal += converter.convert(currentByte, 16, 10);
  }

  sumHexadecimal = converter.convert(sumDecimal, 10, 16);

  // Extraemos el Bit Menos Significativo (LSB)
  lsb = sumHexadecimal.substr(-2);

  return lsb;
}

/**
 * Rellena el valor "argValue" por la izquierda hasta la longitud "argWidth" con el caracter "argCharacter" definido
 * @param {string} argValue: Valor que será rellenado
 * @param {integer} argWidth: Longitud final que tendrá el valor
 * @param {string} argCharacter: Caracter con el que será rellenado el valor
 * @return {string}
 */
exports.lpad = function lpad(argValue, argWidth, argCharacter) {
  var character = argCharacter ? argCharacter : '0',
      value = argValue ? argValue : '',
      width = argWidth ? argWidth : 0;

  return value.length >= width ? value : new Array(width - value.length + 1).join(character).concat(value);
}

/**
  * @param {object} argInfo: elementos con los valores del comando
  * @param {array} argStructure: orden en el que serán concatenados los elementos del comando
  * @return {string}
  */
exports.chunk = function chunk(argInfo, argStructure) {
  return argStructure.reduce(function(chunk, fieldOfStructure) {
    var valueOfField = argInfo[fieldOfStructure];

    if (typeof valueOfField === 'string' || valueOfField instanceof String || valueOfField === null || valueOfField === undefined) {
      throw new Error(util.format(
        'No se ha definido un valor para "{%s: %s}"', fieldOfStructure, valueOfField
      ));
    }

    return util.format('%s%s', chunk, valueOfField);
  }, '');
}

/**
 * Invertir la cadena hexadecimal en pares
 * @param {string} hexadecimal: valor hexadecimal
 * @return {string}
 */
exports.reverseHexadecimal = function reverseHexadecimal(hexadecimal) {
  var reverse = '',
      currentChunk;

  for (var i = 0; i < hexadecimal.length - 1; i += 2) {
    currentChunk = hexadecimal.substring(i, i + 2);
    reverse = `${currentChunk}${reverse}`;
  }

  return reverse;
};
