export type CandyMachineState =
  | {
      itemsAvailable: number;
      itemsRedeemed: number;
      goLiveDate: Date;
      wallet: string;
      authority: string;
      sellerFeeBasisPoints: number;
      symbol: string;
    }
  | undefined;
