<template>
  <div id="app">
	<section class="share-layer" v-show="!isDisplayShare">
		<div class="layout-wrapper layout-wrapper--tiny share-layer__inner">
			<button class="share-layer__close js-close-share" @click="isDisplayShare = !isDisplayShare">
				<svg class="icon icon--light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
					<path d="M1014.662 822.66c-0.004-0.004-0.008-0.008-0.012-0.010l-310.644-310.65 310.644-310.65c0.004-0.004 0.008-0.006 0.012-0.010 3.344-3.346 5.762-7.254 7.312-11.416 4.246-11.376 1.824-24.682-7.324-33.83l-146.746-146.746c-9.148-9.146-22.45-11.566-33.828-7.32-4.16 1.55-8.070 3.968-11.418 7.31 0 0.004-0.004 0.006-0.008 0.010l-310.648 310.652-310.648-310.65c-0.004-0.004-0.006-0.006-0.010-0.010-3.346-3.342-7.254-5.76-11.414-7.31-11.38-4.248-24.682-1.826-33.83 7.32l-146.748 146.748c-9.148 9.148-11.568 22.452-7.322 33.828 1.552 4.16 3.97 8.072 7.312 11.416 0.004 0.002 0.006 0.006 0.010 0.010l310.65 310.648-310.65 310.652c-0.002 0.004-0.006 0.006-0.008 0.010-3.342 3.346-5.76 7.254-7.314 11.414-4.248 11.376-1.826 24.682 7.322 33.83l146.748 146.746c9.15 9.148 22.452 11.568 33.83 7.322 4.16-1.552 8.070-3.97 11.416-7.312 0.002-0.004 0.006-0.006 0.010-0.010l310.648-310.65 310.648 310.65c0.004 0.002 0.008 0.006 0.012 0.008 3.348 3.344 7.254 5.762 11.414 7.314 11.378 4.246 24.684 1.826 33.828-7.322l146.746-146.748c9.148-9.148 11.57-22.454 7.324-33.83-1.552-4.16-3.97-8.068-7.314-11.414z"></path>
				</svg>
			</button>
			<div class="layout layout--center layout--stacked share-layer__buttons">
				<div class="share-layer__btn-wrapper">
					<a href="https://www.facebook.com/sharer/sharer.php?u=YOUR-URL"
					 class="btn btn--share btn--fb"
					target="_blank">
						<svg class="icon icon--light" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg">
							<title>facebook</title>
							<path class="path1"
								d="M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z"></path>
						</svg>
						<span class="btn__text">Facebook</span>
					</a>
				</div>
				<div class="share-layer__btn-wrapper">
					<a href="https://twitter.com/intent/tweet?text=YOUR-TITLE&url=YOUR-URL&via=TWITTER-HANDLE"
					class="btn btn--share btn--tw" target="_blank">
						<svg class="icon icon--light" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg">
							<title>twitter</title>
							<path d="M1024 226.4c-37.6 16.8-78.2 28-120.6 33 43.4-26 76.6-67.2 92.4-116.2-40.6 24-85.6 41.6-133.4 51-38.4-40.8-93-66.2-153.4-66.2-116 0-210 94-210 210 0 16.4 1.8 32.4 5.4 47.8-174.6-8.8-329.4-92.4-433-219.6-18 31-28.4 67.2-28.4 105.6 0 72.8 37 137.2 93.4 174.8-34.4-1-66.8-10.6-95.2-26.2 0 0.8 0 1.8 0 2.6 0 101.8 72.4 186.8 168.6 206-17.6 4.8-36.2 7.4-55.4 7.4-13.6 0-26.6-1.4-39.6-3.8 26.8 83.4 104.4 144.2 196.2 146-72 56.4-162.4 90-261 90-17 0-33.6-1-50.2-3 93.2 59.8 203.6 94.4 322.2 94.4 386.4 0 597.8-320.2 597.8-597.8 0-9.2-0.2-18.2-0.6-27.2 41-29.4 76.6-66.4 104.8-108.6z"></path>
						</svg>
						<span class="btn__text">Twitter</span>
					</a>
				</div>
				<div class="share-layer__btn-wrapper">
					<a href="https://pinterest.com/pin/create/button/?url=YOUR-URL&description=YOUR-DESCRIPTION&media=YOUR-IMAGE-SRC"
					class="btn btn--share btn--pint" target="_blank">
						<svg class="icon icon--light" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg">
							<title>pinterest</title>
							<path class="path1"
								d="M512 68.4c-245 0-443.6 198.6-443.6 443.6 0 188 117 348.4 282 413-3.8-35-7.4-89 1.6-127.2 8-34.6 52-220.4 52-220.4s-13.2-26.6-13.2-65.8c0-61.6 35.8-107.8 80.2-107.8 37.8 0 56.2 28.4 56.2 62.4 0 38-24.2 95-36.8 147.6-10.6 44.2 22 80.2 65.6 80.2 78.8 0 139.4-83.2 139.4-203.2 0-106.2-76.4-180.4-185.2-180.4-126.2 0-200.2 94.6-200.2 192.6 0 38.2 14.6 79 33 101.2 3.6 4.4 4.2 8.2 3 12.8-3.4 14-10.8 44.2-12.4 50.4-2 8.2-6.4 9.8-14.8 6-55.4-25.8-90-106.8-90-171.8 0-140 101.6-268.4 293-268.4 153.8 0 273.4 109.6 273.4 256.2 0 152.8-96.4 276-230.2 276-45 0-87.2-23.4-101.6-51 0 0-22.2 84.6-27.6 105.4-10 38.6-37 86.8-55.2 116.2 41.6 12.8 85.6 19.8 131.4 19.8 245 0 443.6-198.6 443.6-443.6 0-245.2-198.6-443.8-443.6-443.8z"></path>
						</svg>
						<span class="btn__text">Pinterest</span>
					</a>
				</div>
			</div>
		</div>
	</section>

	<header class="main-header">
		<div class="layout-wrapper">
			<div class="layout layout--middle">
				<div class="layout__item">
					<a href="/" id="header__logo" class="logo">
					<img class="logo__media" src="http://fpoimg.com/400x99"
																	alt=""></a>
				</div>
				<div class="layout__item layout__item--right">
					<button id="header__share" class="share js-show-share-layer" @click="isDisplayShare = !isDisplayShare">
						<span class="share__text">Share on</span>
						<span class="share__icon">
									<svg class="icon icon--share icon--dark" viewBox="0 0 1024 1024" version="1.1"
										xmlns="http://www.w3.org/2000/svg">
										<title>share on</title>
										<path d="M864 704c-45.16 0-85.92 18.738-115.012 48.83l-431.004-215.502c1.314-8.252 2.016-16.706 2.016-25.328s-0.702-17.076-2.016-25.326l431.004-215.502c29.092 30.090 69.852 48.828 115.012 48.828 88.366 0 160-71.634 160-160s-71.634-160-160-160-160 71.634-160 160c0 8.622 0.704 17.076 2.016 25.326l-431.004 215.504c-29.092-30.090-69.852-48.83-115.012-48.83-88.366 0-160 71.636-160 160 0 88.368 71.634 160 160 160 45.16 0 85.92-18.738 115.012-48.828l431.004 215.502c-1.312 8.25-2.016 16.704-2.016 25.326 0 88.368 71.634 160 160 160s160-71.632 160-160c0-88.364-71.634-160-160-160z"></path>

									</svg>
								</span>
					</button>
				</div>
			</div>
		</div>
	</header>
	<main class="main-content">
		<slider-component></slider-component>
	</main>
    <router-view/>

	<footer class="main-footer">
	<div class="layout-wrapper">
		<div class="layout palm-layout--stacked">
			<div class="layout__item full__item text-center">
				<p class="footer__el">
					VueJs project by Amir Farzan Najipour
				</p>
			</div>
			<div class="layout__item full__item text-center">
				<p class="footer__el footer__el--divided"><a href="#">Privacy</a></p>
				<p class="footer__el"><a href="#">Cookie</a></p>
			</div>
		</div>
	</div>
</footer>
  </div>
</template>

<script>
import Slider from './components/Slider.vue';
export default {
  name: 'App',
  data() {
	  return {
		  isDisplayShare : true
	  }
  },
  components:{
	  'slider-component': Slider
  }
}
</script>

<style lang="scss">
	@import './assets/scss/main.scss';
	@import './assets/scss/layout/footer';
</style>
