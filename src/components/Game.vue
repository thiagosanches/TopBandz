<template>
  <div class="hello">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">{{ msg }}</h1>
        <div class="form-horizontal">
          <div class="form-group">
            <p class="lead text-muted">Challenge your friends!</p>
            <label for="player-name">Your name:</label>
            <input
              type="text"
              id="player-name"
              class="form-control"
              v-model="game.playerName"
            />
            <button
              type="button"
              class="btn btn-secondary"
              v-on:click="newGame"
            >
              New Game Session
            </button>
            <input
              type="text"
              id="player-name"
              class="form-control"
              v-model="game.uuid"
            />
            <button type="button" class="btn btn-secondary" v-on:click="join">
              Join Game Session
            </button>
          </div>
        </div>
      </div>
      <h1>
        Player1: {{ this.game.points.player1_Points }} X Player2:
        {{ this.game.points.player2_Points }}
      </h1>
    </section>

    <div class="album py-5 bg-light">
      <div class="container">
        <div id="band-card" class="row">
          <div
            class="col-md-4"
            v-for="(card, index) in game.cards"
            :key="index"
          >
            <div class="card mb-4 box-shadow">
              <img
                class="card-img-top"
                style="width: 100%; display: block"
                v-bind:src="card.picture"
                data-holder-rendered="true"
              />
              <div class="card-body">
                <h2>{{ card.year }}</h2>
                <h3>{{ card.name }}</h3>
                <div v-html="card.summary"></div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <a
                      href="#"
                      class="btn btn-success my-2"
                      v-on:click="playCard(index)"
                      >Use it!</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const UPDATE_INTERVAL_MS = 1000;
import api from "@/services/api.js";
export default {
  name: "Game",
  props: {
    msg: String,
  },
  data() {
    return {
      game: {
        uuid: "",
        points: {},
        playerName: "",
        is2ndPlayer: false,
        cards: [],
      },
    };
  },
  methods: {
    newGame: function () {
      this.game.playerName;
      api.get(`/new?playerName=${this.game.playerName}`).then((response) => {
        this.game.uuid = response.data;
        this.getVisibleCards();
        setInterval(() => this.round(), UPDATE_INTERVAL_MS);
      });
    },
    getVisibleCards: function () {
      api
        .get(
          `/getVisibleCards?uuid=${this.game.uuid}&playerName=${this.game.playerName}`
        )
        .then((response) => {
          this.game.cards = response.data;
        });
    },
    playCard: function (index) {
      const bandName = this.game.cards[index].name;
      api
        .get(
          `/play?uuid=${this.game.uuid}&band=${encodeURIComponent(
            bandName
          )}&playerName=${this.game.playerName}`
        )
        .then(() => {
          this.round();
          this.getVisibleCards();
        });
    },
    round: function () {
      api.get(`/round?uuid=${this.game.uuid}`).then((response) => {
        this.game.points = response.data;
      });
    },
    join: function () {
      api
        .get(`/join?uuid=${this.game.uuid}&playerName=${this.game.playerName}`)
        .then((response) => {
          this.game.is2ndPlayer = true;
          this.game.cards = response.data;
          setInterval(() => this.round(), UPDATE_INTERVAL_MS);
        });
    },
  },
  mounted() {},
};
</script>
