<template>  
	<section class="tabs">
		<div class="layout-wrapper">
			<nav class="tabs__cmds">				
				<router-link to="/participate" active-class="is-selected" class="tabs__cmd js-tab-cmd">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="-545 358.9 100 125" style="enable-background:new -545 358.9 100 125;" xml:space="preserve">
							<path class="tabs__icon tabs__icon--partecipate" d="M-534.4,455.5h26.2v-26.2h-26.2V455.5z M-529.1,434.5h15.8v15.8h-15.8V434.5z M-502.9,408.3h47.2V403h-47.2
								V408.3z M-534.4,413.5h26.2v-26.2h-26.2V413.5z M-529.1,392.5h15.8v15.8h-15.8V392.5z M-502.9,424h47.2v-5.2h-47.2V424z
								 M-502.9,455.5h47.2v-5.2h-47.2V455.5z M-502.9,439.8h47.2v-5.2h-47.2V439.8z M-502.9,387.3v5.2h47.2v-5.2H-502.9z"/>
							</svg>
					<span class="tabs__title">Participate</span>				
				</router-link>
				<router-link to="/gallery" active-class="is-selected" class="tabs__cmd js-tab-cmd">
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="-545 358.9 100 125" style="enable-background:new -545 358.9 100 125;" xml:space="preserve">
							<path class="tabs__icon tabs__icon--gallery" d="M-527.7,453.5c0.5,0.4,1.1,0.6,1.8,0.6c0.4,0,0.9-0.1,1.3-0.3l13.3-6.3c0.4-0.2,0.8-0.5,1.1-0.9l30.2-41.1
								c0,0,0,0,0,0c0,0,0,0,0,0l7.7-10.5c1.6-2.2,1.2-5.4-1.1-7l-8.1-5.9c-0.9-0.6-1.9-1-3-1c-1.6,0-3.1,0.8-4,2l-37.9,51.5
								c-0.3,0.4-0.5,0.9-0.6,1.4l-2.1,14.6C-529,451.7-528.6,452.8-527.7,453.5z M-484.1,387.5l6.4,4.7l-5.3,7.2l-6.4-4.7L-484.1,387.5z
								 M-521,437.6l28-38l6.4,4.7l-28,38l-7.6,3.6L-521,437.6z M-463.5,455.7h-63c-1.7,0-3,1.3-3,3c0,1.7,1.3,3,3,3h63c1.7,0,3-1.3,3-3
								C-460.5,457.1-461.8,455.7-463.5,455.7z"/>
							</svg>
					<span class="tabs__title">Gallery</span>
				</router-link>
				<router-link to="/showcase" active-class="is-selected" class="tabs__cmd js-tab-cmd">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
						<path class="tabs__icon tabs__icon--showcase"
						      d="M74.053,57.673a1.615,1.615,0,0,0-.614-.121H68.4l-4.4-9-.037-.01A51.457,51.457,0,0,0,51,46.463V46.45H50v.01a52.348,52.348,0,0,0-13.963,2.084L36,48.55l-4.4,9H26.561a1.615,1.615,0,0,0-.614.121A1.508,1.508,0,0,0,25,59.045v.6a2.022,2.022,0,0,0,1.463,1.891L29,62.13V76.95a1.6,1.6,0,0,0,1.6,1.6h7.9a1.5,1.5,0,0,0,1.5-1.5v-2.5H60v2.4a1.6,1.6,0,0,0,1.6,1.6h7.8a1.6,1.6,0,0,0,1.6-1.6h0V62.13l2.537-.6A2.021,2.021,0,0,0,75,59.642v-.6A1.507,1.507,0,0,0,74.053,57.673ZM37.5,50.55A47.83,47.83,0,0,1,50,48.75a47.83,47.83,0,0,1,12.5,1.8l4.5,9H33Zm1.2,19h-5a1.7,1.7,0,0,1-1.7-1.7v-1.8a1.263,1.263,0,0,1,1.177-1.344,1.287,1.287,0,0,1,.423.044l5.2,1.2a2.132,2.132,0,0,1,1.6,2A1.666,1.666,0,0,1,38.7,69.55Zm17.3,2H45v-2H56Zm12-3.7a1.7,1.7,0,0,1-1.7,1.7h-5a1.666,1.666,0,0,1-1.7-1.6,2.132,2.132,0,0,1,1.6-2l5.2-1.2a1.264,1.264,0,0,1,1.6,1.3Z"/>
					</svg>
					<span class="tabs__title">Showcase</span>				
				</router-link>
			</nav>			
			<div>
				<router-view></router-view>
			</div>	
		</div>		

	</section>



</template>

<script>
export default {
  name: "Home",
  data() {
    return {      
    };
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/layout/tabs";
@import "../assets/scss/main.scss";
</style>
