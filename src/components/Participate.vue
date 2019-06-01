
<template>
    <section id="partecipate" class="tabs--content">
      <div class="layout portable-layout--stacked">
        <figure class="layout__item u-1/3 s-1/1 hero portable--order-02">
          <div class="svg-wrapper">
          </div>
          <img src="../assets/img/ph01.png" alt="" class="hero__media">
        </figure>
        <div class="layout__item u-2/3 s-1/1 portable--order-01">
          <h1 class="heading heading--sec">How to participate</h1>
          <p class="heading--paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <div class="btn-wrapper">
            <a href="#" class="btn btn--sec">Download the template</a>
          </div>
          <div class="form-wrapper">
            <form @submit="checkForm" id="form-partecipate" name="form-partecipate" action="/" method="POST">
            <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </p>
              <h2 class="heading heading--sec heading--branded">Participate now!</h2>
              <div class="form__row layout palm-layout--stacked" role="group">
                <input placeholder="Name" name="name" v-model="name" type="text" class="form__el layout__item"
                        required>
                <input placeholder="Surname" name="surname" type="text" v-model="surename"
                        class="form__el layout__item" required>
                <input placeholder="E-mail" name="email" type="email" v-model="email"
                        class="form__el layout__item" required>
              </div>
              <div class="form__row layout palm-layout--stacked" role="group">
                <input placeholder="Phone" name="phone" type="tel" v-model="phone"
                        class="form__el layout__item" required>
                <select name="state" id="state" class="form__el layout__item full__item" v-model="state">
                  <option value="-">Select your state</option>
                  <option value="0">Select</option>
                </select>
                <div class="layout__item">
                  <div class="layout">
                    <select required aria-label="Day" name="birthday-day" id="day" v-model="day"
                            title="Day" class="form__el layout__item">
                      <option value="0">Day</option>
                      <option v-for="i in (maxDay - minDay + 1)" :value="i + minDay"> {{ i + minDay }} </option>

                    </select>
                    <select required aria-label="Month" name="birthday-month" id="month" v-model="month"
                            title="Month" class="form__el layout__item mh">
                      <option value="0">Month</option>
                      <option value="1">Jan</option>
                      <option value="2">Feb</option>
                      <option value="3">Mar</option>
                      <option value="4">Apr</option>
                      <option value="5">May</option>
                      <option value="6">Jun</option>
                      <option value="7">Jul</option>
                      <option value="8">Aug</option>
                      <option value="9">Sep</option>
                      <option value="10">Oct</option>
                      <option value="11">Nov</option>
                      <option value="12">Dec</option>
                    </select>
                    <select required aria-label="Year" name="birthday-year" id="year" v-model="year"
                            title="Year" class="form__el layout__item">
                      <option value="0">Year</option>
                      <option v-for="i in (maxYear - minYear + 1)" :value="i + minYear"> {{ i + minYear }} </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form__row layout palm-layout--stacked" role="group">
                <div class="layout__item">
                  <input placeholder="Project name" name="project-name" type="text" v-model="projectName"
                          class="form__el mb full__item">
                  <select name="project-category" id="project-category" class="form__el mb full__item" v-model="projectCategory">
                    <option value="-">Select a category</option>
                    <option value="pro">Pro</option>
                    <option value="amateur">Amateur</option>
                  </select>
                  <progress class="form__upload"></progress>
                  <label class="form__el" for="project-upload">
                    Upload your file (.jpg/.jpeg/.png)
                    <input type="file" name="project-upload" id="project-upload" v-on:change="onFileChange"
                            accept=".jpg,.jpeg,.png" class="hidden">
                  </label>
                </div>
                <textarea placeholder="Project description" v-model="projectDescription"
                          name="project-desc" id="project-desc" class="form__el layout__item full__item"
                          maxlength="1000"></textarea>
                <div class="layout__item">
                  <div class="layout layout--stacked">
                    <input name="read-rules" id="read-rules" type="checkbox" v-model="loremIpsum">
                    <label for="read-rules" class="checkbox mb">
                          <span class="checkbox__text">
                            <a href=""
                                class="link__deco">I read the lorem ipsum</a>
                          </span>
                    </label>
                    <input name="read-privacy" id="read-privacy" type="checkbox" required v-model="policy">
                    <label for="read-privacy" class="checkbox mb">
                          <span class="checkbox__text">
                            <button id="js-showprivacy" class="link__deco">I read the privacy policy*</button>
                          </span>
                    </label>
                    <aside id="privacy-info" class="privacy">
                      <h1 class="privacy__heading">Privacy 13 D.Lgs. 196/2003</h1>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                      </p>
                    </aside>
                    <div class="btn-wrapper">
                      <button type="submit" id="js-send-form"
                              class="btn btn--main btn--full">Submit
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'Participate',
  data () {
    return {
      maxYear:2015,
      minYear:1904,
      minDay:0,
      maxDay:30,
      errors:[],
      name:null,
      surename:null,
      email:null,
      phone:null,
      state:0,
      day:0,
      month:0,
      year:0,
      projectName:null,
      projectCategory:"-",
      projectDescription:null,
      category:null,
      file:null,
      loremIpsum:null,
      policy:null
    }
  },
  methods: {
    checkForm:function(e) {
      this.errors = [];
      if(!this.name) this.errors.push("Name required.");
      if(!this.surename) this.errors.push("surename required.");
      if(!this.phone) this.errors.push("phone required.");
      if(!this.day) this.errors.push("day required.");
      if(!this.month) this.errors.push("month required.");
      if(!this.year) this.errors.push("year required.");
      if(!this.policy) this.errors.push("policy required.");
      if(!this.email) {
        this.errors.push("Email required.");
      } else if(!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }
      if(!this.errors.length) return true;
      e.preventDefault();
    },

    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length && files.length > 5000)
            return;
        this.createImage(files[0]);
    },
    createImage(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
            vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
    },
    upload(){
        axios.post('/api/upload',{image: this.image}).then(response => {

        });
    }
  }
}
</script>

<style scoped lang="scss">
	@import '../assets/scss/main.scss';
	@import '../assets/scss/layout/participate';

</style>
