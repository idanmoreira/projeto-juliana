
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { Eye, Edit, Trash2, Plus, Search } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  type: 'page' | 'blog' | 'service' | 'course';
  status: 'published' | 'draft';
  author: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

const ContentManager = () => {
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Home Page',
      slug: 'home',
      content: 'Welcome to our astrology website...',
      excerpt: 'Main landing page content',
      type: 'page',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      tags: ['homepage'],
      seoTitle: 'Professional Astrology Services',
      seoDescription: 'Get professional astrology readings and courses'
    },
    {
      id: '2',
      title: 'Introduction to Astrology',
      slug: 'intro-to-astrology',
      content: 'Astrology is the study of celestial movements...',
      excerpt: 'Learn the basics of astrology',
      type: 'blog',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
      tags: ['astrology', 'basics']
    }
  ]);

  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState<Partial<ContentItem>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    type: 'page',
    status: 'draft',
    author: 'Admin',
    tags: [],
    seoTitle: '',
    seoDescription: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || content.type === filterType;
    const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddContent = () => {
    if (!newContent.title || !newContent.content) {
      toast.error("Error", {
        description: "Title and content are required"
      });
      return;
    }

    const contentToAdd: ContentItem = {
      id: Date.now().toString(),
      title: newContent.title || '',
      slug: newContent.slug || newContent.title?.toLowerCase().replace(/\s+/g, '-') || '',
      content: newContent.content || '',
      excerpt: newContent.excerpt || '',
      type: newContent.type || 'page',
      status: newContent.status || 'draft',
      author: newContent.author || 'Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: newContent.tags || [],
      featuredImage: newContent.featuredImage || '',
      seoTitle: newContent.seoTitle || '',
      seoDescription: newContent.seoDescription || ''
    };

    setContents(prev => [...prev, contentToAdd]);
    setNewContent({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      type: 'page',
      status: 'draft',
      author: 'Admin',
      tags: [],
      seoTitle: '',
      seoDescription: ''
    });
    
    toast.success("Success", {
      description: "Content added successfully"
    });
  };

  const handleEditContent = () => {
    if (!editingContent) return;

    setContents(prev => prev.map(content => 
      content.id === editingContent.id 
        ? { 
            ...editingContent, 
            updatedAt: new Date().toISOString()
          }
        : content
    ));
    setEditingContent(null);
    
    toast.success("Success", {
      description: "Content updated successfully"
    });
  };

  const handleDeleteContent = (id: string) => {
    setContents(prev => prev.filter(content => content.id !== id));
    toast.success("Success", {
      description: "Content deleted successfully"
    });
  };

  const handleContentChange = (field: string, value: string | string[]) => {
    if (editingContent) {
      setEditingContent({...editingContent, [field]: value});
    } else {
      setNewContent({...newContent, [field]: value});
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
          <CardDescription>
            Manage all content across your website including pages, blog posts, services, and courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="page">Pages</SelectItem>
                <SelectItem value="blog">Blog Posts</SelectItem>
                <SelectItem value="service">Services</SelectItem>
                <SelectItem value="course">Courses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Content List */}
          <div className="space-y-4">
            {filteredContents.map((content) => (
              <div key={content.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{content.title}</h3>
                      <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                        {content.status}
                      </Badge>
                      <Badge variant="outline">{content.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{content.excerpt}</p>
                    <p className="text-xs text-muted-foreground">
                      By {content.author} • {new Date(content.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingContent(content)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteContent(content.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingContent ? "Edit Content" : "Add New Content"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title *</label>
                <Input 
                  id="title" 
                  value={(editingContent || newContent).title || ''}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  placeholder="Content title"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                <Input 
                  id="slug" 
                  value={(editingContent || newContent).slug || ''}
                  onChange={(e) => handleContentChange('slug', e.target.value)}
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
              <Input 
                id="excerpt" 
                value={(editingContent || newContent).excerpt || ''}
                onChange={(e) => handleContentChange('excerpt', e.target.value)}
                placeholder="Brief description"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Content *</label>
              <Textarea 
                id="content" 
                value={(editingContent || newContent).content || ''}
                onChange={(e) => handleContentChange('content', e.target.value)}
                placeholder="Main content"
                rows={8}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">Type</label>
                <Select 
                  value={(editingContent || newContent).type || 'page'} 
                  onValueChange={(value) => handleContentChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <Select 
                  value={(editingContent || newContent).status || 'draft'} 
                  onValueChange={(value) => handleContentChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="author" className="text-sm font-medium">Author</label>
                <Input 
                  id="author" 
                  value={(editingContent || newContent).author || ''}
                  onChange={(e) => handleContentChange('author', e.target.value)}
                  placeholder="Author name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="seoTitle" className="text-sm font-medium">SEO Title</label>
                <Input 
                  id="seoTitle" 
                  value={(editingContent || newContent).seoTitle || ''}
                  onChange={(e) => handleContentChange('seoTitle', e.target.value)}
                  placeholder="SEO optimized title"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="seoDescription" className="text-sm font-medium">SEO Description</label>
                <Input 
                  id="seoDescription" 
                  value={(editingContent || newContent).seoDescription || ''}
                  onChange={(e) => handleContentChange('seoDescription', e.target.value)}
                  placeholder="SEO meta description"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            {editingContent && (
              <Button 
                variant="outline" 
                onClick={() => setEditingContent(null)}
              >
                Cancel
              </Button>
            )}
            <Button onClick={editingContent ? handleEditContent : handleAddContent}>
              {editingContent ? "Update Content" : "Add Content"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;
