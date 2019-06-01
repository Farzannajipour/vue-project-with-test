<template>
    	<section class="slider-wrapper slider-wrapper--main">
		<div class="layout-wrapper layout-wrapper--absolute">
			<header class="slider__head">
				<h1 class="slider__head__el heading heading--main">Contest</h1>
				<p class="slider__head__el slider__copy">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
				</p>

				<div class="slider__head__el btn-wrapper">
					<a href="#" class="btn btn--sec">Gallery showcase</a>
					<a href="#partecipate" class="btn btn--main">Participate</a>
				</div>
			</header>
		</div>
        <div class="slide--wrapper" v-bind:style="{ transform: 'translateX(-' + (selectedSlide * 100) + '%)'}">
            <div class="slider__el" v-for="(slide, index) in slides" v-bind:style="{ backgroundImage: 'url(' + slide + ')', left:  (index * 100) + '%'}" v-bind:class="{ 'selected--slide': index == selectedSlide}">
                <img v-bind:src="slide" alt="" class="slider__media">
            </div>
        </div>
        <button v-on:click="prevSlide" class="flickity-prev-next-button previous" type="button"><svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg></button>
        <button v-on:click="nextSlide" class="flickity-prev-next-button next" type="button"><svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>
	</section>
</template>

<script>
export default {
  name: 'Slider',
  data () {
    return {
      msg: 'Slider',
      selectedSlide: 0,
      slides: [
            "https://unsplash.it/g/1920/800?image=0",
            "https://unsplash.it/g/1920/800?image=1",
            "https://unsplash.it/g/1920/800?image=2",
            "https://unsplash.it/g/1920/800?image=3"
      ],
    }
  },
  methods:{
      prevSlide: function(){
          if(this.selectedSlide === 0){
              this.selectedSlide = this.slides.length -1;
          }else{
              this.selectedSlide--;
          }
      },
      nextSlide: function(){
        if(this.selectedSlide === this.slides.length -1){
              this.selectedSlide = 0;
        }else{
              this.selectedSlide++;
          }
      },
  }
}
</script>

<style lang="scss">
.selected--slide{
    position: absolute;
    opacity: 1;
    top: 0;
}
.slide--wrapper{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    transition: transform 200ms linear;
}
.flickity-prev-next-button{
    z-index: 2;
}
</style>
