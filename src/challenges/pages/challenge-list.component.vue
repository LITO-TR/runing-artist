<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
        <template #start>
          <pv-button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
        </template>
      </pv-toolbar>

      <pv-data-table
        ref="dt"
        :value="challenges"
        v-model:selection="selectedChallenges"
        datakey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} challenges"
        responsiveLayout="scroll"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">
              Manage challenges
            </h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <pv-input-text
                v-model="filters['global'].value"
                placeholder="Search..."
              />
            </span>
          </div>
        </template>
        <pv-column
          field="title"
          header="Title"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="businessId"
          header="Business Id"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="urlToImage"
          header="URL To Image"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="challengeType"
          header="Challenge Type"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editChallenge(slotProps.data)"
            />
            <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="confirmDeleteChallenge(slotProps.data)"
            />
          </template>
        </pv-column>

        <pv-dialog
          v-model:visible="challengeDialog"
          :style="{ width: '450px' }"
          header="challenge Information"
          :modal="true"
          class="p-fluid"
        >
          <div class="field mt-3">
            <span class="p-float-label">
              <pv-input-text
                type="text"
                id="title"
                v-model.trim="challenge.title"
                required="true"
                autofocus
                :class="{ 'p-invalid': submitted && !challenge.title }"
              />
              <label for="title">Title</label>
              <small class="p-error" v-if="submitted && !challenge.title"
                >Title is required</small
              >
            </span>
          </div>
          <div class="field">
            <span class="p-float-label">
              <pv-input-text
                type="number"
                id="businessId"
                v-model="challenge.businessId"
                required="false"
                rows="2"
                cols="20"
              />
              <label for="businessId">Business Id</label>
              <small class="p-error" v-if="submitted && !challenge.businessId"
                >BusinessId is required</small
              >
            </span>
          </div>
          <div class="field">
            <span class="p-float-label">
              <pv-input-text
                type="textarea"
                id="urlToImage"
                v-model="challenge.urlToImage"
                required="false"
                rows="2"
                cols="20"
              />
              <label for="urlToImage">URL To Image</label>
              <small class="p-error" v-if="submitted && !challenge.urlToImage"
                >URL To Image is required</small
              >
            </span>
          </div>
          <div class="field">
            <pv-dropdown
              v-model="challenge.challengeType"
              :options="types"
              optionLabel="type"
              optionValue="code"
              placeholder="Challenge Type"
            />
          </div>
          <template #footer>
            <pv-button
              :label="'Cancel'.toUpperCase()"
              icon="pi pi-times"
              class="p-button-text"
              @click="hideDialog"
            />
            <pv-button
              :label="'Save'.toUpperCase()"
              icon="pi pi-check"
              class="p-button-text"
              @click="saveChallenge"
            />
          </template>
        </pv-dialog>

        <pv-dialog
          v-model:visible="deleteChallengeDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="confirmation-content">
            <i
              class="pi pi-exclamation-triangle mr-3"
              style="font-size: 2rem"
            />
            <span v-if="challenge"
              >Are you sure you want to delete <b>{{ challenge.title }}</b
              >?</span
            >
          </div>
          <template #footer>
            <pv-button
              :label="'No'.toUpperCase()"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteChallengeDialog = false"
            />
            <pv-button
              :label="'Yes'.toUpperCase()"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteChallenge"
            />
          </template>
        </pv-dialog>

        <pv-dialog
          v-model:visible="deleteChallengesDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="confirmation-content">
            <i
              class="pi pi-exclamation-triangle mr-3"
              style="font-size: 2rem"
            />
            <span v-if="challenge"
              >Are you sure you want to delete the selected challenges?</span
            >
          </div>
          <template #footer>
            <pv-button
              :label="'No'.toUpperCase()"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteChallengesDialog = false"
            />
            <pv-button
              :label="'Yes'.toUpperCase()"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteSelectedChallenges"
            />
          </template>
        </pv-dialog>
      </pv-data-table>
    </div>
  </div>
</template>

<script>
import { ChallengesApiService } from "../service/challenges-api.service";
import { FilterMatchMode } from "primevue/api";
export default {
  name: "challenge-list",
  data() {
    return {
      challenges: [],
      challengeDialog: false,
      deleteChallengeDialog: false,
      deleteChallengesDialog: false,
      challenge: {},
      selectedChallenges: null,
      filters: {},
      submitted: false,
      challengesService: null,
      selectedType: null,
      types: [
        { type: "Individual", code: "Individual" },
        { type: "Team", code: "Team" },
      ],
    };
  },

  created() {
    this.challengesService = new ChallengesApiService();
    this.challengesService.getAll().then((response) => {
      this.challenges = response.data;
      this.challenges.forEach((challenge) =>
        this.getDisplayableChallenge(challenge)
      );
      console.log("created");
    });
    this.initFilters();
  },
  methods: {
    getDisplayableChallenge(challenge) {
      this.challenge.id = challenge.id;
      return challenge;
    },
    getStorableChallenge(displayableChallenge) {
      return {
        id: displayableChallenge.id,
        title: displayableChallenge.title,
        businessId: displayableChallenge.businessId,
        urlToImage: displayableChallenge.urlToImage,
        challengeType: displayableChallenge.challengeType,
      };
    },
    openNew() {
      this.challenge = {};
      this.submitted = false;
      this.challengeDialog = true;
    },
    hideDialog() {
      this.challengeDialog = false;
      this.submitted = false;
    },
    findIndexById(id) {
      return this.challenges.findIndex((challenge) => challenge.id === id);
    },
    saveChallenge() {
      this.submitted = true;
      if (this.challenge.title.trim()) {
        if (this.challenge.id) {
          this.challenge = this.getStorableChallenge(this.challenge);
          this.challengesService
            .update(this.challenge.id, this.challenge)
            .then((response) => {
              this.challenges[this.findIndexById(response.data.id)] =
                this.getDisplayableChallenge(response.data);
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "challenge Updated",
                life: 3000,
              });
              console.log(response);
            });
        } else {
          this.challenge.id = 0;
          console.log(this.challenge);
          this.challenge = this.getStorableChallenge(this.challenge);
          this.challengesService.create(this.challenge).then((response) => {
            this.challenge = this.getDisplayableChallenge(response.data);
            this.challenges.push(this.challenge);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "challenge Created",
              life: 3000,
            });
            console.log(response);
          });
        }
        this.challengeDialog = false;
        this.challenge = {};
      }
    },
    editChallenge(challenge) {
      console.log(challenge);
      this.challenge = { ...challenge };
      console.log(this.challenge);
      this.challengeDialog = true;
    },
    confirmDeleteChallenge(challenge) {
      this.challenge = challenge;
      this.deleteChallengeDialog = true;
    },
    deleteChallenge() {
      this.challengesService.delete(this.challenge.id).then((response) => {
        this.challenges = this.challenges.filter(
          (t) => t.id !== this.challenge.id
        );
        this.deleteChallengeDialog = false;
        this.challenge = {};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "challenge Deleted",
          life: 3000,
        });
        console.log(response);
      });
    },

    deleteSelectedChallenges() {
      this.selectedChallenges.forEach((challenge) => {
        this.challengesService.delete(challenge.id).then((response) => {
          this.challenges = this.challenges.filter(
            (t) => t.id !== this.challenge.id
          );
          console.log(response);
        });
      });
      this.deleteChallengesDialog = false;
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>

<style scoped></style>
