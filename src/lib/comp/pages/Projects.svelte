<script lang="ts">
</script>

<main>
	<section id="text-container">
		<section class="project-section">
			<h2>AmethystUI</h2>

			<p>
				Quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo pertineant non
				emolumento aliquo, sed animo etiam erga nos amice et accurate disserendum et impetus quo
				voluptas assumenda est, omnis iste natus error sit id, de commodis suis cogitarent? at id
				omnia referri.
			</p>
		</section>
	</section>

	<section id="graphics-container">
		<div id="ipad" style="transform: translate3d(0px, 0px, 0px)">
			<div id="screen">
				<img id="wallpaper" src="/images/raster/ipad-wallpaper.png" alt="" />

				<section id="windows">
					<img src="/images/raster/ipad-screen-1.png" alt="" />
					<img src="/images/raster/ipad-screen-2.png" alt="" />
				</section>
			</div>

			<img id="device" src="/images/raster/ipad.png" alt="" />
		</div>

		<!-- <div id="macbook" style="transform: translate3d(700px, 300px, 0px)">
			<img id="device" src="/images/raster/macbook-green.png" alt="" />
		</div> -->
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		@extend .page-container;
		width: 100%;
		height: 500vh;

		display: flex;
		justify-content: center;
		align-items: flex-start;

		// border: 2px solid blue;

		#graphics-container {
			position: sticky;
			top: 0px;

			box-sizing: border-box;
			overflow: visible;

			width: 1100px;
			height: 100vh;

			display: flex;
			justify-content: center;
			align-items: center;

			margin-bottom: -100vh;
			padding-left: 200px;

			// border: 2px solid red;

			#ipad {
				position: absolute;
				width: 1100px;

				display: flex;
				justify-content: center;
				align-items: center;

				#screen {
					position: absolute;
					z-index: 2;

					width: calc(100% - 297px);
					height: auto;
					min-height: 0px;

					aspect-ratio: 1.333/1;

					margin-right: 58px;
					margin-bottom: 20px;

					transform: scale(1, 1.005) rotateX(55deg) rotateY(0deg) rotateZ(-45deg);

					border-radius: 10px;
					overflow: hidden;

					#wallpaper {
						position: absolute;
						width: 100%;
						object-fit: cover;
						border-radius: 10px;
					}

					#windows {
						width: 100%;
						height: 100%;

						display: flex;
						flex-direction: row-reverse;

						img {
							@extend #wallpaper;

							position: relative;

							margin-left: 100px;

							&:last-child {
								margin: 0px;
							}

							box-shadow: 0px 10px 50px hsla(0, 0%, 0%, 40%);
						}

						animation:
							change-windows 1s normal 1 forwards,
							scale-windows 1s normal 1 forwards;
						animation-delay: 1s;
					}

					@keyframes scale-windows {
						0% {
							scale: 1;
						}

						30% {
							scale: 0.9;
							animation-timing-function: $out-cubic;
						}

						100% {
							scale: 1;
						}
					}

					@keyframes change-windows {
						0% {
							transform: translateX(0%);
							animation-timing-function: $out-cubic;
						}

						100% {
							transform: translateX(calc(100% + 100px));
						}
					}
				}

				#device {
					width: 100%;
					filter: sepia(20%);
				}
			}

			#macbook {
				position: absolute;
				width: 2200px;

				#device {
					width: 100%;
					filter: sepia(20%);
				}
			}

			img {
				display: block;
			}
		}

		#text-container {
			width: fit-content;
			box-sizing: border-box;

			display: flex;
			justify-content: center;
			align-items: center;

			padding-top: 200px;

			// border: 2px solid green;

			z-index: 3;

			.project-section {
				width: 100%;
				height: 100vh;

				display: flex;
				justify-content: center;
				align-items: flex-start;
				flex-direction: column;

				h2 {
					font-family: "PT Serif";
					font-weight: 700;

					font-size: 100px;
				}

				p {
					margin-top: 70px;
					font-size: 24px;

					width: 600px;
				}
			}
		}
	}
</style>
