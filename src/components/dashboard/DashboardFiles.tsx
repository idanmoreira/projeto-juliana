
import UserFiles from '@/components/UserFiles';
import { UserFile } from '@/hooks/useUserData';

interface DashboardFilesProps {
  files: UserFile[];
  isPaid: boolean;
}

const DashboardFiles = ({ files, isPaid }: DashboardFilesProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Meus Arquivos</h2>
      <p className="text-muted-foreground mb-6">
        Acesse seus arquivos astrológicos e relatórios salvos.
      </p>
      <UserFiles files={files} isPremium={isPaid} />
    </div>
  );
};

export default DashboardFiles;

