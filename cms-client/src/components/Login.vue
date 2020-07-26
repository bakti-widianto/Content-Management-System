<template>
<body>
  <div class="container d-flex w-80 h-80 p-3 mt-5 mb-5 flex-column">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <!-- TO LOGIN -->
          <div class="card-body" v-if="toLogin">
            <h5 class="card-title text-center">Sign In</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  v-model="email"
                  placeholder="Email address"
                  required
                  autofocus
                />
                <label for="inputEmail">Email address</label>
              </div>

              <div class="form-label-group">
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  v-model="password"
                  placeholder="Password"
                  required
                />
                <label for="inputPassword">Password</label>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <button
                class="btn btn-lg btn-primary btn-block text-uppercase"
                @click="handleLogin"
                type="submit"
              >Sign in</button>
              <hr />
              <a class="d-block text-center" @click.prevent="toLogin = !toLogin " href>Register</a>
              <br />
              <router-link to="/">
                <div class="d-block text-center">
                  <h6>
                    <i class="far fa-hand-point-left">.Back to Menu</i>
                  </h6>
                </div>
              </router-link>
            </form>
          </div>
          <!-- TO REGISTER -->
          <div class="card-body" v-if="!toLogin">
            <h5 class="card-title text-center">Register</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  v-model="email"
                  placeholder="Email address"
                  required
                  autofocus
                />
                <label for="inputEmail">Email address</label>
              </div>

              <div class="form-label-group">
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  v-model="password"
                  placeholder="Password"
                  required
                />
                <label for="inputPassword">Password</label>
              </div>

              <div class="form-label-group">
                <input
                  type="password"
                  id="reinputPassword"
                  class="form-control"
                  v-model="retypepassword"
                  placeholder="Retype Password"
                  required
                />
                <label for="reinputPassword">Retype Password</label>
              </div>
              <hr />
              <button
                class="btn btn-lg btn-primary btn-block text-uppercase"
                @click="handleRegister"
                type="submit"
              >Register</button>
              <a
                class="d-block text-center mt-3"
                @click.prevent="toLogin = !toLogin "
                href
              >Back to Login</a>
              <br />
              <router-link to="/">
                <div class="d-block text-center">
                  <h6>
                    <i class="far fa-hand-point-left">.Back to Menu</i>
                  </h6>
                </div>
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      retypepassword: "",
      token: null,
      toLogin: true,
    };
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      this.$axios
        .post("http://localhost:3000/api/users/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.data.message == "Authentication Success") {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.data.email);
            this.$router.push("/home");
          } else if (response.data.message == "Email dosen't exist") {
            return alert("Email doesn't registered");
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log("error cuk!");
        });
    },
    handleRegister(e) {
      e.preventDefault();
      if (this.password !== this.retypepassword) {
        return alert("password doesn't match, please try again !");
      } else {
        this.$axios
          .post("http://localhost:3000/api/users/register", {
            email: this.email,
            password: this.password,
            retypepassword: this.retypepassword,
          })
          .then((response) => {
            if (response.data.message == "Email already exist") {
              return alert(
                "this email has been registered, please try again with other email"
              );
            } else if (response.data.message == "register success") {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("email", response.data.data.email);
              this.$router.push("/home");
            } else {
              return alert("something wrong please try again later");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>


<style >
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

body {
  font-family: "Philosopher", sans-serif;
  background: #00e1ff;
  background: linear-gradient(to right, #28b9fc, #cbf0f7);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 85%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>