/* Add your Application JavaScript */

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

// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {
          welcome:'Buy and Sell Cars Online',
          motto:'United Auto Sales provides the fastest, easiest and most user friendly way to buy and sell cars online. Find a Great Price on the Vehicle You Want'

        }
    },
    components:{
      'home':Home
    }
});

const ViewCar = {
    name: 'ViewCar', 
    template: `
    <div class="card" id="viewCar>
            <img :src="car.urlToImage" class="card-img-right" />
        <div class="card-body">
            <h2 class="card-name" >{{car.year}} {{ car.make }}</h2>
            <p class="card-model">{{ car.model }}</p>
            <p class="card-des">{{ car.description }}</p>
            <p class="card-color">{{ car.colour }}</p>
            <p class="card-price">{{ car.price }}</p>
            <p class="card-type">{{ car.car_type }}</p>
            <p class="card-trans">{{ car.transmission }}</p>
            <button class="btn btn-success" type="button">Email Owner</button>
            <i id="heart" class="fa fa-heart-o" v-on:click="favcar"></i>
        </div>
    </div>`,
    /*add heart after button*/
    /* data() {
        return {}
    },*/
    methods: {
        viewcar() {
            //let viewdata = document.getElementById(viewCar);
            let self = this;

            fetch("/api/cars/<int:car_id>", {
                method: 'GET',
                /* body: 'viewdata', */
                headers: {
                    'Authorization':'Bearer' +localStorage.getItem('token')
                },
                credentials:'same-origin' 
            })
            .then(function(response){
                return response.json();
            })
            .then(function(data) {
                console.log(data.result)
                self.result=data.result;
            })
            .catch(function(error) {
                console.log(error)
            })
        },
        favcar() {
            let self = this;

            fetch('/api/cars/<int:car_id>/favourite', {
                method: 'POST',
                /* body: 'viewdata', */
                headers: {
                    'Authorization':'Bearer' +localStorage.getItem('token')
                },
                credentials:'same-origin' 
            })
            .then(function(response){
                return response.json();
            })
            .then(function(data) {
                console.log(data.result)
                self.result=data.result;
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    }
}

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const Home = {
    name: 'Home',
    template: `
        <div class="jumbotron">
            <h1>Buy and Sell Cars Online</h1>
            <p class="lead">United Auto Sales provides the fastest, easiest and most user friendly way to buy and sell cars online. Find a Great Price on the Vehicle You Want</p>
            <div style="margin-top: 20%;">
                <router-link class="btn btn-success col-md-5" to="/register">Register</router-link>
                <router-link class="btn btn-primary col-md-5" to="/login">Login</router-link>
            </div>
        </div>
    `,
    data() {
        return {}
    }
};


// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here

    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');