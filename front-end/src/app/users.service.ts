import { Injectable } from '@angular/core';

export class User {
  id: number;
  name: string;
  email: string;
  user_type: string;
  passwd: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = new Array();
  constructor() {
    let user_ids = [0,1,2,3,4,5];
    let user_names = ["Joir Medeiros Medeiros",
      "Ronaldo de Figueiredo Silveira", "Marcel Vinicius Medeiros Oliveira",
      "Monica Magalhães Pereira", "Lucas Torres de Souza", "admin"
    ];
    let user_type = ["STUDENT", "STUDENT", "PROFESSOR", "PROFESSOR", "STUDENT",
      "ADMIN"
    ];
    let user_mail = ["joir@gmail.com", "ronis@gmail.com", "marcel@gmail.com", 
      "monica@gmail.com", "torres@gmail.com", "admin@gmail.com"
    ];
    let user_passwd = ["1234", "1234", "1234", 
      "1234", "1234", "1234"
    ];

    for (let i in user_ids) {
      let new_user = new User();
      new_user.id = user_ids[i];
      new_user.name = user_names[i];
      new_user.user_type = user_type[i];
      new_user.email = user_mail[i];
      new_user.passwd = user_passwd[i];
      this.users.push(new_user)
    }
  }

  obtainUsers(){
    return this.users;
  }

  obtainUser(id: Number): User{
    for (let user of this.users){
      if (id == user.id){
        return user;
      }
    }

    return new User();
  }
}
