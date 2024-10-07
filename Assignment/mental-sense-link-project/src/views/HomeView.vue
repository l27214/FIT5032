<template>
  <div>
    <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="background-image1" aria-hidden="true"></div>
          <div class="container">
            <div class="carousel-caption text-start">
              <h1>Relax and Enjoy Life</h1>
              <p class="opacity-75">
                Learn some simple relaxation techniques to help you relieve stress and enjoy every
                day.
              </p>
              <p><a class="btn btn-lg btn-primary" href="#">Start Learning</a></p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="background-image2" aria-hidden="true"></div>
          <div class="container">
            <div class="carousel-caption">
              <h1>Community Sharing, Growing Together</h1>
              <p>
                Here, you can share your stories, listen to others' experiences, and grow together.
              </p>
              <p><a class="btn btn-lg btn-primary" href="#">Join Community</a></p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="background-image3" aria-hidden="true"></div>
          <div class="container">
            <div class="carousel-caption text-end">
              <h1>Mental Health, Starting with Understanding</h1>
              <p>Learn about mental health knowledge to better care for yourself and others.</p>
              <p><a class="btn btn-lg btn-primary" href="#">Learn More</a></p>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div v-if="isAuthenticated" class="mb-6">
      <div class="d-flex justify-content-center align-items-center mb-4">
        <div class="text-center">
          <h2 class="pb-2">Hi, {{ userName }}. How do you feel today?</h2>
          <!-- <h2 class="pb-2">Hi, <span v-html="userName"></span>. How do you feel today?</h2> -->

          <form class="mb-6" @submit.prevent="">
            <div>
              <img
                src="https://em-content.zobj.net/source/twitter/408/grinning-face_1f600.png"
                class="emoji"
                alt="grinning-face"
              />
              <img
                src="https://em-content.zobj.net/source/twitter/408/loudly-crying-face_1f62d.png"
                class="emoji"
                alt="loudly-crying-face"
              />
              <img
                src="https://em-content.zobj.net/source/twitter/408/confounded-face_1f616.png"
                class="emoji"
                alt="confounded-face"
              />
              <img
                src="https://em-content.zobj.net/source/twitter/408/neutral-face_1f610.png"
                class="emoji"
                alt="neutral-face"
              />
              <img
                src="https://em-content.zobj.net/source/twitter/408/worried-face_1f61f.png"
                class="emoji"
                alt="worried-face"
              />
              <img
                src="https://em-content.zobj.net/source/twitter/408/angry-face_1f620.png"
                class="emoji"
                alt="angry-face"
              />
            </div>
            <div class="m-4">
              <input
                type="text"
                class="form-control"
                id="dailyFeedback"
                placeholder="How feel today? (Optional)"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>

    <div class="container marketing">
      <div class="row">
        <div class="col-lg-4">
          <svg
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
          </svg>
          <h2 class="fw-normal">Relaxation Techniques</h2>
          <p>
            Learn some simple relaxation techniques to help you relieve stress and enjoy every day.
          </p>

          <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
        </div>

        <div class="col-lg-4">
          <svg
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
          </svg>
          <h2 class="fw-normal">Community Sharing</h2>
          <p>Here, you can share your stories, listen to others' experiences, and grow together.</p>

          <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
        </div>

        <div class="col-lg-4">
          <svg
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
          </svg>
          <h2 class="fw-normal">Mental Health Knowledge</h2>
          <p>Learn about mental health knowledge to better care for yourself and others.</p>

          <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
        </div>
      </div>

      <hr class="my-5" />

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading fw-normal lh-1">Relax and Enjoy Life</h2>
          <p class="lead">
            Learn some simple relaxation techniques to help you relieve stress and enjoy every day.
          </p>
        </div>
        <div class="col-md-5">
          <svg
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="var(--bs-secondary-bg)" />
            <text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text>
          </svg>
        </div>
      </div>

      <hr class="my-5" />

      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading fw-normal lh-1">Community Sharing, Growing Together</h2>
          <p class="lead">
            Here, you can share your stories, listen to others' experiences, and grow together.
          </p>
        </div>
        <div class="col-md-5 order-md-1">
          <svg
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="var(--bs-secondary-bg)" />
            <text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

/* Carousel base class */
.carousel {
  margin-bottom: 4rem;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

/* Declare heights because of positioning of img element */
.carousel-item {
  height: 32rem;
}

/* Center align the text within the three columns below the carousel */
.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.marketing .col-lg-4 p {
  margin-right: 0.75rem;
  margin-left: 0.75rem;
}

/* Thin out the marketing headings */

.featurette-heading {
  letter-spacing: -0.05rem;
}

@media (min-width: 40em) {
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}

.background-image1 {
  width: 100%;
  height: 100%;
  background-image: url('https://cdn.pixabay.com/photo/2016/03/24/13/45/coffee-1276778_1280.jpg');
  background-size: cover;
  background-position: center;
  background-color: black;
}

.background-image2 {
  width: 100%;
  height: 100%;
  background-image: url('https://cdn.pixabay.com/photo/2019/10/06/10/03/team-4529717_1280.jpg');
  background-size: cover;
  background-position: center;
  background-color: black;
}

.background-image3 {
  width: 100%;
  height: 100%;
  background-image: url('https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014_1280.jpg');
  background-size: cover;
  background-position: center;
  background-color: black;
}

.emoji {
  max-height: 50px;
  margin: 10px 30px;
}
</style>
