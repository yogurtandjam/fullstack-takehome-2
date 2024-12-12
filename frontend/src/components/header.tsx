import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const Header = () => {
  return (
    <div className="flex flex-row">
      <Input className="flex-1" />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Connect Wallet..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
