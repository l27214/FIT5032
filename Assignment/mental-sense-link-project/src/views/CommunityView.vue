<template>
  <div class="container profile pt-3">
    <div class="row">
      <div class="col-md-6" v-for="post in data.posts" :key="post.id">
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <a href="#">
                <img alt="" width="50" class="rounded-circle" :src="post.posterAvatar" />
              </a>
              <div class="flex-fill ps-2">
                <div class="fw-bold">
                  <a href="#" class="text-decoration-none">{{ post.posterUsername }}</a>
                </div>
                <div class="small text-body text-opacity-50">{{ post.postDate }}</div>
              </div>
            </div>

            <p>{{ post.content }}</p>
            <div class="profile-img-list">
              <div v-if="post.type === 'video'" class="post-video">
                <div class="fluid-width-video-wrapper" style="padding-top: 56.2%">
                  <iframe :src="post.src"></iframe>
                </div>
              </div>
              <div v-else-if="post.type === 'image'" class="profile-img-list-item main">
                <a href="#" class="profile-img-list-link">
                  <span
                    class="profile-img-content"
                    :style="{ backgroundImage: 'url(' + post.src + ')' }"
                  ></span>
                </a>
              </div>
            </div>

            <hr class="mb-1 opacity-1" />

            <div class="row text-center fw-bold">
              <div class="col">
                <a
                  href="#"
                  class="text-body text-opacity-50 text-decoration-none d-block p-2"
                  :class="{ liked: post.liked }"
                  @click.prevent="toggleLike(post)"
                >
                  <i class="pi pi-thumbs-up"></i> Likes <span>{{ post.likeCount }}</span>
                </a>
              </div>
              <div class="col">
                <a href="#" class="text-body text-opacity-50 text-decoration-none d-block p-2">
                  <i class="pi pi-comment"></i> Comment <span>{{ post.commentCount }}</span>
                </a>
              </div>
              <div class="col">
                <a href="#" class="text-body text-opacity-50 text-decoration-none d-block p-2">
                  <i class="pi pi-share-alt"></i> Share <span>{{ post.shareCount }}</span>
                </a>
              </div>
            </div>
            <hr class="mb-3 mt-1 opacity-1" />
            <div class="d-flex align-items-center">
              <i class="pi pi-user rounded-circle" style="font-size: 1.2rem"></i>
              <div class="flex-fill ps-2">
                <div class="position-relative d-flex align-items-center">
                  <input
                    type="text"
                    class="form-control rounded-pill bg-white bg-opacity-15"
                    style="padding-right: 120px"
                    placeholder="Write a comment..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<!-- Need to show more posts in this page, and have ... at the page end for Content Exploration -->

<script setup>
import { ref } from 'vue'
import posts from '../../data/communityData.json'

const data = ref({
  posts: posts.map((post) => ({ ...post, liked: false, likeCount: post.likeCount || 0 }))
})

const toggleLike = (post) => {
  post.liked = !post.liked
  post.liked ? post.likeCount++ : post.likeCount--
}
</script>

<style scoped>
.profile .profile-img-list {
  list-style-type: none;
  margin: -0.1rem;
  padding: 0;
}

.profile .profile-img-list .profile-img-list-item.main {
  width: 50%;
}

.profile .profile-img-list .profile-img-list-item .profile-img-list-link {
  display: block;
  padding-top: 75%;
  overflow: hidden;
  position: relative;
}

.profile .profile-img-list .profile-img-list-item .profile-img-list-link .profile-img-content,
.profile .profile-img-list .profile-img-list-item .profile-img-list-link img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.profile .profile-img-list:after,
.profile .profile-img-list:before {
  content: '';
  display: table;
  clear: both;
}

.fluid-width-video-wrapper {
  width: 100%;
  position: relative;
  padding: 0;
}

.fluid-width-video-wrapper iframe,
.fluid-width-video-wrapper object,
.fluid-width-video-wrapper embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.liked {
  color: red !important;
}
</style>
