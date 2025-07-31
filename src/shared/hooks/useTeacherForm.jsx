import { useState } from 'react';
import toast from 'react-hot-toast';

const CATEGORY_OPTIONS_ARTICLE = [
  'Biology', 'Chemistry', 'History', 'Medicine', 'Astronomy',
  'Physics', 'Mathematics', 'Technology',
  'Geology and Earth Sciences', 'Social Sciences', 'Engineering', 'Other'
];

const CATEGORY_OPTIONS_EVENT = [
  'Biology', 'Chemistry', 'History', 'Medicine', 'Astronomy'
];

export const useTeacherForm = () => {
  const [activeTab, setActiveTab] = useState('articles');

  const validateArticleForm = (form) => {
    const title = form.title.value.trim();
    const content = form.content.value.trim();
    const category = form.category.value;

    if (!title) {
      toast.error('El título es obligatorio');
      return false;
    }
    if (!content) {
      toast.error('El contenido es obligatorio');
      return false;
    }
    if (!CATEGORY_OPTIONS_ARTICLE.includes(category)) {
      toast.error('Categoría no válida');
      return false;
    }
    return true;
  };

  const processVideoUrls = (videoInput) => {
    if (!videoInput) return [];
    
    return videoInput
      .split(',')
      .map(v => v.trim())
      .map(v => {
        try {
          const url = new URL(v);
          if (url.hostname === 'youtu.be') {
            const id = url.pathname.slice(1);
            return `https://www.youtube.com/watch?v=${id}`;
          }
          if (url.hostname.includes('youtube.com')) {
            const vid = url.searchParams.get('v');
            return vid ? `https://www.youtube.com/watch?v=${vid}` : '';
          }
          return v;
        } catch {
          return ''; 
        }
      })
      .filter(Boolean);
  };

  const formatArticleData = (form) => {
    const videoInput = form.videos?.value.trim();
    const videoArray = processVideoUrls(videoInput);

    return {
      title: form.title.value.trim(),
      content: form.content.value.trim(),
      category: form.category.value,
      status: true,
      videos: videoArray,
    };
  };

  const formatEventData = (form, eventLinks) => {
    return {
      name: form.name.value.trim(),
      date: form.date.value,
      location: form.location.value.trim(),
      description: form.description.value.trim(),
      category: form.category.value,
      status: true,
      externalLinks: eventLinks.filter(link => link.title && link.url),
    };
  };

  return {
    activeTab,
    setActiveTab,
    validateArticleForm,
    formatArticleData,
    formatEventData,
    CATEGORY_OPTIONS_ARTICLE,
    CATEGORY_OPTIONS_EVENT
  };
};
