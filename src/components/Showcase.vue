<template>
 <div>
    <section id="showcase" class="tabs--content">
      <div class="layout portable-layout--stacked">
        <div class="layout__item palm--order-02 ph">
          <div id="showcase-grid" class="grid">
            <div id="showcase-grid__wrapper">
              <div class="grid__row layout">
                <div class="grid__item layout__item u-2/3">
                  <img src="../assets/img/grid/01.png" alt="">
                </div>
                <div class="grid__item grid__item--stacked layout__item u-1/3">
                  <div class="grid__item">
                    <img src="../assets/img/grid/02_2.png" alt="">
                  </div>
                  <div class="grid__item">
                    <img src="../assets/img/grid/thumb_gears2_default.png" alt="">
                  </div>
                </div>
              </div>
              <div class="grid__row layout">
                <div class="grid__item  grid__item--stacked layout__item u-1/3">
                  <div class="grid__item">
                    <img src="../assets/img/grid/03.png" alt="">
                  </div>
                  <div class="grid__item">
                    <img src="../assets/img/grid/gears2_design_detail01.png" alt="">
                  </div>
                </div>
                <div class="grid__item layout__item u-2/3">
                  <img src="../assets/img/grid/gears2_design_detail03.png" alt="">
                </div>
              </div>
              <div class="grid__row layout">
                <div class="grid__item layout__item">
                  <img src="../assets/img/grid/gears2_connectivity_basic.png" alt="">
                </div>
                <div class="grid__item layout__item">
                  <img src="../assets/img/grid/gears2_design_detail02.png" alt="">
                </div>
              </div>
              <div class="grid__row layout">
                <div class="grid__item layout__item">
                  <img src="../assets/img/grid/gears2_kv_left.png" alt="">
                </div>
                <div class="grid__item layout__item">
                  <img src="../assets/img/grid/01_2.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="layout__item palm--order-01 ph">
          <section id="showcase-copy" class="showcase-copy fixedsticky">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div class="btn-wrapper">
              <a href="#" class="btn btn--sec">I'm a CTA</a>
              <a href="#" class="btn btn--sec">Yeah, me too</a>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Showcase',
  data () {
    return {
      msg: 'Show case'
    }
  }
}
</script>


<style scoped lang="scss">
	@import '../assets/scss/main.scss';
	@import '../assets/scss/layout/showcase';
</style>
