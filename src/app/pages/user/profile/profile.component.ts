import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {UserProfile} from "../../../../shared/interfaces/user/user-profile.interface";
import {AuthService} from "../../../../shared/services/auth.service";
import {UserService} from "../user.service";
import {takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends DestroySubscription implements OnInit {
  user: UserProfile | null = null;
  name?: string
  email = ''
  avatarUrl?: string;
  base64Image: string | null = null;
  avatarImage: File | null = null
  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly matSnack: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.getUserInfo()
  }

  getUserSubImage(type: string): string {
    if (type === 'The Adventurer') {
      return 'assets/images/adv-sub.png'
    }

    return 'assets/images/adv-sub.png'
  }

  submitProfileChanges() {
    //todo add backend method
    if (this.user) {
      this.user.email = this.email
      this.user.name = this.name
    }
  }

  loadFile(event: any) {
    this.avatarImage = event.target.files[0] as File;

    if (this.avatarImage) {
      const reader = new FileReader();

      reader.onload = () => {
        this.base64Image = reader.result as string;
      };

      reader.readAsDataURL(this.avatarImage);
      this.uploadAvatar();
    }
  }

  uploadAvatar(): void {
    if (!this.avatarImage) {
      return;
    }

    this.removeOldPhoto()

    this.userService.uploadAvatar(this.avatarImage).pipe(takeUntil(this.destroyStream$)).subscribe(
      (data) => {
        this.matSnack.open('File upload', '', {
          duration: 3000,
          verticalPosition: "top"
        });
        this.avatarUrl = data.fileName;
      },
      (error) => {
        this.matSnack.open(error.error.message, '', {
          duration: 3000,
          verticalPosition: "top"
        });
      }
    );

  }

  private removeOldPhoto() {
    if (this.avatarUrl) {
      this.userService.removePhoto(this.avatarUrl).pipe(takeUntil(this.destroyStream$)).subscribe(data => {

      })
    }
  }

  private getUserInfo() {
    this.authService.userProfile$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if (data) {
        this.user = data
        this.name = this.user.name
        this.email = this.user.email
        this.avatarUrl = this.user.avatarUrl
      }
    })

  }
}
