<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card :loading="loading">
          <v-card-text>
            <v-card-title>Candy Machine</v-card-title>
            <v-select label="Cluster" v-model="selectedCluster" :items="availableClusters" />
            <v-text-field label="Candy Machine ID" v-model="candyMachineID" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :loading="loading" @click="fetchCandyMachineStatus" color="success">
              Submit
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card :loading="loading">
          <v-card-text>
            <v-list>
              <v-list-item v-for="k in Object.keys(status)" :key="k">
                <v-list-item-content>
                  <v-list-item-title>{{ k }}</v-list-item-title>
                  <v-list-item-subtitle>{{ status[k] }}</v-list-item-subtitle>
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
import candyMachineIdl from "@/assets/candy-machine-idl.json";
import * as anchor from "@project-serum/anchor";

const CANDY_MACHINE_PROGRAM = new anchor.web3.PublicKey("cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ");

export default Vue.extend({
  name: "Home",
  data() {
    return {
      loading: false,
      availableClusters: [
        "https://api.devnet.solana.com/",
        "https://api.testnet.solana.com/",
        "https://api.mainnet-beta.solana.com/",
      ],
      selectedCluster: "https://api.mainnet-beta.solana.com/",
      candyMachineID: "",

      status: {
        itemsAvailable: 0,
        itemsRedeemed: 0,
        goLiveDate: new Date(),
        wallet: "",
      },
    };
  },
  methods: {
    async fetchCandyMachineStatus() {
      this.loading = true;
      try {
        const connection = new anchor.web3.Connection(this.selectedCluster);
        const dummyWallet = new anchor.Wallet(anchor.web3.Keypair.generate());
        const provider = new anchor.Provider(connection, dummyWallet, {
          preflightCommitment: "recent",
        });

        const idl = await anchor.Program.fetchIdl(CANDY_MACHINE_PROGRAM, provider);
        if (!idl) {
          throw Error("Cannot fetch IDL from candy machine program");
        }

        const program = new anchor.Program(idl, CANDY_MACHINE_PROGRAM, provider);
        console.log("program", program);

        const state: any = await program.account.candyMachine.fetch(this.candyMachineID);
        console.log("state", state);

        this.status.itemsAvailable = state.data.itemsAvailable.toNumber();
        this.status.itemsRedeemed = state.itemsRedeemed.toNumber();
        this.status.goLiveDate = new Date(state.data.goLiveDate.toNumber() * 1000);
        this.status.wallet = state.wallet.toBase58();
      } catch (err) {
        console.error("err", err);
      }
      this.loading = false;
    },
  },
});
</script>
