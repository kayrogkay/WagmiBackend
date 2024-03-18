const {
    SecretsManager,
    simulateScript,
    buildRequestCBOR,
    ReturnType,
    decodeResult,
    Location,
    CodeLanguage,
  } = require("@chainlink/functions-toolkit");
    
  const characterId = args[0];
const apiResponse = await Functions.makeHttpRequest({
  url: `https://swapi.dev/api/people/${characterId}/`,
});
if (apiResponse.error) {
  throw Error("Request failed");
}
const { data } = apiResponse;
return Functions.encodeString(data.name);

  // Encode request
  const functionsRequestBytesHexString = buildRequestCBOR({
    codeLocation: Location.Inline, // Location of the source code - Only Inline is supported at the moment
    codeLanguage: CodeLanguage.JavaScript, // Code language - Only JavaScript is supported at the moment
    secretsLocation: Location.DONHosted, // Location of the encrypted secrets - DONHosted in this example
    source: source, // soure code
    encryptedSecretsReference: donHostedEncryptedSecretsReference,
    args: args,
    bytesArgs: [], // bytesArgs - arguments can be encoded off-chain to bytes.
  });