
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

interface UserManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onUpdateRole: (userId: string, newRole: string) => Promise<boolean>;
  onDeleteUser: (userId: string) => Promise<boolean>;
}

const UserManagementDialog: React.FC<UserManagementDialogProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateRole,
  onDeleteUser,
}) => {
  const [selectedRole, setSelectedRole] = useState(user?.role || 'free');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdateRole = async () => {
    if (!user || selectedRole === user.role) {
      onClose();
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdateRole(user.id, selectedRole);
      toast.success("Role updated successfully", {
        description: `User role changed to ${selectedRole}`,
      });
      onClose();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error("Failed to update role", {
        description: "Please try again later",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!user) return;

    setIsDeleting(true);
    try {
      await onDeleteUser(user.id);
      toast.success("User deleted successfully", {
        description: `${user.display_name || user.email} has been removed`,
      });
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error("Failed to delete user", {
        description: "Please try again later",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage User</DialogTitle>
          <DialogDescription>
            Update role or delete user: {user.display_name || user.email}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={handleDeleteUser}
            disabled={isDeleting || isUpdating}
          >
            {isDeleting ? 'Deleting...' : 'Delete User'}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateRole}
              disabled={isUpdating || isDeleting || selectedRole === user.role}
            >
              {isUpdating ? 'Updating...' : 'Update Role'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagementDialog;
