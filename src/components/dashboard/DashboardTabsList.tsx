import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';
import { DashboardTab } from '@/hooks/useDashboardTabs';

interface DashboardTabsListProps {
  availableTabs: Array<{ value: DashboardTab; label: string }>;
}

const DashboardTabsList: React.FC<DashboardTabsListProps> = ({ availableTabs }) => {
  const { t } = useLanguage();
  const columnsCount = availableTabs.length;
  
  return (
    <TabsList 
      className="grid w-full max-w-xl" 
      style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}
    >
      {availableTabs.map(tab => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {t(tab.label)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default DashboardTabsList;
