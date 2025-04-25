import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileimg: string = "https://th.bing.com/th/id/OIP.G37tgeQqSNt7v2oPfj9ltQHaE7?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"

  allUserDownloadList: any = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getUserDownloadRecipe()

    const user = JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic){
      this.profileimg = user.profilePic
      
    }
  }

  getUserDownloadRecipe() {
    this.api.getUserDownloadRecipeAPI().subscribe((res: any) => {
      this.allUserDownloadList = res
      console.log(this.allUserDownloadList);

    })
  }

  getFile(event: any) {
    let uploadFile = event.target.files[0]
    //convert file into url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.profileimg = event.target.result

    }
  }

  updateProfile() {
    this.api.editUserApi({ profilePic: this.profileimg }).subscribe((res: any) => {
      sessionStorage.setItem("user", JSON.stringify(res))
      this.profileimg = res.profilePic
      alert(`Profile updated successfully`)
    })
  }
}
