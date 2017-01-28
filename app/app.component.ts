import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

const PouchDB = require('pouchdb-browser');
const blobUtil = require('blob-util');

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    domSanitizer: DomSanitizer;
    name: string;
    originalSrc: string;
    base64Src: string;
    blobSrc: SafeUrl;
    display: string;

    constructor(domSanitizer: DomSanitizer) {
        this.domSanitizer = domSanitizer;
        this.name = 'Angular';
        this.originalSrc = '../assets/meowth.png';
        this.display = '';
    }

    ngOnInit(): void {
        new PouchDB('sample')
            .destroy()
            .then(() => new PouchDB('sample'))
            .then((db: any) => {
                blobUtil.imgSrcToBlob(this.originalSrc)
                    .then((blob: Blob) => {
                        this.display += 'Read the content of the img as a blob of size ' + blob.size;

                        // return db.putAttachment('meowth', 'meowth', blob, 'image/png');
                        return db.put({
                            _id: 'meowth',
                            _attachments: {
                                'meowth': {
                                    content_type: 'image/png',
                                    data: blob
                                }
                            }
                        });
                    })
                    .then(() => db.get('meowth', { attachments: true, binary: false }))
                    .then((doc: any) => {
                        this.base64Src = `data:image/png;base64,${doc._attachments['meowth'].data}`;
                        this.display += '\nGot our doc with an attachment! It looks like this: ' + JSON.stringify(doc);
                        this.display += '\nAnd the base64-encoded content of the image is this: ' + JSON.stringify(doc._attachments['meowth'].data);

                        return db.getAttachment('meowth', 'meowth');
                    })
                    .then((blob: Blob) => {
                        this.blobSrc = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
                        this.display += "\nThe second image is our stored blob, after reading it out of the database.";
                    });
            });
    }

}