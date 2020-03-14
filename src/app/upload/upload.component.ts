import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {Picture} from '../picture';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  // picture: Picture;
  // image: string;
  arrayPicture = [];
  message = '';
  isShow = false;
  isSuccess = true;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
  }

  uploadFile(event) {
    const file = event.target.files;
    const metadata = {
      contentType: 'image/jpeg',
    };
    for (let i = 0; i < file.length; i++) {
      const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[i], metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            //           // this.picture = {name: downloadURL};
            // this.image = downloadURL;
            this.arrayPicture.push(downloadURL);
          });
        }
      );
    }
    console.log(this.arrayPicture);
    this.isShow = true;
    this.isSuccess = true;
    this.message = 'Thêm thành công!';
  }
}
