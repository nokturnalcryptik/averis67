import axios from 'axios';
import * as mockData from '../data/mockData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const apiClient = axios.create({
  baseURL: API,
  timeout: 8000,
});

export const fetchGroups = async () => {
  try {
    const res = await apiClient.get('/groups');
    return res.data.groups.map(g => ({ name: g.name, logo: g.logo_url }));
  } catch {
    return mockData.robloxGroups;
  }
};

export const fetchStats = async () => {
  try {
    const res = await apiClient.get('/stats');
    return res.data.stats.map(s => ({
      label: s.label,
      value: s.value,
      suffix: s.suffix,
      isDecimal: s.is_decimal,
    }));
  } catch {
    return mockData.stats;
  }
};

export const fetchFeatures = async () => {
  try {
    const res = await apiClient.get('/features');
    return {
      tabs: res.data.tabs,
      caseItems: res.data.case_items.map(c => ({
        avatar: c.avatar,
        title: c.title,
        assignee: c.assignee,
        status: c.status,
        statusColor: c.status_color,
      })),
      caseTags: res.data.case_tags,
    };
  } catch {
    return {
      tabs: mockData.featureTabs,
      caseItems: mockData.caseItems,
      caseTags: mockData.caseTags,
    };
  }
};

export const fetchTestimonials = async () => {
  try {
    const res = await apiClient.get('/testimonials');
    return res.data.testimonials.map(t => ({
      text: t.text,
      name: t.name,
      initials: t.initials,
      role: t.role,
      group: t.group_name,
    }));
  } catch {
    return mockData.testimonials;
  }
};

export const fetchPricing = async () => {
  try {
    const res = await apiClient.get('/pricing');
    return res.data.plans.map(p => ({
      name: p.name,
      description: p.description,
      price: p.price,
      priceSubtext: p.price_subtext,
      popular: p.popular,
      features: p.features,
      cta: p.cta,
      ctaLink: p.cta_link,
    }));
  } catch {
    return mockData.pricingPlans;
  }
};

export const fetchFAQ = async () => {
  try {
    const res = await apiClient.get('/faq');
    return res.data.items;
  } catch {
    return mockData.faqItems;
  }
};

export const fetchGuides = async () => {
  try {
    const res = await apiClient.get('/guides');
    return res.data.articles.map(a => ({
      title: a.title,
      excerpt: a.excerpt,
      author: a.author,
      authorInitials: a.author_initials,
      readTime: a.read_time,
      link: a.link,
    }));
  } catch {
    return mockData.guideArticles;
  }
};

export const submitContact = async (data) => {
  const res = await apiClient.post('/contact', data);
  return res.data;
};

export const submitWaitlist = async (prompt) => {
  const res = await apiClient.post('/waitlist', { prompt });
  return res.data;
};
