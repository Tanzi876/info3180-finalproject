/* Add your Application JavaScript */

const Explore={
    name:'explore',
    template:`
    <div class="card ">
      <form class="card-body" id="search-form" @submit.prevent='search()' enctype='multipart/form-data' novalidate>
          <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="car_make">Make</label>
                  <input type="text" class="form-control" id="car_make" v-model="car_make" name="car_make">
                </div>
                <div class="form-group col-md-4">
                  <label for="car_model">Model</label>
                  <input type="text" class="form-control" id="car_model" v-model="car_model" name="car_model">
                </div>
                <div class="form-group col-md-4">
                  <button name='submit' type="submit" class="btn btn-success form-control">Search</button>
                </div>
          </div>
      </form>
    </div>
    <div>
     <div class="card-deck">
        <div v-for="car in cars" class="card" style="width: 18rem;">
          <img :src='car.photo' class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">{{car.year}} {{car.make}}</h5>
            <i class="fa fa-tag" aria-hidden="true">{{getPrice(car.price)}}</i>
            <p class="card-text">{{car.model}}</p>
            <div class="card-footer">
              <a @click='getCar(car.id)' class="btn btn-primary btn-block" >View more details</a>
            </div>
          </div>
        </div>
      </div>
    </div>`,
      data(){
        return{
        car_make:'',
        car_model:'',
        cars: [],
        
        }
      },
      // computed:{
      //   filteredpost(){
      //     if (car_make != ''){
      //       return this.cars.filter(car=>car.make.includes(this.car_make))

      //     }else if (car_model != ''){
      //       return this.cars.filter(car=>car.model.includes(this.car_model))
      //     }else{
      //       return this.cars
      //     }
          
      //   } 
      // },
      created(){
        let self = this;
        fetch("/api/cars",{
          method: 'GET',
          headers:{
            'Authorization':'Bearer ' +localStorage.getItem('token')
          },
          credentials:'same-origin'
        })
        .then(resp => resp.json())
        .then(function(jsonResp) {
          self.cars = jsonResp.data;
        })
        .catch(function(error){
          console.log(error)
        })  
      },
      methods:{
        search(){
            let self=this;
            fetch("/api/search/?make=" + self.car_make+ '&model='+ self.car_model,{
              method: 'GET',
              headers:{
                'X-CSRFToken': token,
                'Authorization':'Bearer ' +localStorage.getItem('token')
              },
              credentials:'same-origin'
            })
            .then(resp => resp.json()).then(function(jsonResp){
              self.cars=jsonResp.data;
              self.error=jsonResp.error;
              console.log(self.data);
            
             })
            .catch(function(error){
              console.log(error);
            })           

        },
        getCar(id){
          router.push({path: '/cars/'+ id});
        },
        getPrice(price){
          return "$"+price.toLocaleString('en');
        }
      }
}



