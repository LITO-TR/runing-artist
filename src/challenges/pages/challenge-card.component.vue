<template>
  <div>
    <div class="flex card-container">
      <pv-card>
        <template v-slot:title>
          <div>CHALLENGE COUNT</div>
        </template>
        <template v-slot:content>
          <div>
            <span> Total: </span>
            <span>
              <strong>{{ numberChallenge }}</strong>
            </span>
          </div>
          <div>
            <span> Individual challenges: </span>
            <span>
              <strong>{{ individualQuantity }}</strong>
            </span>
          </div>
          <div>
            <span> Team Challenges: </span>
            <span>
              <strong>{{ teamQuantity }}</strong>
            </span>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<script>
import { ChallengesApiService } from "../service/challenges-api.service";

export default {
  name: "challenge-card",
  data() {
    return {
      challenge: {},
      individualQuantity: 0,
      teamQuantity: 0,
      numberChallenge: 0,
      individualChallenges: 0,
      teamChallenges: 0,
      challenges: [],
      currentChallenges: [],
      challengesService: null,
    };
  },
  created() {
    this.challengesService = new ChallengesApiService();
    this.challengesService.getAll().then((response) => {
      this.challenges = response.data;
      this.challenges.forEach((challenge) =>
        this.getDisplayableChallenge(challenge)
      );
      this.numberChallenge = this.challenges.length;
      console.log(this.numberChallenge, "quantity");
      let i;
      for (i = 0; i < this.challenges.length; i++) {
        if (response.data[i].challengeType === "Individual") {
          console.log(this.individualQuantity++);
        } else {
          console.log(this.teamQuantity++);
        }
      }
    });
  },
  methods: {
    getDisplayableChallenge(challenge) {
      challenge.status = challenge.id;
      return challenge;
    },
  },
};
</script>

<style scoped></style>
<style>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
