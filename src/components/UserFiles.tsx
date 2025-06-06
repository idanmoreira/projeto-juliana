
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileIcon, DownloadIcon, TrashIcon, FileTextIcon, FileImageIcon, PresentationIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { UserFile } from '@/hooks/useUserData';

interface UserFilesProps {
  files: UserFile[];
  isPremium: boolean;
}

const UserFiles = ({ files, isPremium }: UserFilesProps) => {
  const { t } = useLanguage();

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileTextIcon className="h-6 w-6 text-blue-500" />;
      case 'image':
        return <FileImageIcon className="h-6 w-6 text-green-500" />;
      case 'presentation':
        return <PresentationIcon className="h-6 w-6 text-purple-500" />;
      default:
        return <FileIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  if (!isPremium || files.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <FileIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('noFiles')}</h3>
          <p className="text-muted-foreground mb-4">
            {isPremium 
              ? t('noFilesYet') 
              : t('upgradeForFiles')}
          </p>
          {!isPremium && (
            <Button className="bg-astral-gold hover:bg-astral-gold/90 text-astral-dark">
              {t('upgradeToPremium')}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <Card key={file.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4 gap-4">
              <div className="flex-shrink-0">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium truncate">{file.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {file.size} • {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href={file.url} download>
                    <DownloadIcon className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <TrashIcon className="h-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserFiles;