const Logout = {
    name:'logout',
    template:'<div></div>',
    created() {
      let self = this;
      
      fetch('/api/auth/logout', {
          method: 'GET',
          headers: {
              'X-CSRFToken': token,
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          credentials: 'same-origin'
      })
      .then(resp => resp.json())
      .then(function(jsonResp) {
          
          self.message = jsonResp.message;
          self.error = jsonResp.error;
          
          if (self.message) {
              localStorage.removeItem('token');
              localStorage.removeItem('user_id');
              router.push({path: '/'});
          } else {
              
          }
      })
      .catch(function(error) {
          console.log(error)
      })
  }
};

const Login = {
  name:'login',
  template :`
    <div class= 'centered'>
      <h1 class="page-header">Login to your account</h1>
      <div class="card shadow p-3 mb-5 bg-white rounded " style="width: 18rem;">
      <form id="login-form" @submit.prevent="login">
          <div class="card-body login">
            <div style="margin-top:5%;">
              <label for='username'><strong>Username</strong></label><br>
              <input type='text' id='username' name='username' style="width: 100%;"/>
            </div>
            <div style="margin-top:5%;">
              <label for='password'><strong>Password</strong></label><br>
              <input type='password' id='password' name='password' style="width: 100%;"/>
            </div>
            <div style="margin-top:5%;">
              <button id="submit" class="btn btn-success btn-block">Login</button> 
            </div>
            <div v-if='messageFlag' style="margin-top:5%;">
              <div class="alert alert-danger center" style="width: 100%; margin-top: 5%;">
                {{ message }}
              </div>
            </div>
          </div>
      </form>
      </div>
    </div>`,
    props:['response'],
  methods:{
    login(){
    const self = this
      
    let login_data = document.getElementById('login-form');
    let login_form = new FormData(login_data);
      
    fetch("/api/auth/login",{
      method: "POST",
      body: login_form,
      headers: {
        'X-CSRFToken': token
      },
      credentials: 'same-origin'

    })
    .then(resp => resp.json())
            .then(function(jsonResp) {
                
                self.message = jsonResp.message;
                self.error = jsonResp.error;
                
                if (self.message) {
                    let jwt_token = jsonResp.token;
                    let user_id = jsonResp.user_id;
                    localStorage.setItem('token', jwt_token);
                    localStorage.setItem('user_id',user_id);
                    router.push({path: '/explore'})
                } else {
                    console.log(self.error);
                }
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    },
    data: function() {
        return {
            message: '',
            error: []
        }
    },
};

const Register = {
  name: 'register',
template:`
 <div class= 'container centered'>
      <h1 class='page-header'>Register New User</h1>
      <ul class="">
        <li v-for="err in error" class="list alert alert-danger" role="alert">
          {{ err }}
        </li>
      </ul>
      <div>
        <form id="register-form" @submit.prevent= 'registerForm' enctype='multipart/form-data' novalidate>
          <div class ="input-group">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text"  class="form-control" id="username" name="username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password"  class="form-control" id="password" name="password">
            </div>
          </div>

          <div class= "input-group">

          <div class="form-group">
            <label for="fullname">Fullname</label>
            <input type="text"  class="form-control" id="fullname" name="fullname">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email"  class="form-control" id="email" name="email">
          </div>

          </div>
          
          <div class="form-group">
            <label for="location">Location</label>
            <input type="text"  class="form-control" id="location" name="location">
          </div>
          <div class="form-group">
            <label for="biography">Biography</label>
            <textarea id="biography"  class="form-control" name="biography"></textarea>
          </div>
          <div class="form-group">
            <label for="photo">Photo</label>
            <input type="file" id="photo"  class="form-control" name="photo">
          </div>
          <button type="submit" class="btn btn-success">Register</button>
        </form>
      </div>
    </div>
              `,
  methods:{
    registerForm(){
    let userinfo=document.getElementById('register-form');
    let formdata= new FormData(userinfo);
    let self=this;
    fetch('/api/register',{
      method:'POST',
      body: formdata,
      headers:{
        'X-CSRFToken':token
        //,'Content-Type': 'multipart/form-data'
      },
       credentials: 'same-origin'
    }).then(resp => resp.json()).then(function(jsonResp){
      self.message=jsonResp.message;
      self.error=jsonResp.error;
      if(self.message){
        router.push({path:'/login'})
      }else{
        console.log(self.error)
      }
    }).catch(function(error){
      console.log(error)
    })

    }
  },
  data(){
    return{
      error:[],
      message:'',
      fullname:'',
      username:'',
      password:'',
      location:'',
      biography:'',
      photo:''
    }
  }
};

const NewCar = {
  name: 'NewCar',
  template:`
    <div class= 'container centered'>
        <h1 class='page-header'>Add New Car</h1>
        <ul class="">
            <li v-for="err in error" class="list alert alert-danger" role="alert">
                {{ err }}
            </li>
        </ul>
        
        <div>
            <form id="AddCar" @submit.prevent= 'car' enctype='multipart/form-data' novalidate>
              <div class="row">
                <div class="col">
                  <label for="make">Make</label>
                  <input type="text" class="form-control" id="make" name="make">
                </div>
                <div class="col">
                    <label for="model">Model</label>
                    <input type="text" class="form-control" id="model" name="model">
                </div>
              </div>
              <div class = "row">
                <div class="col">
                  <label for="colour">Colour</label>
                  <input type="text" class="form-control" id="colour" name="colour">
                </div>
                <div class="col">
                    <label for="year">Year</label>
                    <input type="text" class="form-control" id="year" name="year">
                </div>
              </div>

                <div class="form-group">
                    <label for="transmission">Transmission</label>
                    <select name="transmission" id="transmission" class="form-control">
                      <option value="Automatic">Automatic</option>
                      <option value="Standard">Standard</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="car_type">Car Type</label>
                    <select name="car_type" id="car_type" class="form-control">
                      <option value="SUV">SUV</option>
                      <option value="Truck">Truck</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Van">Van</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Wagon">Wagon</option>
                      <option value="Convertable">Convertable</option>
                      <option value="Hybrid/Electric">Hybrid/Electric</option>
                      <option value="Sports Car">Sports Car</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Crossover">Crossover</option>
                      <option value="Luxury Car">Luxury Car</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" class="form-control" name="description"></textarea>
                </div>

                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="decimal" class="form-control" id="price" name="price">
                </div>

                <div class="form-group">
                    <label for="photo">Photo</label>
                    <input type="file" id="photo" class="form-control" name="photo">
                </div>
            
                <button type="submit" class="btn btn-success">Add Car</button>
            </form>
        </div>
    </div>`,
    methods:{
      car(){
        let carinfo=document.getElementById('AddCar');
        let formdata= new FormData(carinfo);
        let self=this;
        fetch('/api/cars',{
          method:'POST',
          body:formdata,
          headers:{
            'X-CSRFToken':token,
            'Authorization':'Bearer ' +localStorage.getItem('token')
          },
          credentials: 'same-origin'
          }).then(resp => resp.json()).then(function(jsonResp){
            self.message=jsonResp.message;
            self.error=jsonResp.error;
            if(self.message){
              router.push({path:'/explore'})
            }else{
              console.log(self.error)
            }
          }).catch(function(error){
              console.log(error)
          })
      }
    },
  data(){
      return{
          error:[],
          message:''
      }
  }
}

const Cars = {
  name: 'Cars',
  template:`
    <div id="viewCar" class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img :src='car.photo' class="card-img"/>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title" >{{car.year}} {{ car.make }}</h2>
            <p class="card-model">{{ car.model }}</p>
            <p class="card-des">{{ car.description }}</p>
            <p class="card-color">{{ car.colour }}</p>
            <p class="card-price">{{ car.price }}</p>
            <p class="card-type">{{ car.car_type }}</p>
            <p class="card-trans">{{ car.transmission }}</p>
            <button class="btn btn-success" type="button">Email Owner</button>
            <i class="fa fa-heart" aria-hidden="true" v-on:click="favcar"></i>
          </div>
        </div>
      </div>
    </div>`,
  created() {
    let self = this;

    fetch("/api/cars/"+this.$route.params.car_id, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer ' + localStorage.getItem('token')
        },
        credentials:'same-origin' 
    })
    .then(resp => resp.json())
    .then(function(jsonResp) {
      self.car = jsonResp.car;
    })
    .catch(function(error) {
        console.log(error)
    })
},
  methods: {
    favcar() {
        let self = this;

        fetch('/api/cars/'+this.$route.params.car_id+'/favourite', {
            method: 'POST',
            headers: {
              'X-CSRFToken':token,
              'Authorization':'Bearer ' +localStorage.getItem('token')
            },
            credentials:'same-origin' 
        })
        .then(resp => resp.json()).then(function(jsonResp){
          self.message=jsonResp.message;
          self.error=jsonResp.error;
          if(self.message){
            console.log(self.message)
          }else{
            console.log(self.error)
          }
        })
        .catch(function(error) {
            console.log(error)
        })
    }
  },
  data(){
    return{
      car: ''
    }
  }

}

const Users = {
  name: 'Users',
  template:`
  <div class = "page">
    <div class= "card profile cardShadow">
      <div class="row no-gutters">
            <div class="col-md-4">
                <img :src='user.photo' class="card-img rounded-circle" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <div class="card-title">
                        <h2 class="font-weight-bold">{{user.name}}</h2>
                        <h5 class="card-text text-muted font-weight-bold">{{userName(user.username)}}</h5>
                    </div>

                    <div class="profile-desc">
                        <p class="card-text text-muted">{{user.biography}}</p>
                    </div>

                    <div class="row">
                        <p class="col-sm-3 text-muted font-weight-bold">Email</p>
                        <p class="col-sm-9">{{user.email}}</p>

                        <p class="col-sm-3 text-muted font-weight-bold">Location</p>
                        <p class="col-sm-9">{{user.location}}</p>

                        <p class="col-sm-3 text-muted font-weight-bold">Joined</p>
                        <p class="col-sm-9">{{user.date_joined}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div>
      <h2>Cars Favourited</h2>
    </div>

    <div class="layout">
        <div v-for="car in cars" >
          <div class="card" style="width: 18rem;">
              <img :src='car.photo' class="card-img-top" alt="">
              <div class="card-body">
                  <h5 class="card-title">{{car.year}} {{car.make}}</h5>
                  <p class="card-text">{{car.model}}</p>
                  <a href='/api/cars/{{car.id}}' class="btn btn-primary btn-block">View more details</a>
              </div>
          </div>
        </div>
    </div>
  </div>`,
      methods:{
        userName(username){
          return "@"+username;
        },
        fav(){
          let self=this;
          fetch('/api/users/'+this.$route.params.user_id+'/favourites',{
            method:'GET',
            headers:{
              'Authorization':'Bearer ' + localStorage.getItem('token')
            },
            credentials: 'same-origin'
          })
          .then(resp => resp.json())
          .then(function(jsonResp) {
            self.cars = jsonResp.data;
          })
          .catch(function(error){
            console.log(error);
          })
        }
      },
    created(){
        let self=this;
        fetch('/api/users/'+this.$route.params.user_id,{
          method:'GET',
          headers:{
            'Authorization':'Bearer ' + localStorage.getItem('token')
          },
          credentials: 'same-origin'
        })
        .then(function(response){
          return response.json();
        })
        .then(function(response){
          self.message = response.message;
          self.error = response.error;

          if (self.message){
            self.user = response.data;
            console.log(self.user);
            
          }
          else{
            console.log("NO DATA");
            self.result = response;
          }
        })
        .catch(function(error){
          console.log(error);
        })

        self.fav();
    },
    data(){
      return {
        result: '',
        user: [],
        cars: []
      }
    }
};


const Home ={
  name:'Home',
  template:`
      <div class="home">
        <div class="home-txt">
          <h1>{{ heading }}</h1>
          <p>{{ para }}</p>
          <button @click= register() type = "button">Register</button>
          <button @click= login() type = "button">Login</button>
        </div>
        <div class="home-img">
          <img src= "/images/homepage.jpeg"/>
        </div>
      </div>`,
    data() {
      return {
        heading: 'Buy and Sell Cars Online',
        para: 'United Auto Sales provides the fastest, easiest and most user friendly way to buy or sell cars online. Find a Great Price on the Vehicle You Want'
        }
      },
      methods: {
        register(){
          router.push({path:'/register'})
        },
        login(){
          router.push({path:'/login'})
        }
      }
    };

const NotFound = {
      name: 'NotFound',
      template: `
      <div>
          <h1>404 - Not Found</h1>
      </div>
      `,
      data() {
          return {}
      }
  };



const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS',
      error:[],
      message:'',
      fullname:'',
      username:'',
      password:'',
      location:'',
      biography:'',
      photo:'',
    }
  },
  component:{
    'home':Home,
    'register':Register, 
    'explore':Explore,
    'login': Login,
    'logout': Logout,
    'user':Users,
    'newCar':NewCar,
    'cars':Cars
  }
});

