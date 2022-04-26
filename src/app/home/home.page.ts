import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { _ } from 'underscore';
import { Platform } from '@ionic/angular';
// import { Network } from '@ionic/angular/';
// import {  } from "@awe" ;
  // eslint-disable-next-line no-var
  declare var cv: any;
  declare let cordova;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public processingImage = false;
  public cameraReady = false;
  public takenImage: string;
  public videoSrc;

  constructor(
    // private network: NetworkInformation,
    private router: Router,
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.startCamera();
    setTimeout(() => {
      this.cameraReady = true;
    }, 1000);
  }

  // ionViewWillEnter(){

  // // }
  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.

  // // }
  ionViewWillLeave() {
    this.cameraReady = false;
  }

  // public checkNetwork(): void {
  //   if(this.network.type == "none") alert("Warning: You have no network connection");
  // }

  public async startCamera() {
    // this.checkNetwork();

    const videoConstraints = {
      audio: false,
      video: {
        facingMode: 'environment',
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        },
      }
    };

    const video = document.querySelector('video');

    if (this.platform.is('ios') && this.platform.is('cordova')) {

      cordova.plugins.iosrtc.getUserMedia(videoConstraints).then((stream) => {
          video.srcObject = stream;

          setInterval(() => {
            this.processImageAnalysis(video);
          }, 100);
        }
      );

    } else {
      const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      video.srcObject = stream;

      setInterval(() => {
        this.processImageAnalysis(video);
      }, 100);
    }


  }

  private processImageAnalysis(video) {
    const canvas = document.createElement('canvas');
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    const src = cv.imread(canvas);
    const dst = new cv.Mat();

    cv.cvtColor(src, src, cv.COLOR_BGR2GRAY, 0);
    cv.bilateralFilter(src, dst, 7, 50, 50, cv.BORDER_DEFAULT);
    cv.Canny(src, dst, 8, 250, 3, false);

    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete();

  }
}

