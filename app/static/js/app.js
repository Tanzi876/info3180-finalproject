/* Add your Application JavaScript */
const Register={
  name:'register',
  template:`  <div class name ="register">
  <div class= 'container centered'>
  <h1 class='page-header'>Register New User</h1>
  <ul class="">
      <li v-for="err in error" class="list alert alert-danger" role="alert">
          {{ err }}
      </li>
  </ul>
  
  <div>
      <form id="register-form" @submit.prevent='register' enctype='multipart/form-data' novalidate>
        <div class= "input-group>
          <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" name="username">
         </div>
          <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" name="password">
          </div>
        </div>
        <div class= "input-group>
          <div class="form-group">
                <label for="fullname">Fullname</label>
                <input type="text" class="form-control" id="fullname" name="fullname">
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email">
            </div>
        </div>          
          
          <div class="form-group">
              <label for="location">Location</label>
              <input type="text" class="form-control" id="location" name="location">
          </div>
          <div class="form-group">
              <label for="biography">Biography</label>
              <textarea id="biography" class="form-control" name="biography"></textarea>
          </div>
          
          <div class="form-group">
              <label for="photo">Photo</label>
              <input type="file" id="photo" class="form-control" name="profile_photo">
          </div>
      
          <button type="submit" class="btn btn-success">Register</button>
      </form>
  </div>
</div>
  </div>`,
  method:{
      register(){
          let userinfo=document.getElementById('register-form');
          let formdata= new FormData(userinfo);
          let self=this;

          fetch('/api/register',{
              method:'POST',
              body:formdata,
              headers:{
                  'X-CSRFToken':token
              },
              credentials: 'same-origin'


          })
          .then(resp => resp.json())
          .then(function(jsonRespone){
              self.message=jsonRespone.message;
              self.error=jsonRespone.error;

              if(self.message){
                  router.push({path:'/login',params:{response:self.message}})
              }else{
                  console.log(self.error)
              }
          })
          .catch(function(error){
              console.log(error)
          })

      }

  },
  data(){
      return{
          error:[],
          message:''
      }
  },
}

// const Explore={
//     name:'explore',
//     template:`
//     <div class ="row">
//       <form id="search-form" @submit.prevent='search' enctype='multipart/form-data' novalidate>
//           <div class="form-group">
//               <label for="car_make">Make</label>
//               <input type="text" class="form-control" id="car_make" name="car_make">
//           </div>
//           <div class="form-group">
//               <label for="car_model">Model</label>
//               <input type="text" class="form-control" id="car_model" name="car_model">
//           </div>
//       </form>
//     </div>
//       `,
//       methods:{
//         search(){
//             let search_query=document.getElementById('search-form');
//             let formdata= new FormData(search_query);
//             let self=this;

//             fetch("/api/search",{
//               method: 'GET',
//               body:formdata,
//               headers:{
//                 'Authorization':'Bearer' +localStorage.getItem('token')

//               },
//               credentials:'same-origin'
            
//             })
//             .then(function(response){
//               return response.json();
//             })
//             .then(function(data){
//               console.log(data.result)
//               self.result=data.result;
            
//             })
//             .catch(function(error){
//               console.log(error)

//             })           

//         },
//         data(){
//           return{

//           }
//         }
      
//       }
// }

// const Login = Vue.component('login', {
//     template:`
//       <div>
//         <form id="login-form" @submit.prevent="login">
//             <div class="card-header center">
//               <strong>Login to your account</strong>
//             </div>
//             <div class="card center">
//               <div class="card-body login">
//                 <div style="margin-top:5%;">
//                   <label for='username'><strong>Username</strong></label><br>
//                   <input type='text' id='username' name='username' style="width: 100%;"/>
//                 </div>
//                 <div style="margin-top:5%;">
//                   <label for='password'><strong>Password</strong></label><br>
//                   <input type='password' id='password' name='password' style="width: 100%;"/>
//                 </div>
//                 <div style="margin-top:5%;">
//                   <button id="submit" class="btn btn-success">Login</button> 
//                 </div>
//                 <div v-if='messageFlag' style="margin-top:5%;">
//                   <div class="alert alert-danger center" style="width: 100%; margin-top: 5%;">
//                     {{ message }}
//                   </div>
//                 </div>
//               </div>
//             </div>
//         </form>
//       </div>
//     `,
//     methods:{
//       login: function(){
//         const self = this
      
//         let login_data = document.getElementById('login-form');
//         let login_form = new FormData(login_data);
      
//         fetch("/api/auth/login",{
//           method: "POST",
//           body: login_form,
//           headers: {
//           'X-CSRFToken': token
//           },
//           credentials: 'same-origin'
//         }).then(function(response){
//           return response.json();
//         }).then(function(jsonResponse){
//           self.messageFlag = true;
        
//           if(jsonResponse.hasOwnProperty("token")){
//             cuser={"token":jsonResponse.token, id: jsonResponse.user_id};
//             localStorage.current_user = JSON.stringify(cuser);
          
//             router.go();
//             router.push("/explore")
//           }else{
//             self.message = jsonResponse.errors
//           }

//         }).catch(function(error){
//           self.messageFlag = false;
//           console.log(error);
//         });
//       }
//     },
//     data: function(){
//       return {
//         messageFlag: false,
//         message: ""
//       }
//     }
// });

// const Logout = Vue.component("logout", {
//     template: `
//     <div>
//     <div/>`,
//     created: function(){
//         const self = this;
//         fetch("api/auth/logout", {
//         method: "GET"
//     }).then(function(response){
//       return response.json();
//     }).then(function(jsonResponse){
//       localStorage.removeItem("current_user");
//       router.go();
//       router.push("/");
//     }).catch(function(error){
//       console.log(error);
//     });
//   }
// });
const Home={
  name:'Home',
  template:
      `
      <div class="home">
      <div class= "card-group mt-4"> 
      <div v-if="response" class="alert alert-success alert-dismissible show fade">{{ response }}</div>
      <div>
          <div class="card mr-3">
          <img class="card-img-top" src="#" alt="Car Logo">
          </div> 
          <div class="card">
              <h3 class="card-title text-center mt-3 mb-0"><i class="fa fa car" size="7"></i> Auto Sale</h3>
              <hr class="ml-5 mr-5">
              <p class="card-body"> {{message}} </p>
              <div class="row">
                  <router-link to="register"  class=" btn btn-success col ml-3 mr-2">Register</router-link>
                  <router-link to="login"  class="btn btn-primary col mr-3 ml-2">Login</router-link>
              </div>  
          </div>
      </div>
      
  </div>
      </div>
            `,
    data() {
      return {
        welcome: ''
        }
      },

    };



const app = Vue.createApp({
  data() {
    return {
      welcome: ''
    }
  },
  component:{
    'home':Home, 
    'register':Register   
  }
});

const router=VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes:[
    {path:'/',component:Home}    

  ]
})



app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a class="navbar-brand" href="#">VueJS App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                        <router-link to="/" class="nav-link">Home<span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item active">
                        <router-link to="explore" class="nav-link"><strong>Explore</strong></router-link>
                </li>
               
              </ul>
            </div>
          </nav>
      </header>    
  `,
  watch: {
    '$route' (to, fom){
        this.reload()
    }
  },
created() {
    let self = this;
    self.user=localStorage.getItem('token');
    self.userid=localStorage.getItem('userid')
},
  data() {
    return {
      //User array
    };
  },
  methods:{
    reload(){
        let self = this;
        self.user=localStorage.getItem('token');
        self.userid=localStorage.getItem('userid')
    }
}
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})
app.use(router)
app.mount('#app');