const router=VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes:[
    {path:'/',component:Home},
    {path:'/register',component:Register},
    {path:'/login',component:Login},
    {path: "/logout", component: Logout},
    {path:'/explore',component:Explore},
    {path:'/users/:user_id',component:Users},
    {path:'/cars/new',component:NewCar},
    {path:'/cars/:car_id',component:Cars}
    //,{path: "*", component: NotFound}

  ]
})

app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">
            <img src="">
            United Auto Sales
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto" v-show='checkLogin() == true'>
                <li class="nav-item active">
                  <router-link to="/cars/new" class="nav-link">Add Car</router-link>
                </li>
                <li class="nav-item active">
                  <router-link to="/explore" class="nav-link">Explore</router-link>
                </li>
                <li class="nav-item active">
                  <router-link v-bind:to='userPath' class="nav-link">My Profile</router-link>
                </li>
              </ul>
              <ul class="navbar-nav mr-auto" v-show='checkLogin() == true'>
                  <li class="nav-item active">
                    <router-link to="/logout" class="nav-link">Logout</router-link>
                  </li>
              </ul>
              <ul class="navbar-nav mr-auto" v-show='checkLogin() == false'>
                  <li class="nav-item active">
                    <router-link to="/register" class="nav-link">Register</router-link>
                  </li>
                  <li class="nav-item active">
                    <router-link to="/login" class="nav-link">Login</router-link>
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
},
  data() {
    return {
      user_id:'',
      userPath: "/users/" + localStorage.getItem('user_id')
    };
  },
  methods:{
    reload(){
        let self = this;
        self.user=localStorage.getItem('token');
        self.user_id=localStorage.getItem('user_id');
    },
    checkLogin(){
      console.log("RUNNING CHECK");
      if (localStorage.getItem('token') !== null) 
      {
        console.log("TRUE");
        return true;
      }
      else{
        console.log("FALSE");
        return false;
      }
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
