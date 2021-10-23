<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card :loading="loading" cols="12" md="6">
          <v-card-text>
            <v-card-title>Candy Machine</v-card-title>
            <v-select label="Cluster" v-model="selectedCluster" :items="availableClusters" />
            <v-text-field label="Candy Machine ID" v-model="candyMachineID" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card :loading="loading">
          <v-card-text v-if="status">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Symbol</v-list-item-title>
                  <v-list-item-subtitle>{{ status.symbol }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Authority</v-list-item-title>
                  <v-list-item-subtitle
                    ><a :href="getSolanaExplorerLink(status.authority)" target="_blank">{{
                      status.authority
                    }}</a></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Left Items</v-list-item-title>
                  <v-list-item-subtitle>{{ status.itemsAvailable - status.itemsRedeemed }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Available Items</v-list-item-title>
                  <v-list-item-subtitle>{{ status.itemsAvailable }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Redeemed Items</v-list-item-title>
                  <v-list-item-subtitle>{{ status.itemsRedeemed }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Wallet</v-list-item-title>
                  <v-list-item-subtitle
                    ><a :href="getSolanaExplorerLink(status.wallet)" target="_blank">{{
                      status.wallet
                    }}</a></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Live date</v-list-item-title>
                  <v-list-item-subtitle>{{ formatDate(status.goLiveDate) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>sellerFeeBasisPoints</v-list-item-title>
                  <v-list-item-subtitle>{{ status.sellerFeeBasisPoints }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { AVAILABLE_NETWORK_ADDRESSES, DEVNET, MAINNET, TESTNET } from "@/utility/constants";
import { CandyMachineState } from "@/data/candy-machine-state";
import { fetchCandyMachineState } from "@/api/fetchCandyMachineState";
import moment from "moment";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      loading: false,
      availableClusters: AVAILABLE_NETWORK_ADDRESSES,
      selectedCluster: AVAILABLE_NETWORK_ADDRESSES[0],
      candyMachineID: "",
      status: undefined as CandyMachineState,
    };
  },
  watch: {
    selectedCluster(newVal) {
      this.fetchCandyMachineState();
    },
    candyMachineID(newVal) {
      this.$router.push({
        path: this.$router.currentRoute.path,
        query: { id: newVal },
      });
      this.fetchCandyMachineState();
    },
  },
  methods: {
    async fetchCandyMachineState() {
      this.loading = true;
      if (this.candyMachineID) {
        this.status = await fetchCandyMachineState(this.selectedCluster, this.candyMachineID);
      }
      this.loading = false;
    },
    formatDate(d: Date): string {
      const m = moment(d);
      return `${m.fromNow()} - ${m.toLocaleString()}`;
    },
    getSolanaExplorerLink(address: string) {
      if (this.selectedCluster == MAINNET) {
        return `https://explorer.solana.com/address/${address}`;
      }
      if (this.selectedCluster == TESTNET) {
        return `https://explorer.solana.com/address/${address}?cluster=testnet`;
      }
      if (this.selectedCluster == DEVNET) {
        return `https://explorer.solana.com/address/${address}?cluster=devnet`;
      }
      return "#";
    },
  },
  mounted() {
    if (this.$router.currentRoute.query["id"]) {
      this.candyMachineID = this.$router.currentRoute.query["id"].toString();
    }
  },
});
</script>
