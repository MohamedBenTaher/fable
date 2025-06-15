type ExtendedText = {
  text: string | JSX.Element;
  createdAt: Date;
  id: string;
  isUserMessage: boolean;
};

export type ExtendedMessage = ExtendedText;
