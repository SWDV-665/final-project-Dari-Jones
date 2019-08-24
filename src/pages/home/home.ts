import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { InventoryServiceProvider } from '../../providers/inventory-service/inventory-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

// Images
import { Camera, CameraOptions } from '@ionic-native/camera'; // imports Camera
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Pet Inventory";

  items = [];
  errorMessage: string;

  // Photos
  public photos : any;
  public base64Image : string;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection:0
  }

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: InventoryServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing, private camera: Camera, private imagePicker: ImagePicker) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {      // Data Service is InventoryServiceProvider
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }

  removeItem(id) {
    this.dataService.removeItem(id);
  }

  shareItem(item) {
    console.log("Sharing Item - ", item);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + item.name + " ...",
      duration: 3000
    });

    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });

  }

  editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

  // Camera
  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    console.log("Camera Opened!");
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  // Image Picker
  chooseImage () {
    console.log("Choosing Image");
    this.imagePicker.getPictures(this.options) //base64 output
  .then((results) => {
      return 'data:image/jpeg;base64,'+results[0]; 
  });
  }
  

} // completed changes
