/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {

        }
    }
});

app.component('view-car', {
    name: 'ViewCar', 
    template: `
    <div class="card" id="viewCar>
            <img :src="car.urlToImage" class="card-img-right" />
        <div class="card-body">
            <h2 v-for="car in cars" class="card-name" >{{car.year}} {{ car.make }}</h2>
            <p v-for="car in cars" class="card-model">{{ car.model }}</p>
            <p v-for="car in cars" class="card-des">{{ car.description }}</p>
            <p v-for="car in cars" class="card-color">{{ car.colour }}</p>
            <p v-for="car in cars" class="card-price">{{ car.price }}</p>
            <p v-for="car in cars" class="card-type">{{ car.car_type }}</p>
            <p v-for="car in cars" class="card-trans">{{ car.transmission }}</p>
            <button class="btn" type="button">Email Owner</button>
        </div>
    </div>`,
    /*add heart after button*/
    /* data() {
        return {}
    },*/
    methods: {
        viewcar() {
            let viewdata = document.getElementById(viewCar);

            fetch("/api/cars/<int:car_id>", {
                method: 'GET',
                /*body: viewdata,
                headers: {
                    'X-CSRFToken': token
                },
                credentials:'same-origin' */
            })
            /* .then(resp => resp.json()) */
            .then(function(response){
                
                
                
                self.message=jsonRespone.message;
                self.error=jsonRespone.error;

                if(self.message){
                    router.push({path:'/login',params:{response:self.message}})
                }else{
                    console.log(self.error)
                }
        })
    }
}
})

/* app.component('fav-car', {
    name: 'FavCar',
    template
}) */

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
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
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