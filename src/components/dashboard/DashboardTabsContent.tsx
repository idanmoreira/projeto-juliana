
import { TabsContent } from '@/components/ui/tabs';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardCourses from '@/components/dashboard/DashboardCourses';
import DashboardConsultations from '@/components/dashboard/DashboardConsultations';
import DashboardResources from '@/components/dashboard/DashboardResources';
import DashboardFiles from '@/components/dashboard/DashboardFiles';
import AstrologyTools from '@/components/AstrologyTools';
// Removed: import { useLanguage } from '@/context/LanguageContext';
// Removed: import { UserCourse, UserFile } from '@/hooks/useUserData';
// Removed: import { DashboardTab } from '@/hooks/useDashboardTabs';

interface ConsultationType {
  id: string;
  name: string;
  description: string;
}

interface DashboardTabsContentProps {
  activeTab: any;
  isPaid: boolean;
  courses: any[];
  files: any[];
  consultations: any[];
  consultationTypes: ConsultationType[];
}

const DashboardTabsContent: React.FC<DashboardTabsContentProps> = ({
  isPaid,
  courses,
  files,
  consultations,
  consultationTypes
}) => {
  // Removed: const { t } = useLanguage();

  return (
    <>
      {isPaid && (
        <TabsContent value="overview">
          <DashboardOverview 
            isPaid={isPaid} 
            courses={courses}
          />
        </TabsContent>
      )}
      
      {isPaid && (
        <TabsContent value="courses">
          <DashboardCourses 
            isPaid={isPaid}
            courses={courses}
          />
        </TabsContent>
      )}
      
      <TabsContent value="consultations">
        <DashboardConsultations
          isPaid={isPaid}
          consultationTypes={consultationTypes}
          consultations={consultations}
        />
      </TabsContent>
      
      <TabsContent value="resources">
        <DashboardResources isPaid={isPaid} />
      </TabsContent>
      
      <TabsContent value="tools">
        <h2 className="text-2xl font-semibold mb-4">Ferramentas Astrológicas</h2>
        <AstrologyTools />
      </TabsContent>
      
      {isPaid && (
        <TabsContent value="files">
          <DashboardFiles files={files} isPaid={isPaid} />
        </TabsContent>
      )}
    </>
  );
};

export default DashboardTabsContent;
