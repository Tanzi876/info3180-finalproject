/* Add your Application JavaScript */


const Home={
  name:'Home',
  template:
      `
      <div class="home">
        // <img src="/static/images/logo.png" alt="VueJS Logo">
        <h1>{{ welcome }}</h1>
      </div>
            `,
    data() {
      return {
        welcome: 'Hello World! Welcome to VueJS'
        }
      }
    }

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
    },
  component:{
    'home':Home,    
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
                <router-link to="/" class="nav-link">Home</router-link>
                </li>
               
              </ul>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
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