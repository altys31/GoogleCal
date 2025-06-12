type Range<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number] | N
  : Range<N, [...Acc, Acc["length"]]>;

export type Event = {
  title: string;
  startDate: Date;
  endDate: Date;
};
