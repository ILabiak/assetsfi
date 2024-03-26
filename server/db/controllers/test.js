const NodeRSA = require('node-rsa');
require('dotenv').config();

// const key = new NodeRSA({ b: 512 });

// const public = key.exportKey('public')
// const private = key.exportKey('private')
// console.log(public)
// console.dir(Buffer.from(public).toString('base64'))

// console.log('\n\n')
// console.log(private)
// console.dir(Buffer.from(private).toString('base64'))


/*

-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJzreE4g1sP4vdPiR8YSRWzhAv+28oXT
e6nKp7fFyIhdON73KoXA4iJuJ/nas/uOrZBOBj2VrsKIj9WBg5FWEw0CAwEAAQ==
-----END PUBLIC KEY-----
'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZ3d0RRWUpLb1pJaHZjTkFRRUJCUUFEU3dBd1NBSkJBSnpyZUU0ZzFzUDR2ZFBpUjhZU1JXemhBdisyOG9YVAplNm5LcDdmRnlJaGRPTjczS29YQTRpSnVKL25hcy91T3JaQk9CajJWcnNLSWo5V0JnNUZXRXcwQ0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ=='



-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAJzreE4g1sP4vdPiR8YSRWzhAv+28oXTe6nKp7fFyIhdON73KoXA
4iJuJ/nas/uOrZBOBj2VrsKIj9WBg5FWEw0CAwEAAQJAVpXPYjzYhHYCOKIJPI/k
YvmdsAAAvjs9Zyj9dnfZ+POnrtkOGyrMtu/ZcdFqIHk/4dLX3tEIN7xgmLMKHTQx
eQIhAOkncrRSnPNb+K7MAyhtOJbBiKlWCsK6FIJEphaP8vInAiEArEu5NaZI/ILG
949uNMsfiKmvRx3u6o4a/l27u7mZ9asCIQCl4xhcrm7XQ7fTfno8uEFMGhUHDp4H
YGgZK4jUgsUDfwIgaZ3ppPeQGipYqXzlA7vYUsAh0CiLQoFmDrOK12LI/A0CID58
L65cVqCoUkETCC3zdCkMzATG7kD3AGtKFuD6tv5x
-----END RSA PRIVATE KEY-----
'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCT2dJQkFBSkJBSnpyZUU0ZzFzUDR2ZFBpUjhZU1JXemhBdisyOG9YVGU2bktwN2ZGeUloZE9ONzNLb1hBCjRpSnVKL25hcy91T3JaQk9CajJWcnNLSWo5V0JnNUZXRXcwQ0F3RUFBUUpBVnBYUFlqelloSFlDT0tJSlBJL2sKWXZtZHNBQUF2anM5WnlqOWRuZlorUE9ucnRrT0d5ck10dS9aY2RGcUlIay80ZExYM3RFSU43eGdtTE1LSFRReAplUUloQU9rbmNyUlNuUE5iK0s3TUF5aHRPSmJCaUtsV0NzSzZGSUpFcGhhUDh2SW5BaUVBckV1NU5hWkkvSUxHCjk0OXVOTXNmaUttdlJ4M3U2bzRhL2wyN3U3bVo5YXNDSVFDbDR4aGNybTdYUTdmVGZubzh1RUZNR2hVSERwNEgKWUdnWks0alVnc1VEZndJZ2FaM3BwUGVRR2lwWXFYemxBN3ZZVXNBaDBDaUxRb0ZtRHJPSzEyTEkvQTBDSUQ1OApMNjVjVnFDb1VrRVRDQzN6ZENrTXpBVEc3a0QzQUd0S0Z1RDZ0djV4Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t'

*/

let public = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZ3d0RRWUpLb1pJaHZjTkFRRUJCUUFEU3dBd1NBSkJBSnpyZUU0ZzFzUDR2ZFBpUjhZU1JXemhBdisyOG9YVAplNm5LcDdmRnlJaGRPTjczS29YQTRpSnVKL25hcy91T3JaQk9CajJWcnNLSWo5V0JnNUZXRXcwQ0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ=='

let private = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCT2dJQkFBSkJBSnpyZUU0ZzFzUDR2ZFBpUjhZU1JXemhBdisyOG9YVGU2bktwN2ZGeUloZE9ONzNLb1hBCjRpSnVKL25hcy91T3JaQk9CajJWcnNLSWo5V0JnNUZXRXcwQ0F3RUFBUUpBVnBYUFlqelloSFlDT0tJSlBJL2sKWXZtZHNBQUF2anM5WnlqOWRuZlorUE9ucnRrT0d5ck10dS9aY2RGcUlIay80ZExYM3RFSU43eGdtTE1LSFRReAplUUloQU9rbmNyUlNuUE5iK0s3TUF5aHRPSmJCaUtsV0NzSzZGSUpFcGhhUDh2SW5BaUVBckV1NU5hWkkvSUxHCjk0OXVOTXNmaUttdlJ4M3U2bzRhL2wyN3U3bVo5YXNDSVFDbDR4aGNybTdYUTdmVGZubzh1RUZNR2hVSERwNEgKWUdnWks0alVnc1VEZndJZ2FaM3BwUGVRR2lwWXFYemxBN3ZZVXNBaDBDaUxRb0ZtRHJPSzEyTEkvQTBDSUQ1OApMNjVjVnFDb1VrRVRDQzN6ZENrTXpBVEc3a0QzQUd0S0Z1RDZ0djV4Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t'

let publicKey = Buffer.from(process.env.API_KEY_PUBLIC, 'base64').toString('ascii')

let privateKey = Buffer.from(process.env.RSA_KEY_PRIVATE, 'base64').toString('ascii')

// console.dir({publicKey, privateKey})

let obj = {
    apiKey: 'sdf',
    apiSecret: 'sdfsdf'
}

const key1 = new NodeRSA(publicKey, 'public')

let encryptedMessage = key1.encrypt(JSON.stringify(obj), 'base64', 'utf-8');

console.log('Encrypted: ', encryptedMessage)

const key2 = new NodeRSA(privateKey, 'private')

let decryptedMessage = key2.decrypt(encryptedMessage, 'utf8')

console.log('Decrypted: ', decryptedMessage)

