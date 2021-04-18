/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {

        }
    }
});




app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#"><i class="fa fa-car"></i>United Auto Sales</a>
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

const Register={
    name:'register',
    template:`   <div class= 'container centered'>
    <h1 class='page-header'>Register New User</h1>
    <ul class="">
        <li v-for="err in error" class="list alert alert-danger" role="alert">
            {{ err }}
        </li>
    </ul>
    
    <div>
        <form id="register-form" @submit.prevent='register' enctype='multipart/form-data' novalidate>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" name="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password">
            </div>
            <div class="form-group">
                <label for="fullname">Fullname</label>
                <input type="text" class="form-control" id="fullname" name="fullname">
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email">
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
</div>`,
    method:{
        register:function(){
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
    data:function(){
        return{
            error:[],
            message:''
        }
    }
}

const Home = {
    name: 'Home',
    template: `
    
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
    { path: "/", component: Home,props:true},
    // Put other routes here
    {path: "/register", name: "register", component: Register},


    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');