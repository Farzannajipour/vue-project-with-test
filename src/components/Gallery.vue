<template>
  <section id="gallery" class="tabs--content">
    <div class="layout-wrapper layout-wrapper--tiny palm-layout--stacked">
      <header class="layout layout--middle palm-layout--stacked">
        <div class="layout__item">
          <h1 class="heading heading--main">Projects</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div class="layout__item">
          <div class="btn-wrapper btn-wrapper--center">
            <a href="#partecipate" class="btn btn--main">Participate</a>
          </div>
        </div>
      </header>
    </div>
    <section class="gallery">
      <div class="tpl--gallery-box">
        <div v-for="car in cars" class="gallery__el js-open-detail">
          <figure class="project">
            <img v-bind:src="car.attrs.img" alt="" class="project__media">
            <figcaption class="project__desc">
              <header class="project__head layout">
                <span class="project__user-name layout__item">
                  <!-- <% this.data[i].userName %> -->
                  {{ car.attrs.make }}
                </span>
                <span class="project__title layout__item">
                  <!-- <% this.data[i].projectTitle %> -->
                  {{ car.attrs.model }}
                </span>
              </header>
              <p class="project__text">
                <!-- <% AFN.sanitizeString(this.data[i].projectDesc) %> -->
                Car ID : {{ car.attrs.carId }}
              </p>
            </figcaption>
            <footer class="project__actions">
              <div class="do-like">
                  <span class="project__likes">
                        <span class="project__likes__amount">
                          {{ car.tags.Look }}
                        </span>
                    </span>
                <button data-likes="car.tags.Look"
                        data-id="car.attr.carId"
                        ></button>
              </div>
              <div class="do-share">
                  <span class="do-share__wrapper">
                        <a class="btn--rounded btn--fb"
                            href="<% AFN.createShareURL.fb(this.data[i].boxId) %>"
                            target="_blank">
                          <svg class="icon icon--light" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>facebook</title>
                            <path class="path1"
                                  d="M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z"></path>
                          </svg>
                        </a>
                        <a class="btn--rounded btn--tw"
                            href="<% AFN.createShareURL.tw(this.data[i].boxId) %>"
                            target="_blank">
                          <svg class="icon icon--light" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>twitter</title>
                            <path d="M1024 226.4c-37.6 16.8-78.2 28-120.6 33 43.4-26 76.6-67.2 92.4-116.2-40.6 24-85.6 41.6-133.4 51-38.4-40.8-93-66.2-153.4-66.2-116 0-210 94-210 210 0 16.4 1.8 32.4 5.4 47.8-174.6-8.8-329.4-92.4-433-219.6-18 31-28.4 67.2-28.4 105.6 0 72.8 37 137.2 93.4 174.8-34.4-1-66.8-10.6-95.2-26.2 0 0.8 0 1.8 0 2.6 0 101.8 72.4 186.8 168.6 206-17.6 4.8-36.2 7.4-55.4 7.4-13.6 0-26.6-1.4-39.6-3.8 26.8 83.4 104.4 144.2 196.2 146-72 56.4-162.4 90-261 90-17 0-33.6-1-50.2-3 93.2 59.8 203.6 94.4 322.2 94.4 386.4 0 597.8-320.2 597.8-597.8 0-9.2-0.2-18.2-0.6-27.2 41-29.4 76.6-66.4 104.8-108.6z"></path>
                          </svg>
                        </a>
                        <a class="btn--rounded btn--pint"
                            href="<% AFN.createShareURL.pin(this.data[i].projectDesc, this.data[i].projectImage.mid) %>"
                            target="_blank">
                          <svg class="icon icon--light" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>pinterest</title>
                            <path class="path1"
                                  d="M512 68.4c-245 0-443.6 198.6-443.6 443.6 0 188 117 348.4 282 413-3.8-35-7.4-89 1.6-127.2 8-34.6 52-220.4 52-220.4s-13.2-26.6-13.2-65.8c0-61.6 35.8-107.8 80.2-107.8 37.8 0 56.2 28.4 56.2 62.4 0 38-24.2 95-36.8 147.6-10.6 44.2 22 80.2 65.6 80.2 78.8 0 139.4-83.2 139.4-203.2 0-106.2-76.4-180.4-185.2-180.4-126.2 0-200.2 94.6-200.2 192.6 0 38.2 14.6 79 33 101.2 3.6 4.4 4.2 8.2 3 12.8-3.4 14-10.8 44.2-12.4 50.4-2 8.2-6.4 9.8-14.8 6-55.4-25.8-90-106.8-90-171.8 0-140 101.6-268.4 293-268.4 153.8 0 273.4 109.6 273.4 256.2 0 152.8-96.4 276-230.2 276-45 0-87.2-23.4-101.6-51 0 0-22.2 84.6-27.6 105.4-10 38.6-37 86.8-55.2 116.2 41.6 12.8 85.6 19.8 131.4 19.8 245 0 443.6-198.6 443.6-443.6 0-245.2-198.6-443.8-443.6-443.8z"></path>
                          </svg>
                        </a>
                      </span>
                <button class="share js-show-share-buttons">
                        <span class="share__icon">
                          <svg class="icon icon--share icon--dark"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1024 1024">
                            <title>share2</title>
                            <path stroke="#000000" stroke-width="4"
                                  d="M864 704c-45.16 0-85.92 18.738-115.012 48.83l-431.004-215.502c1.314-8.252 2.016-16.706 2.016-25.328s-0.702-17.076-2.016-25.326l431.004-215.502c29.092 30.090 69.852 48.828 115.012 48.828 88.366 0 160-71.634 160-160s-71.634-160-160-160-160 71.634-160 160c0 8.622 0.704 17.076 2.016 25.326l-431.004 215.504c-29.092-30.090-69.852-48.83-115.012-48.83-88.366 0-160 71.636-160 160 0 88.368 71.634 160 160 160 45.16 0 85.92-18.738 115.012-48.828l431.004 215.502c-1.312 8.25-2.016 16.704-2.016 25.326 0 88.368 71.634 160 160 160s160-71.632 160-160c0-88.364-71.634-160-160-160z"></path>
                          </svg>
                        </span>
                </button>
              </div>
            </footer>
          </figure>
        </div>
        <!-- <% } %> -->
      </div>
      <div id="gallery__boxes" class="gallery__boxes layout layout--center" data-content="{}">
      </div>
      <nav id="gellery__paging" class="gallery__paging">
        <button class="gallery__paging__cmd gallery__paging__cmd--symbol">&laquo;</button>
        <button class="gallery__paging__cmd gallery__paging__cmd--symbol">&lsaquo;</button>
        <button class="gallery__paging__cmd is-active">1</button>
        <button class="gallery__paging__cmd">2</button>
        <button class="gallery__paging__cmd">3</button>
        <button class="gallery__paging__cmd">4</button>
        <button class="gallery__paging__cmd gallery__paging__cmd--symbol">&rsaquo;</button>
        <button class="gallery__paging__cmd gallery__paging__cmd--symbol">&raquo;</button>
      </nav>
    </section>
  </section>
</template>

<script>
import json from '../assets/json/cars.json'
export default {
  name: 'Gallery',
  data () {
    return {
      cars: json
    }
  }
}
</script>

<style scoped lang="scss">
	@import '../assets/scss/main.scss';
	@import '../assets/scss/layout/gallery';
</style>
