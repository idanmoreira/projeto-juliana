
import { TabsContent } from '@/components/ui/tabs';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardCourses from '@/components/dashboard/DashboardCourses';
import DashboardConsultations from '@/components/dashboard/DashboardConsultations';
import DashboardResources from '@/components/dashboard/DashboardResources';
import DashboardFiles from '@/components/dashboard/DashboardFiles';
import AstrologyTools from '@/components/AstrologyTools';
import { useLanguage } from '@/context/LanguageContext';
import { UserCourse, UserFile } from '@/hooks/useUserData';
import { DashboardTab } from '@/hooks/useDashboardTabs';

interface ConsultationType {
  id: string;
  name: string;
  description: string;
}

interface DashboardTabsContentProps {
  activeTab: DashboardTab;
  isPaid: boolean;
  courses: UserCourse[];
  files: UserFile[];
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
  const { t } = useLanguage();

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
        <h2 className="text-2xl font-semibold mb-4">{t('astrologyTools')}</h2>
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
