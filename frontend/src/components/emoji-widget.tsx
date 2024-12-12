import { DEFAULT_EMOJIS } from '@/consts';

import { Card } from './ui/card';

export const EmojiWidget = () => {
  return (
    <Card className="rounded-2xl inline-flex flex-row mt-10 p-2 w-auto">
      {DEFAULT_EMOJIS.map((emoji) => (
        <div className="ml-2 mr-2">{emoji}</div>
      ))}
    </Card>
  );
};
