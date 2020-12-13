import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const directory = "documents"
const bucket = admin.storage().bucket();

exports.searchDocuments = functions.https.onCall(async (prefix, context) => {
    const [ files ] = await bucket.getFiles({ prefix: `${directory}/${prefix}` });
    const metadataSesponses = await Promise.all(files.map(f => f.getMetadata()));
    
    return metadataSesponses.map(([ metadata ]) => ({
        name: metadata.name.replace(`${directory}/`, ''),
        size: parseInt(metadata.size),
    })).filter(x => !!x.name);
});