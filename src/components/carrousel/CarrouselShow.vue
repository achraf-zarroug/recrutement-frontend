<template>
  <div class="carousel-container">
    <!-- Un seul slide avec l'image et le texte -->
    <img src="@/assets/img/istockphoto.jpg" alt="Startup Job" class="carousel-image" />
    <div class="caption">
      <div
        class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
        style="background: rgba(43, 57, 64, 0.5)"
      >
        <div class="container">
          <div class="row justify-content-start">
            <div class="col-10 col-lg-8">
              <h1 class="display-3 text-white animated slideInDown mb-4">
                Find The Perfect Job That You Deserved
              </h1>
              <p class="fs-5 fw-medium text-white mb-4 pb-2">
                Explore exciting opportunities and take the next step in your professional journey.
              </p>
              <router-link
                to="/jobs"
                class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >Search A Job</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarrouselShow'
}
</script>

<style scoped>
/* Container du carrousel */
.carousel-container {
  position: relative;
  width: 100%;
  height: 400px; /* Hauteur ajustable */
  overflow: hidden;
  text-align: center; /* Centrer le texte et les éléments */
}

/* Image */
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Couvre l'espace du container */
  display: block;
}

/* Légende */
.caption {
  bottom: 20%;
  left: 10%;
  right: 10%;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  z-index: 10;
}

.caption h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.caption .btn {
  font-size: 1rem;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-container {
    height: 300px; /* Réduit la hauteur sur les petits écrans */
  }

  .carousel-image {
    height: 100%;
  }

  .caption h2 {
    font-size: 1.5rem;
  }

  .caption .btn {
    font-size: 0.8rem;
    padding: 8px 16px;
  }
}
</style>
