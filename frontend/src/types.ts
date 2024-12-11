export type TWsSubscribedMessage = {
  result: null;
  id: number;
};

export type TWsChannelMessage = {
  channel: string;
  data: (number | string)[];
};
export type TLine = (number | string)[];
