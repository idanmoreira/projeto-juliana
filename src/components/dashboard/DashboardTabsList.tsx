
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardTabsListProps {
  availableTabs: Array<{ value: string; label: string }>;
}

const DashboardTabsList: React.FC<DashboardTabsListProps> = ({ availableTabs }) => {
  const columnsCount = availableTabs.length;

  return (
    <TabsList
      className="grid w-full max-w-xl"
      style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}
    >
      {availableTabs.map(tab => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default DashboardTabsList;
