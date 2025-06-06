
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  isActive: boolean;
  provider: string;
  description: string;
}

const ApiManager = () => {
  // Mock API keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "AstroAPI",
      key: "a1b2c3d4e5f6g7h8i9j0",
      isActive: true,
      provider: "AstroSeek",
      description: "Used for chart calculations in the birth chart tool"
    },
    {
      id: "2",
      name: "TransitAPI",
      key: "z9y8x7w6v5u4t3s2r1q0",
      isActive: false,
      provider: "AstroSeek",
      description: "Used for tracking current planetary transits"
    }
  ]);
  
  const [newApi, setNewApi] = useState<Partial<ApiKey>>({
    name: "",
    key: "",
    isActive: true,
    provider: "",
    description: ""
  });
  
  const [showKeys, setShowKeys] = useState<{[key: string]: boolean}>({});
  
  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleAddApiKey = () => {
    if (!newApi.name || !newApi.key || !newApi.provider) {
      toast.error("Error", {
        description: "Please fill all required fields",
      });
      return;
    }
    
    const apiKeyToAdd = {
      ...newApi,
      id: Date.now().toString(),
      isActive: newApi.isActive || false
    } as ApiKey;
    
    setApiKeys([...apiKeys, apiKeyToAdd]);
    setNewApi({
      name: "",
      key: "",
      isActive: true,
      provider: "",
      description: ""
    });
    
    toast.success("Success", {
      description: "API key added successfully"
    });
  };
  
  const handleToggleActive = (id: string) => {
    setApiKeys(apiKeys.map(api => 
      api.id === id ? { ...api, isActive: !api.isActive } : api
    ));
  };
  
  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(api => api.id !== id));
    
    toast.success("Success", {
      description: "API key deleted successfully"
    });
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>API Management</CardTitle>
          <CardDescription>
            Configure and manage API keys used by the Astrological Tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {apiKeys.map((api) => (
              <div key={api.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{api.name}</h3>
                    <p className="text-sm text-muted-foreground">{api.provider}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Active</span>
                      <Switch 
                        checked={api.isActive} 
                        onCheckedChange={() => handleToggleActive(api.id)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteApiKey(api.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">API Key</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input 
                          value={api.key} 
                          readOnly
                          type={showKeys[api.id] ? "text" : "password"} 
                          className="pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => toggleKeyVisibility(api.id)}
                        >
                          {showKeys[api.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {api.description && (
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Description</label>
                      <p className="text-sm">{api.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name *</label>
                <Input 
                  id="name" 
                  value={newApi.name}
                  onChange={(e) => setNewApi({...newApi, name: e.target.value})}
                  placeholder="API Name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="provider" className="text-sm font-medium">Provider *</label>
                <Input 
                  id="provider" 
                  value={newApi.provider}
                  onChange={(e) => setNewApi({...newApi, provider: e.target.value})}
                  placeholder="API Provider"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="key" className="text-sm font-medium">API Key *</label>
              <Input 
                id="key" 
                value={newApi.key}
                onChange={(e) => setNewApi({...newApi, key: e.target.value})}
                placeholder="Enter API key"
                type={showKeys['new'] ? "text" : "password"}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="relative -top-9 float-right"
                onClick={() => toggleKeyVisibility('new')}
              >
                {showKeys['new'] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                value={newApi.description}
                onChange={(e) => setNewApi({...newApi, description: e.target.value})}
                placeholder="What is this API used for?"
                rows={3}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Switch 
                id="isActive"
                checked={newApi.isActive || false} 
                onCheckedChange={(checked) => setNewApi({...newApi, isActive: checked})}
              />
              <label htmlFor="isActive" className="text-sm font-medium">Active</label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddApiKey} className="ml-auto">
            <Plus className="mr-2 h-4 w-4" /> Add API Key
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApiManager;
