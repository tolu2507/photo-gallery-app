import { Component, OnInit } from '@angular/core';
import { Data, WordpressService } from '../services/wp/wordpress.service';
import { LoadingController } from '@ionic/angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  presentingElement: Element | null = null;
  token: string = '';
  data: any[] = [];
  httpOptions: any;
  id!: any;

  title = new FormControl('');
  content = new FormControl('');
  status = 'publish';

  isModalOpen = false;

  setOpen(isOpen: boolean, id?: string) {
    this.isModalOpen = isOpen;
    if (id) {
      this.id = id;
    }
  }
  constructor(
    public wordpressService: WordpressService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.saveUser();
    this.loadData();
    this.presentingElement = document.querySelector('.ion-page');
  }

  loadData() {
    this.wordpressService.getData().subscribe((res) => {
      this.data = res;
      console.log(
        this.data.map((item) => {
          return item.content.rendered;
        })
      );
    });
  }
  saveUser() {
    this.wordpressService.saveUser().subscribe((response: any) => {
      this.token = response.token;
      this.httpOptions = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      console.log(this.token);
    });
  }
  updateUser(title: any, content: any) {
    const body:Data = {
      title: title,
      content: content,
      status: this.status,
    };
    this.wordpressService
      .updateData(body, this.id, this.httpOptions)
      .subscribe((res) => {
        if (res !== null && res !== undefined) {
          this.loadData();
        } else {
          throw new Error('unable to update data');
        }
      });
  }
  createUser(title: any, content: any) {
    const body:Data = {
      title: title,
      content: content,
      status: this.status,
    };

    this.wordpressService
      .cretaeData(body, this.httpOptions)
      .subscribe((res) => {
        if (res !== null && res !== undefined) {
          this.loadData();
        } else {
          throw new Error('unable to update data');
        }
      });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3500,
      spinner: 'circular'
    });

    loading.present();
  }
}
