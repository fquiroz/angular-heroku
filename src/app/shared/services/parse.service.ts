import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {User} from '../domain/User';
import {Producto} from '../domain/producto';

import * as Parse from 'parse';

@Injectable()
export class ParseService {
  newsQuery // TODO: type
  chatQueries : Map<string,any>;
  currentUser :Parse.User;

  constructor() {
    this.chatQueries = new Map<string,any>()
    console.log('Parse initialized!')
    Parse.initialize("myAppId");
    Parse.serverURL = 'https://servidorparse.herokuapp.com/parse'
  }

  public newsSubscription() {
    if (!this.newsQuery) {
      this.newsQuery = new Parse.Query('News');
    }
    return this.newsQuery.subscribe();
  }

  public joinRoom(roomId: string) {
    let query = this.chatQueries.get(roomId)
    if (!query) {
      query = new Parse.Query('Chat');
      this.chatQueries.set(roomId, query)
    }
    query.equalTo("room", {
        __type: "Pointer",
        className: "Room",
        objectId: roomId
    });
    return query.subscribe();
  }

  public exitRoom(roomId) {
    let query = this.chatQueries.get(roomId)
    if (query) {
      query.unsubscribe()
      this.chatQueries.delete(roomId)
    }
  }

  public login(email:string,password:string): Observable<boolean> {
    return new Observable(observer => {
      Parse.User.logIn(email, password, {
        success: function(usr) {
         
          this.currentUser = Parse.User.current();
            if (this.currentUser) {
                // do stuff with the user
            } else {
                // show the signup or login page
            }

          observer.next(true)
          observer.complete()
        },
        error: function(user, error) {
          observer.error(error)
          observer.complete()
        }
      });
    })
  }

  public register(username:string,password:string): Observable<boolean> {
    return new Observable(observer => {
      var user = new Parse.User()
      user.set("username", username)
      user.set("password", password)
      // user.set("email", "email@example.com");

      user.signUp(null, {
        success: (user) => {
          observer.next(true)
          observer.complete()
        },
        error: (user, error) => {
          observer.error(error)
          observer.complete()
        }
      })
    })
  }

  public logout(): Observable<boolean> {
    return new Observable(observer => {
      if ( Parse.User.current() ) {
        
        Parse.User.logOut().then(() => {
          this.currentUser= Parse.User.current();  // this will now be null
        });
    
        // check if really logged out
        if (Parse.User.current()){
          console.log("Failed to log out!");
        }
            
    }

      observer.next(true);
    })
  }

  public getCurrentUser(): User {

    let u = Parse.User.current()
    if (u) {
      var user = new User()
      user.id = u.id
      user.name = u.get('username')
      // TODO: avarta
      return user
    }
    return null
  }

   getUserRoles(user) {

    var queries = [
      new Parse.Query(Parse.Role).equalTo('users', user)
    ];
  /*   for (var i = 0; i < 2; i++) {
      queries.push(new Parse.Query('_Role').matchesQuery('roles', queries[i]));
    } 
    
     user = Parse.Query.or.apply(Parse.Query, queries).find().then(
      function(roles) {
        return roles.map(function(role) {
          return role.get('name');
        });
      }
    );

    let u = Parse.User.current()
    const userRoleQuery = u.relation(Parse.Role).query();

        const role = userRoleQuery.find();

var Role = Parse.Object.extend("_Role");
var User = Parse.Object.extend("_User");


var innerQuery = new Parse.Query(Parse.Role);


innerQuery.find({
  success: function(comments) {

    for (var i = 0; i < comments.length; i++) {
      // This does not require a network access.
      var post = comments[i].get("users");
      var user =post.query().find();
      alert("roles " + comments.length + " scores.");
    }
    
    // comments now contains the comments for myPost
  }
});
var query = new Parse.Query(User);
query.equalTo("username", "fquiroz");
query.find({
  success: function(comments) {
    alert("usuario " + comments.length + " scores.");
    // comments now contains the comments for myPost
  }
});*/


  }

  // TODO: paging
 /*  public loadAllMessages(roomId:string): Observable<ChatMessage[]> {
    return new Observable(observer => {
      let Chat = Parse.Object.extend("Chat")
      let chatQuery = new Parse.Query(Chat)
      chatQuery.limit(20)
      chatQuery.equalTo("room", {
        __type: "Pointer",
        className: "Room",
        objectId: roomId
      })
      chatQuery.ascending("createdAt")
      chatQuery.find({
        success:(result) => {
          var messages: ChatMessage[] = []
          for (let i = 0; i < result.length; i++) {
            var data = result[i];
            let message = new ChatMessage()
            let user = data.get('user')
            let from = data.get('from')
            message.content = data.get('message')
            message.senderName = from != null ? from : 'Anonymous'
            let me = user != null ? (user.id === this.currentUser.id) : false
            message.position = me ? "right" : "left"
            // TODO: from user object later
            message.img = me ? "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png" : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
            // TODO: from created date
            message.time = "1s ago"
            // console.log(message)
            messages.push(message)
          }
          observer.next(messages)
          observer.complete()
        },
        error: (error) => {
          observer.error(error)
          observer.complete()
        }
      })
    })
  } */

  // TODO: consider to return User
  /* public sendMessage(roomId:string,message:string): Observable<boolean> {
    return new Observable(observer => {
      // get room object based on roomId
      let Room = Parse.Object.extend("Room")
      let roomQuery = new Parse.Query(Room)
      roomQuery.equalTo('objectId',roomId)
      roomQuery.first({
        success: (object) => {
          var Chat = Parse.Object.extend("Chat");
          var chat = new Chat();

          chat.set("message", message);
          chat.set("user", Parse.User.current());
          chat.set("from", Parse.User.current().get('username'))
          chat.set("room", object)

          chat.save(null, {
            success: (result) => {
              observer.next(true)
              observer.complete()
            },
            error: (error) => {
              observer.error(error)
              observer.complete()
            }
          })
        },
        error: (error) => {
          observer.error({code:-1, message:"Join the room first"})
          observer.complete()
        }
      })
    })
  } */

  public getAllProductos():Observable<Producto[]>{

    // find all
      
    let Producto = Parse.Object.extend("Producto")
    let query = new Parse.Query(Producto)
    // find all
  
    return new Observable(observer => {
      let productos : Producto[] = [];

      query.find({
        success: (results) => {
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            // alert(object.id + ' - ' + object.get('name'));
            let p = new Producto();
            p.id = object.id;
            p.nombre = object.get('nombre');
            p.precioRef = object.get('precioRef');
            productos.push(p);
          }
          observer.next(productos);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        }
      });

   
   
  });

 /*  public getAllRooms() : Observable<Room[]> {
    let Room = Parse.Object.extend("Room")
    let query = new Parse.Query(Room)
    // find all
    return new Observable(observer => {
      let rooms : Room[] = []
      query.find({
        success: (results) => {
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            // alert(object.id + ' - ' + object.get('name'));
            let r = new Room()
            r.id = object.id
            r.name = object.get('name')
            rooms.push(r)
          }
          observer.next(rooms)
          observer.complete()
        },
        error: (error) => {
          observer.error(error)
          observer.complete()
        }
      })
    })
  } */
  
}


}