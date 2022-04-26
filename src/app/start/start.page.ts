import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(
    private aPermission: AndroidPermissions

  ) { }

  ngOnInit() {
  }

  public async checkPermision(){
    await this.aPermission.checkPermission(this.aPermission.PERMISSION.CAMERA).then(
      result => console.log('Has Permission?', result.hasPermission),
      err => this.aPermission.requestPermission(this.aPermission.PERMISSION.CAMERA)
      );

      this.aPermission.requestPermissions([this.aPermission.PERMISSION.CAMERA, this.aPermission.PERMISSION.GET_ACCOUNTS]);
  }
}
