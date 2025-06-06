
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const UsersTab = () => {
  const { t } = useLanguage();

  const users = [
    { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active', date: '2025-01-01' },
    { id: '2', name: 'Premium User', email: 'paid@example.com', role: 'Paid', status: 'Active', date: '2025-03-15' },
    { id: '3', name: 'Free User', email: 'free@example.com', role: 'Free', status: 'Active', date: '2025-04-22' },
    { id: '4', name: 'Jane Smith', email: 'jane@example.com', role: 'Free', status: 'Inactive', date: '2025-02-12' },
    { id: '5', name: 'John Doe', email: 'john@example.com', role: 'Paid', status: 'Active', date: '2025-05-01' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{t('allUsers')}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              {t('export')}
            </Button>
            <Button className="bg-astral-purple hover:bg-astral-purple/90" size="sm">
              {t('addUser')}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('role')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('joined')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Admin' 
                          ? 'bg-purple-100 text-purple-800'
                          : user.role === 'Paid' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.date}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm">
                      {t('edit')}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      {t('delete')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-muted-foreground">
            {t('showingUsers')}
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              {t('previous')}
            </Button>
            <Button variant="outline" size="sm">
              {t('next')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersTab;
